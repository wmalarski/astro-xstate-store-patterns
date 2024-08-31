/** @jsxImportSource solid-js */

import type { Component } from "solid-js";
import * as NestedList from "../../patterns/nestedList";
import type { Product } from "../../patterns/products/types";
import * as Wishlist from "../../patterns/wishlist";
import { nestedStore, wishlistStore } from "../stores";
import { NestedWishlist } from "./NestedWishlist";
import { ProductList } from "./ProductList";

type Solid2ExampleProps = {
  products: Product[];
};

export const Solid2Example: Component<Solid2ExampleProps> = (props) => {
  const wishlistApi = Wishlist.connect(wishlistStore);
  const nestedListApi = NestedList.connect(nestedStore);

  return (
    <div data-theme="lofi" class="grid grid-cols-[auto_1fr] gap-2 p-4">
      <ProductList products={props.products} wishlistApi={wishlistApi} />
      <NestedWishlist
        products={props.products}
        nestedListApi={nestedListApi}
        wishlistApi={wishlistApi}
      />
    </div>
  );
};
