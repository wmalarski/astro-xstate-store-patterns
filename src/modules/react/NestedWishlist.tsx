import { useSelector } from "@xstate/store/react";
import { nanoid } from "nanoid";
import { useMemo, type FC } from "react";
import * as NestedList from "../../patterns/nestedList";
import {
  groupByPosition2,
  type GetListGroupData2,
} from "../../patterns/nestedList/utils";
import type { Product } from "../../patterns/products/types";
import * as Wishlist from "../../patterns/wishlist";
import { buttonRecipe } from "../../recipes/button";
import { formControlRecipe } from "../../recipes/formControl";
import { labelRecipe, labelTextRecipe } from "../../recipes/label";
import { textFieldRecipe } from "../../recipes/textField";

type AddListFormProps = {
  nestedListApi: NestedList.MachineApi;
  wishlistApi: Wishlist.MachineApi;
  group?: GetListGroupData2;
};

const AddListForm: FC<AddListFormProps> = ({
  nestedListApi,
  wishlistApi,
  group,
}) => {
  // const parents = useSelector(nestedListApi.store, ({ context }) =>
  //   parentListId
  //     ? Object.keys(context.lists).length + 1
  //     : Object.keys(context.lists).length + 1
  // );

  return (
    <form
      className="flex flex-col gap-2"
      {...nestedListApi.getAddListFormProps(wishlistApi.getAddListFormProps())}
    >
      <input type="hidden" name="listId" value={nanoid()} />
      <input type="hidden" name="position" value={group?.path.join("/")} />
      <label className={formControlRecipe()}>
        <div className={labelRecipe()}>
          <span className={labelTextRecipe()}>Name</span>
        </div>
        <input
          className={textFieldRecipe({ variant: "bordered", size: "sm" })}
          type="text"
          name="name"
        />
      </label>
      <button className={buttonRecipe()}>Add list</button>
    </form>
  );
};

type WishlistsGroupItemProps = {
  products: Record<string, Product>;
  productId: string;
  wishlist: Wishlist.WishlistStoreList;
  wishlistApi: Wishlist.MachineApi;
};

const WishlistsGroupItem: FC<WishlistsGroupItemProps> = ({
  wishlist,
  productId,
  wishlistApi,
  products,
}) => {
  return (
    <li>
      <span>{products[productId]?.name}</span>
      <button
        className={buttonRecipe()}
        {...wishlistApi.getRemoveProductButtonProps({
          listId: wishlist.listId,
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
  wishlist: Wishlist.WishlistStoreList;
  wishlistApi: Wishlist.MachineApi;
  nestedListApi: NestedList.MachineApi;
};

const WishlistsGroup: FC<WishlistsGroupProps> = ({
  nestedListApi,
  wishlist,
  wishlistApi,
  products,
}) => {
  return (
    <li>
      <span>{wishlist?.name}</span>
      <button
        className={buttonRecipe()}
        {...wishlistApi.getRemoveListButtonProps(
          wishlist,
          nestedListApi.getRemoveListButtonProps(wishlist)
        )}
      >
        Remove List
      </button>
      <ul>
        {wishlist?.productIds.map((productId) => (
          <WishlistsGroupItem
            key={productId}
            wishlist={wishlist}
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
  group: GetListGroupData2;
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
        {group.current && (
          <WishlistsGroup
            nestedListApi={nestedListApi}
            products={products}
            wishlistApi={wishlistApi}
            wishlist={group.current}
          />
        )}
      </ul>
      <AddListForm
        nestedListApi={nestedListApi}
        wishlistApi={wishlistApi}
        group={group}
      />
      <ul>
        {Object.values(group.children).map((child) => (
          <li key={child.current?.listId}>
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
  const wishlists = useSelector(
    wishlistApi.store,
    ({ context }) => context.lists
  );

  const nestedLists = useSelector(
    nestedListApi.store,
    ({ context }) => context.lists
  );

  const root = useMemo(
    () => groupByPosition2(Object.values(wishlists), nestedLists),
    [wishlists, nestedLists]
  );

  const productsMap = useMemo(
    () => Object.fromEntries(products.map((product) => [product.id, product])),
    [products]
  );

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
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl">Nested Wishlist</h2>
      <WishlistsRoot
        products={products}
        nestedListApi={nestedListApi}
        wishlistApi={wishlistApi}
      />
    </section>
  );
};
