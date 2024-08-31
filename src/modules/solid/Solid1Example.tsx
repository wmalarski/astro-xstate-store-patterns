/** @jsxImportSource solid-js */

import type { Component } from "solid-js";
import * as Descriptions from "../../patterns/descriptions";
import * as FlatList from "../../patterns/flatList";
import type { Product } from "../../patterns/products/types";
import * as Wishlist from "../../patterns/wishlist";
import { descriptionsStore, flatListStore, wishlistStore } from "../stores";
import { FlatWishlist } from "./FlatWishlist";
import { ProductList } from "./ProductList";

type Solid1ExampleProps = {
  products: Product[];
};

export const Solid1Example: Component<Solid1ExampleProps> = (props) => {
  const wishlistApi = Wishlist.connect(wishlistStore);
  const flatListApi = FlatList.connect(flatListStore);
  const descriptionsApi = Descriptions.connect(descriptionsStore);

  return (
    <div data-theme="nord" class="grid grid-cols-[auto_1fr] gap-2 p-4">
      <ProductList products={props.products} wishlistApi={wishlistApi} />
      <FlatWishlist
        products={props.products}
        flatListApi={flatListApi}
        wishlistApi={wishlistApi}
        descriptionsApi={descriptionsApi}
      />
    </div>
  );
};
