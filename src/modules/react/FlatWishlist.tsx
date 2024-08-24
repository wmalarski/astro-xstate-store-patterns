import type { FC } from "react";
import type { Product } from "../../patterns/products/types";

type FlatWishlistProps = {
  products: Product[];
};

export const FlatWishlist: FC<FlatWishlistProps> = ({ products }) => {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <div>
            <span>{product.name}</span>
            <span>{product.price}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};
