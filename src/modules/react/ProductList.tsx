import type { FC } from "react";
import type { Product } from "../../patterns/products/types";

type ProductListProps = {
  products: Product[];
};

export const ProductList: FC<ProductListProps> = ({ products }) => {
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
