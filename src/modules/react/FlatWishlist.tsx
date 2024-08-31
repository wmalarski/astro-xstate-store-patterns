import { useSelector } from "@xstate/store/react";
import { nanoid } from "nanoid";
import { useMemo, type FC } from "react";
import * as FlatList from "../../patterns/flatList";
import type { Product } from "../../patterns/products/types";
import type { WishlistStoreList } from "../../patterns/wishlist";
import * as Wishlist from "../../patterns/wishlist";
import { buttonRecipe } from "../../recipes/button";
import {
  cardActionsRecipe,
  cardBodyRecipe,
  cardRecipe,
  cardTitleRecipe,
} from "../../recipes/card";
import { formControlRecipe } from "../../recipes/formControl";
import { labelRecipe, labelTextRecipe } from "../../recipes/label";
import { textFieldRecipe } from "../../recipes/textField";

type AddListFormProps = {
  flatListApi: FlatList.MachineApi;
  wishlistApi: Wishlist.MachineApi;
};

const AddListForm: FC<AddListFormProps> = ({ flatListApi, wishlistApi }) => {
  const position = useSelector(
    wishlistApi.store,
    ({ context }) => Object.keys(context.lists).length + 1
  );

  return (
    <form
      className="flex flex-col gap-2"
      {...flatListApi.getAddListFormProps(wishlistApi.getAddListFormProps())}
    >
      <h3>Add Wishlist</h3>
      <input type="hidden" name="listId" value={nanoid()} />
      <input type="hidden" name="position" value={position} />
      <label className={formControlRecipe()}>
        <div className={labelRecipe()}>
          <span className={labelTextRecipe()}>Name</span>
        </div>
        <input
          className={textFieldRecipe({ variant: "bordered", size: "sm" })}
          type="text"
          name="name"
          required
        />
      </label>
      <button className={buttonRecipe({ size: "sm", color: "accent" })}>
        Add list
      </button>
    </form>
  );
};

type WishlistsGroupItemProps = {
  products: Record<string, Product>;
  productId: string;
  list: WishlistStoreList;
  wishlistApi: Wishlist.MachineApi;
};

const WishlistsGroupItem: FC<WishlistsGroupItemProps> = ({
  list,
  productId,
  wishlistApi,
  products,
}) => {
  const product = products[productId];

  if (!product) {
    return null;
  }

  return (
    <li
      className={cardRecipe({
        shadow: "md",
        class: "bg-base-200",
        size: "side",
      })}
    >
      <figure>
        <img src={product.image} alt={product.name} />
      </figure>
      <div className={cardBodyRecipe()}>
        <span>{products[productId]?.name}</span>
        <button
          className={buttonRecipe({ size: "sm", color: "error" })}
          {...wishlistApi.getRemoveProductButtonProps({
            listId: list.listId,
            productId,
          })}
        >
          Remove
        </button>
      </div>
    </li>
  );
};

type WishlistsGroupProps = {
  products: Record<string, Product>;
  list: WishlistStoreList;
  wishlistApi: Wishlist.MachineApi;
  flatListApi: FlatList.MachineApi;
};

const WishlistsGroup: FC<WishlistsGroupProps> = ({
  flatListApi,
  list,
  wishlistApi,
  products,
}) => {
  const wishlist = useSelector(
    wishlistApi.store,
    ({ context }) => context.lists[list.listId]
  );

  return (
    <div className={cardRecipe({ shadow: "md", size: "compact" })}>
      <div className={cardBodyRecipe()}>
        <h3 className={cardTitleRecipe()}>{wishlist?.name}</h3>
        <ul>
          {wishlist?.productIds?.map((productId) => (
            <WishlistsGroupItem
              key={productId}
              list={list}
              productId={productId}
              products={products}
              wishlistApi={wishlistApi}
            />
          ))}
        </ul>
        <div className={cardActionsRecipe()}>
          <button
            type="button"
            className={buttonRecipe({ size: "sm", color: "error" })}
            {...wishlistApi.getRemoveListButtonProps(
              list,
              flatListApi.getRemoveListButtonProps(list)
            )}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

type WishlistsGroupsProps = {
  products: Product[];
  wishlistApi: Wishlist.MachineApi;
  flatListApi: FlatList.MachineApi;
};

const WishlistsGroups: FC<WishlistsGroupsProps> = ({
  flatListApi,
  products,
  wishlistApi,
}) => {
  const lists = useSelector(wishlistApi.store, ({ context }) => context.lists);

  const productsMap = useMemo(() => {
    return Object.fromEntries(products.map((product) => [product.id, product]));
  }, [products]);

  return (
    <ul>
      {Object.entries(lists).map(([listId, list]) => (
        <WishlistsGroup
          key={listId}
          flatListApi={flatListApi}
          products={productsMap}
          wishlistApi={wishlistApi}
          list={list}
        />
      ))}
    </ul>
  );
};

type FlatWishlistProps = {
  products: Product[];
  wishlistApi: Wishlist.MachineApi;
  flatListApi: FlatList.MachineApi;
};

export const FlatWishlist: FC<FlatWishlistProps> = ({
  flatListApi,
  products,
  wishlistApi,
}) => {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl">React Flat Wishlist</h2>
      <AddListForm flatListApi={flatListApi} wishlistApi={wishlistApi} />
      <WishlistsGroups
        products={products}
        flatListApi={flatListApi}
        wishlistApi={wishlistApi}
      />
    </section>
  );
};
