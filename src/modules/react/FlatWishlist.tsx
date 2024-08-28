import { useSelector } from "@xstate/store/react";
import { useId, useMemo, type FC } from "react";
import type { FlatListProductGroup } from "../../patterns/flatList";
import * as FlatList from "../../patterns/flatList";
import type { Product } from "../../patterns/products/types";
import * as Wishlist from "../../patterns/wishlist";

type AddListFormProps = {
  flatListApi: FlatList.MachineApi;
  wishlistApi: Wishlist.MachineApi;
};

const AddListForm: FC<AddListFormProps> = ({ flatListApi, wishlistApi }) => {
  const listId = useId();

  const position = useSelector(
    wishlistApi.store,
    ({ context }) => Object.keys(context.lists).length + 1
  );

  return (
    <form
      {...flatListApi.getAddListFormProps(wishlistApi.getAddListFormProps())}
    >
      <input type="hidden" name="listId" value={listId} />
      <input type="hidden" name="position" value={position} />
      <label>
        Name
        <input type="text" name="name" />
      </label>
      <button className="btn">Add list</button>
    </form>
  );
};

type WishlistsGroupItemProps = {
  products: Record<string, Product>;
  productId: string;
  list: FlatListProductGroup;
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
  list: FlatListProductGroup;
  wishlistApi: Wishlist.MachineApi;
  flatListApi: FlatList.MachineApi;
};

const WishlistsGroup: FC<WishlistsGroupProps> = ({
  flatListApi,
  list,
  wishlistApi,
  products,
}) => {
  const productIds = useSelector(
    wishlistApi.store,
    ({ context }) => context.lists[list.listId]
  );

  return (
    <div>
      <span>{list.name}</span>
      <button
        {...wishlistApi.getRemoveListButtonProps(
          list,
          flatListApi.getRemoveListButtonProps(list)
        )}
      >
        Remove List
      </button>
      <ul>
        {productIds?.map((productId) => (
          <WishlistsGroupItem
            key={productId}
            list={list}
            productId={productId}
            products={products}
            wishlistApi={wishlistApi}
          />
        ))}
      </ul>
    </div>
  );
};

type WishlistsGroupsProps = {
  products: Product[];
  wishlistApi: Wishlist.MachineApi;
  flatListApi: FlatList.MachineApi;
};

const WishlistsGroups: FC<WishlistsGroupsProps> = ({
  flatListApi,
  products,
  wishlistApi,
}) => {
  const lists = useSelector(flatListApi.store, ({ context }) => context.lists);

  const productsMap = useMemo(() => {
    return Object.fromEntries(products.map((product) => [product.id, product]));
  }, [products]);

  return (
    <ul>
      {Object.values(lists).map((list) => (
        <WishlistsGroup
          key={list.listId}
          flatListApi={flatListApi}
          products={productsMap}
          wishlistApi={wishlistApi}
          list={list}
        />
      ))}
    </ul>
  );
};

type FlatWishlistProps = {
  products: Product[];
  wishlistApi: Wishlist.MachineApi;
  flatListApi: FlatList.MachineApi;
};

export const FlatWishlist: FC<FlatWishlistProps> = ({
  flatListApi,
  products,
  wishlistApi,
}) => {
  return (
    <div>
      <AddListForm flatListApi={flatListApi} wishlistApi={wishlistApi} />
      <WishlistsGroups
        products={products}
        flatListApi={flatListApi}
        wishlistApi={wishlistApi}
      />
    </div>
  );
};
