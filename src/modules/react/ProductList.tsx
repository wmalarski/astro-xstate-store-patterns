import type { FC } from "react";
import * as FlatList from "../../patterns/flatList";
import type { Product } from "../../patterns/products/types";
import * as Wishlist from "../../patterns/wishlist";

type ProductListProps = {
  products: Product[];
  wishlistApi: Wishlist.MachineApi;
  flatListApi: FlatList.MachineApi;
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
