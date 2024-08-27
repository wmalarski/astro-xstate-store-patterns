import { useSelector } from "@xstate/store/react";
import { useId, useMemo, type FC } from "react";
import * as NestedList from "../../patterns/nestedList";
import {
  getListGroup,
  type GetListGroupResult,
} from "../../patterns/nestedList/utils";
import type { Product } from "../../patterns/products/types";
import * as Wishlist from "../../patterns/wishlist";

type AddListFormProps = {
  nestedListApi: NestedList.MachineApi;
  wishlistApi: Wishlist.MachineApi;
  group?: GetListGroupResult;
};

const AddListForm: FC<AddListFormProps> = ({
  nestedListApi,
  wishlistApi,
  group,
}) => {
  const listId = useId();

  // const parents = useSelector(nestedListApi.store, ({ context }) =>
  //   parentListId
  //     ? Object.keys(context.lists).length + 1
  //     : Object.keys(context.lists).length + 1
  // );

  return (
    <form
      {...nestedListApi.getAddListFormProps(wishlistApi.getAddListFormProps())}
    >
      <input type="hidden" name="listId" value={listId} />
      <input type="hidden" name="position" value={group?.parents.join("/")} />
      <label>
        Name
        <input type="text" name="name" />
      </label>
      <button>Add list</button>
    </form>
  );
};

type WishlistsGroupItemProps = {
  products: Record<string, Product>;
  productId: string;
  list: NestedList.NestedProductGroup;
  wishlistApi: Wishlist.MachineApi;
};

const WishlistsGroupItem: FC<WishlistsGroupItemProps> = ({
  list,
  productId,
  wishlistApi,
  products,
}) => {
  return (
    <li>
      <span>{products[productId]?.name}</span>
      <button
        {...wishlistApi.getRemoveProductButtonProps({
          listId: list.listId,
          productId,
        })}
      >
        Remove from List
      </button>
    </li>
  );
};

type WishlistsGroupProps = {
  products: Record<string, Product>;
  group: NestedList.NestedProductGroup;
  wishlistApi: Wishlist.MachineApi;
  nestedListApi: NestedList.MachineApi;
};

const WishlistsGroup: FC<WishlistsGroupProps> = ({
  nestedListApi,
  group,
  wishlistApi,
  products,
}) => {
  const productIds = useSelector(
    wishlistApi.store,
    ({ context }) => context.lists[group.listId]
  );

  return (
    <li>
      <span>{group.name}</span>
      <button
        {...wishlistApi.getRemoveListButtonProps(
          group,
          nestedListApi.getRemoveListButtonProps(group)
        )}
      >
        Remove List
      </button>
      <ul>
        {productIds?.map((productId) => (
          <WishlistsGroupItem
            key={productId}
            list={group}
            productId={productId}
            products={products}
            wishlistApi={wishlistApi}
          />
        ))}
      </ul>
    </li>
  );
};

type WishlistsProps = {
  products: Record<string, Product>;
  group: GetListGroupResult;
  wishlistApi: Wishlist.MachineApi;
  nestedListApi: NestedList.MachineApi;
};

const Wishlists: FC<WishlistsProps> = ({
  nestedListApi,
  products,
  group,
  wishlistApi,
}) => {
  return (
    <div>
      <ul>
        {group.current.map((group) => (
          <WishlistsGroup
            key={group.listId}
            nestedListApi={nestedListApi}
            products={products}
            wishlistApi={wishlistApi}
            group={group}
          />
        ))}
      </ul>
      <AddListForm nestedListApi={nestedListApi} wishlistApi={wishlistApi} />
      <ul>
        {group.children.map((child) => (
          <li key={child.parents.join("/")}>
            <Wishlists
              group={child}
              nestedListApi={nestedListApi}
              wishlistApi={wishlistApi}
              products={products}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

type WishlistsRootProps = {
  products: Product[];
  wishlistApi: Wishlist.MachineApi;
  nestedListApi: NestedList.MachineApi;
};

const WishlistsRoot: FC<WishlistsRootProps> = ({
  nestedListApi,
  products,
  wishlistApi,
}) => {
  const lists = useSelector(
    nestedListApi.store,
    ({ context }) => context.lists
  );

  const root = useMemo(() => getListGroup(Object.values(lists)), [lists]);

  const productsMap = useMemo(() => {
    return Object.fromEntries(products.map((product) => [product.id, product]));
  }, [products]);

  return (
    <Wishlists
      group={root}
      nestedListApi={nestedListApi}
      products={productsMap}
      wishlistApi={wishlistApi}
    />
  );
};

type NestedWishlistProps = {
  products: Product[];
  wishlistApi: Wishlist.MachineApi;
  nestedListApi: NestedList.MachineApi;
};

export const NestedWishlist: FC<NestedWishlistProps> = ({
  nestedListApi,
  products,
  wishlistApi,
}) => {
  return (
    <div>
      <AddListForm nestedListApi={nestedListApi} wishlistApi={wishlistApi} />
      <WishlistsRoot
        products={products}
        nestedListApi={nestedListApi}
        wishlistApi={wishlistApi}
      />
    </div>
  );
};
