/** @jsxImportSource solid-js */

import type { Component } from "solid-js";
import type { Product } from "../../patterns/products/types";

type Solid2ExampleProps = {
  products: Product[];
};

export const Solid2Example: Component<Solid2ExampleProps> = ({ products }) => {
  //   const wishlistApi = Wishlist.connect(wishlistStore);
  //   const flatListApi = FlatList.connect(flatListStore);

  return (
    <div data-theme="light" class="grid grid-cols-[auto_1fr] gap-2 p-4">
      Hello from solid2
      <pre>{JSON.stringify(products, null, 2)}</pre>
    </div>
  );
};
