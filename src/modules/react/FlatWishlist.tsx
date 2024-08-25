import { useSelector } from "@xstate/store/react";
import type { FC } from "react";
import * as FlatList from "../../patterns/flatList";
import type { Product } from "../../patterns/products/types";
import * as Wishlist from "../../patterns/wishlist";

type AddListFormProps = {
  flatListApi: FlatList.MachineApi;
};

const AddListForm: FC<AddListFormProps> = ({ flatListApi }) => {
  return (
    <form {...flatListApi.getAddListFormProps()}>
      <label>
        Name
        <input type="text" name="name" />
      </label>
      <button>Add list</button>
    </form>
  );
};

type ProductListProps = {
  products: Product[];
  wishlistApi: Wishlist.MachineApi;
  flatListApi: FlatList.MachineApi;
};

const ProductList: FC<ProductListProps> = ({ flatListApi }) => {
  const lists = useSelector(flatListApi.store, ({ context }) => context.lists);

  return (
    <ul>
      {lists.map((list) => (
        <li key={list.listId}>
          <span>{list.name}</span>
        </li>
      ))}
    </ul>
  );
};

type FlatWishlistProps = {
  products: Product[];
  wishlistApi: Wishlist.MachineApi;
  flatListApi: FlatList.MachineApi;
};

export const FlatWishlist: FC<FlatWishlistProps> = ({ flatListApi }) => {
  const lists = useSelector(flatListApi.store, ({ context }) => context.lists);

  return (
    <div>
      <AddListForm flatListApi={flatListApi} />
      <ul>
        {lists.map((list) => (
          <li key={list.listId}>
            <span>{list.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
