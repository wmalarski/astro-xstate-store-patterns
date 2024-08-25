import type { FC } from "react";
import * as FlatList from "../../patterns/flatList";
import type { Product } from "../../patterns/products/types";
import * as Wishlist from "../../patterns/wishlist";

type ProductItemProps = {
  product: Product;
  wishlistApi: Wishlist.MachineApi;
  flatListApi: FlatList.MachineApi;
};

export const ProductItem: FC<ProductItemProps> = ({ product }) => {
  return (
    <li>
      <div>
        <span>{product.name}</span>
        <span>{product.price}</span>
      </div>
    </li>
  );
};

type ProductListProps = {
  products: Product[];
  wishlistApi: Wishlist.MachineApi;
  flatListApi: FlatList.MachineApi;
};

export const ProductList: FC<ProductListProps> = ({
  products,
  flatListApi,
  wishlistApi,
}) => {
  return (
    <ul>
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          flatListApi={flatListApi}
          wishlistApi={wishlistApi}
        />
      ))}
    </ul>
  );
};
