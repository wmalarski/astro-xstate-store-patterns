import type { FC } from "react";
import type { PatternAProduct } from "../../patterns/productsA/types";

type ProductListProps = {
  products: PatternAProduct[];
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
