import { useSelector } from "@xstate/store/react";
import type { FC } from "react";
import type { Product } from "../../patterns/products/types";
import * as Wishlist from "../../patterns/wishlist";
import { buttonRecipe } from "../../recipes/button";
import { selectRecipe } from "../../recipes/select";

type AddProductToListProps = {
  product: Product;
  wishlistApi: Wishlist.MachineApi;
};

const AddProductToList: FC<AddProductToListProps> = ({
  product,
  wishlistApi,
}) => {
  const lists = useSelector(wishlistApi.store, ({ context }) => context.lists);

  return (
    <form {...wishlistApi.getAddProductFormProps()}>
      <label>
        List
        <select required name="listId" className={selectRecipe()}>
          {Object.keys(lists).map((listId) => (
            <option key={listId}>{product.name}</option>
          ))}
        </select>
      </label>
      <button className={buttonRecipe()}>Add Product to List</button>
    </form>
  );
};

type ProductItemProps = {
  product: Product;
  wishlistApi: Wishlist.MachineApi;
};

const ProductItem: FC<ProductItemProps> = ({ product, wishlistApi }) => {
  return (
    <li>
      <div>
        <span>{product.name}</span>
        <span>{product.price}</span>
      </div>
      <AddProductToList product={product} wishlistApi={wishlistApi} />
    </li>
  );
};

type ProductListProps = {
  products: Product[];
  wishlistApi: Wishlist.MachineApi;
};

export const ProductList: FC<ProductListProps> = ({
  products,
  wishlistApi,
}) => {
  return (
    <ul>
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          wishlistApi={wishlistApi}
        />
      ))}
    </ul>
  );
};
