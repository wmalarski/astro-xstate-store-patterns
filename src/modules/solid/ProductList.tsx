/** @jsxImportSource solid-js */

import { useSelector } from "@xstate/store/react";
import { For, type Component } from "solid-js";
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

const AddProductToList: Component<AddProductToListProps> = (props) => {
  const lists = useSelector(
    props.wishlistApi.store,
    ({ context }) => context.lists
  );
  const listKeys = Object.values(lists);

  return (
    <form
      class="flex flex-col gap-2"
      {...props.wishlistApi.getAddProductFormProps()}
    >
      <input name="productId" type="hidden" value={props.product.id} />
      <label class={formControlRecipe()}>
        <div class={labelRecipe()}>
          <span class={labelTextRecipe()}>Wishlist</span>
        </div>
        <select
          required
          name="listId"
          value=""
          disabled={listKeys.length < 1}
          class={selectRecipe({ size: "sm", variant: "bordered" })}
        >
          <option value="" disabled>
            Select your option
          </option>
          <For each={listKeys}>
            {(list) => <option value={list.listId}>{list.name}</option>}
          </For>
        </select>
      </label>
      <button
        disabled={listKeys.length < 1}
        class={buttonRecipe({ size: "sm", color: "primary" })}
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

const ProductItem: Component<ProductItemProps> = (props) => {
  return (
    <li class={cardRecipe({ shadow: "md", class: "w-64", size: "compact" })}>
      <figure>
        <img src={props.product.image} alt={props.product.name} />
      </figure>
      <div class={cardBodyRecipe()}>
        <h3 class={cardTitleRecipe()}>{props.product.name}</h3>
        <strong>{props.product.price}</strong>
        <AddProductToList
          product={props.product}
          wishlistApi={props.wishlistApi}
        />
      </div>
    </li>
  );
};

type ProductListProps = {
  products: Product[];
  wishlistApi: Wishlist.MachineApi;
};

export const ProductList: Component<ProductListProps> = (props) => {
  return (
    <section class="flex flex-col gap-4">
      <h2 class="text-2xl">Product List</h2>
      <ul class="flex gap-4 flex-col">
        {props.products.map((product) => (
          <ProductItem product={product} wishlistApi={props.wishlistApi} />
        ))}
      </ul>
    </section>
  );
};
