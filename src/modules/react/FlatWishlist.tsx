import { useSelector } from "@xstate/store/react";
import { nanoid } from "nanoid";
import { useEffect, useMemo, useRef, type FC } from "react";
import { createSwapy } from "swapy";
import * as Descriptions from "../../patterns/descriptions";
import * as FlatList from "../../patterns/flatList";
import type { Product } from "../../patterns/products/types";
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
  descriptionsApi: Descriptions.MachineApi;
};

const AddListForm: FC<AddListFormProps> = ({
  flatListApi,
  wishlistApi,
  descriptionsApi,
}) => {
  const position = useSelector(
    wishlistApi.store,
    ({ context }) => Object.keys(context.lists).length + 1
  );

  return (
    <form
      className="flex flex-col gap-2"
      {...flatListApi.getAddListFormProps(
        wishlistApi.getAddListFormProps(
          descriptionsApi.getSetDescriptionFormProps()
        )
      )}
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
      <label className={formControlRecipe()}>
        <div className={labelRecipe()}>
          <span className={labelTextRecipe()}>Description</span>
        </div>
        <input
          className={textFieldRecipe({ variant: "bordered", size: "sm" })}
          type="text"
          name="description"
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
  list: Wishlist.WishlistStoreList;
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
  list: Wishlist.WishlistStoreList;
  wishlistApi: Wishlist.MachineApi;
  descriptionsApi: Descriptions.MachineApi;
};

const WishlistsGroup: FC<WishlistsGroupProps> = ({
  list,
  wishlistApi,
  products,
  descriptionsApi,
}) => {
  const wishlist = useSelector(
    wishlistApi.store,
    ({ context }) => context.lists[list.listId]
  );

  const description = useSelector(
    descriptionsApi.store,
    ({ context }) => context.lists[list.listId]
  );

  return (
    <div
      data-swapy-item={list.listId}
      className={cardRecipe({
        class: "relative",
        shadow: "md",
        size: "compact",
      })}
    >
      <div className={cardBodyRecipe()}>
        <h3 className={cardTitleRecipe()}>{wishlist?.name}</h3>
        <span className="text-lg">{description}</span>
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
            {...wishlistApi.getRemoveListButtonProps(list)}
          >
            Remove
          </button>
        </div>
      </div>
      <div
        className="absolute left-0 top-0 w-5 h-full bg-base-300 opacity-50 cursor-pointer"
        data-swapy-handle
      />
    </div>
  );
};

type WishlistsGroupsProps = {
  products: Product[];
  wishlistApi: Wishlist.MachineApi;
  descriptionsApi: Descriptions.MachineApi;
};

const WishlistsGroups: FC<WishlistsGroupsProps> = ({
  products,
  wishlistApi,
  descriptionsApi,
}) => {
  const listRef = useRef<HTMLUListElement>(null);

  const lists = useSelector(wishlistApi.store, ({ context }) => context.lists);

  const productsMap = useMemo(() => {
    return Object.fromEntries(products.map((product) => [product.id, product]));
  }, [products]);

  useEffect(() => {
    if (Object.keys(lists).length === 0) {
      return;
    }

    const swapy = createSwapy(listRef.current!);
    swapy.onSwap(({ data }) => {
      console.log("data", data);
    });
  }, [lists]);

  return (
    <ul ref={listRef}>
      {Object.entries(lists).map(([listId, list], index) => (
        <li data-swapy-slot={index} key={listId}>
          <WishlistsGroup
            descriptionsApi={descriptionsApi}
            products={productsMap}
            wishlistApi={wishlistApi}
            list={list}
          />
        </li>
      ))}
    </ul>
  );
};

type FlatWishlistProps = {
  products: Product[];
  wishlistApi: Wishlist.MachineApi;
  flatListApi: FlatList.MachineApi;
  descriptionsApi: Descriptions.MachineApi;
};

export const FlatWishlist: FC<FlatWishlistProps> = ({
  flatListApi,
  products,
  wishlistApi,
  descriptionsApi,
}) => {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl">React Flat Wishlist</h2>
      <AddListForm
        descriptionsApi={descriptionsApi}
        flatListApi={flatListApi}
        wishlistApi={wishlistApi}
      />
      <WishlistsGroups
        products={products}
        wishlistApi={wishlistApi}
        descriptionsApi={descriptionsApi}
      />
    </section>
  );
};
