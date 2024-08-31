/** @jsxImportSource solid-js */

import type { Component } from "solid-js";
import type { Product } from "../../patterns/products/types";

type Solid1ExampleProps = {
  products: Product[];
};

export const Solid1Example: Component<Solid1ExampleProps> = (props) => {
  //   const wishlistApi = Wishlist.connect(wishlistStore);
  //   const flatListApi = FlatList.connect(flatListStore);

  return (
    <div data-theme="light" class="grid grid-cols-[auto_1fr] gap-2 p-4">
      Hello from solid
      <pre>{JSON.stringify(props.products, null, 2)}</pre>
    </div>
  );
};
