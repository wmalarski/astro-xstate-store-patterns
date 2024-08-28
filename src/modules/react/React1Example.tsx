import { type FC } from "react";
import * as FlatList from "../../patterns/flatList";
import type { Product } from "../../patterns/products/types";
import * as Wishlist from "../../patterns/wishlist";
import { flatListStore, wishlistStore } from "../stores";
import { FlatWishlist } from "./FlatWishlist";
import { ProductList } from "./ProductList";

type React1ExampleProps = {
  products: Product[];
};

export const React1Example: FC<React1ExampleProps> = ({ products }) => {
  const wishlistApi = Wishlist.connect(wishlistStore);
  const flatListApi = FlatList.connect(flatListStore);

  return (
    <div className="grid grid-cols-2 gap-2 justify-items-center">
      <ProductList products={products} wishlistApi={wishlistApi} />
      <FlatWishlist
        products={products}
        flatListApi={flatListApi}
        wishlistApi={wishlistApi}
      />
    </div>
  );
};
