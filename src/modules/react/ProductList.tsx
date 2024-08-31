import { useSelector } from "@xstate/store/react";
import type { FC } from "react";
import type { Product } from "../../patterns/products/types";
import * as Wishlist from "../../patterns/wishlist";
import { buttonRecipe } from "../../recipes/button";
import {
  cardBodyRecipe,
  cardRecipe,
  cardTitleRecipe,
} from "../../recipes/card";
import { formControlRecipe } from "../../recipes/formControl";
import { labelRecipe, labelTextRecipe } from "../../recipes/label";
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
  const listKeys = Object.values(lists);

  return (
    <form
      className="flex flex-col gap-2"
      {...wishlistApi.getAddProductFormProps()}
    >
      <input name="productId" type="hidden" value={product.id} />
      <label className={formControlRecipe()}>
        <div className={labelRecipe()}>
          <span className={labelTextRecipe()}>Wishlist</span>
        </div>
        <select
          required
          name="listId"
          defaultValue=""
          disabled={listKeys.length < 1}
          className={selectRecipe({ size: "sm", variant: "bordered" })}
        >
          <option value="" disabled>
            Select your option
          </option>
          {listKeys.map((list) => (
            <option key={list.listId} value={list.listId}>
              {list.name}
            </option>
          ))}
        </select>
      </label>
      <button
        disabled={listKeys.length < 1}
        className={buttonRecipe({ size: "sm", color: "primary" })}
      >
        Add Product to List
      </button>
    </form>
  );
};

type ProductItemProps = {
  product: Product;
  wishlistApi: Wishlist.MachineApi;
};

const ProductItem: FC<ProductItemProps> = ({ product, wishlistApi }) => {
  return (
    <li
      className={cardRecipe({ shadow: "md", class: "w-64", size: "compact" })}
    >
      <figure>
        <img src={product.image} alt={product.name} />
      </figure>
      <div className={cardBodyRecipe()}>
        <h3 className={cardTitleRecipe()}>{product.name}</h3>
        <strong>{product.price}</strong>
        <AddProductToList product={product} wishlistApi={wishlistApi} />
      </div>
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
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl">Product List</h2>
      <ul className="flex gap-4 flex-col">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            wishlistApi={wishlistApi}
          />
        ))}
      </ul>
    </section>
  );
};
