/** @jsxImportSource solid-js */

import { useSelector } from "@xstate/store/solid";
import type { Component } from "solid-js";
import {
  descriptionsStore,
  flatListStore,
  nestedStore,
  wishlistStore,
} from "../stores";

export const Debug: Component = () => {
  const wishlistData = useSelector(wishlistStore, ({ context }) => context);
  const flatListData = useSelector(flatListStore, ({ context }) => context);
  const nestedData = useSelector(nestedStore, ({ context }) => context);
  const descriptionsData = useSelector(
    descriptionsStore,
    ({ context }) => context
  );

  return (
    <details>
      <summary>Debug</summary>
      <div class="grid grid-cols-4 gap-4">
        <div>
          <p>Wishlist</p>
          <pre>{JSON.stringify(wishlistData(), null, 2)}</pre>
        </div>
        <div>
          <p>FlatList</p>
          <pre>{JSON.stringify(flatListData(), null, 2)}</pre>
        </div>
        <div>
          <p>Nested</p>
          <pre>{JSON.stringify(nestedData(), null, 2)}</pre>
        </div>
        <div>
          <p>Descriptions</p>
          <pre>{JSON.stringify(descriptionsData(), null, 2)}</pre>
        </div>
      </div>
    </details>
  );
};
