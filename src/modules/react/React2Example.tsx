import { useState, type FC } from "react";
import * as NestedList from "../../patterns/nestedList";
import type { Product } from "../../patterns/products/types";
import * as Wishlist from "../../patterns/wishlist";
import { NestedWishlist } from "./NestedWishlist";
import { ProductList } from "./ProductList";

type React1ExampleProps = {
  products: Product[];
};

export const React1Example: FC<React1ExampleProps> = ({ products }) => {
  const [wishlistStore] = useState(() => Wishlist.createWishlistStore());
  const [nestedStore] = useState(() => NestedList.createNestedStore());

  const wishlistApi = Wishlist.connect(wishlistStore);
  const nestedListApi = NestedList.connect(nestedStore);

  return (
    <div>
      <ProductList products={products} wishlistApi={wishlistApi} />
      <NestedWishlist
        products={products}
        nestedListApi={nestedListApi}
        wishlistApi={wishlistApi}
      />
    </div>
  );
};
