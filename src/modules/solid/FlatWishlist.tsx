/** @jsxImportSource solid-js */

import { useSelector } from "@xstate/store/solid";
import { nanoid } from "nanoid";
import { createMemo, createSignal, For, Show, type Component } from "solid-js";
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

const AddListForm: Component<AddListFormProps> = (props) => {
  const [listId, setListId] = createSignal(nanoid());

  const position = useSelector(
    props.wishlistApi.store,
    ({ context }) => Object.keys(context.lists).length + 1
  );

  return (
    <form
      class="flex flex-col gap-2"
      {...props.flatListApi.getAddListFormProps(
        props.wishlistApi.getAddListFormProps({
          onSubmit() {
            setListId(nanoid());
          },
        })
      )}
    >
      <h3>Add Wishlist</h3>
      <input type="hidden" name="listId" value={listId()} />
      <input type="hidden" name="position" value={position()} />
      <label class={formControlRecipe()}>
        <div class={labelRecipe()}>
          <span class={labelTextRecipe()}>Name</span>
        </div>
        <input
          class={textFieldRecipe({ variant: "bordered", size: "sm" })}
          type="text"
          name="name"
          required
        />
      </label>
      <label class={formControlRecipe()}>
        <div class={labelRecipe()}>
          <span class={labelTextRecipe()}>Description</span>
        </div>
        <input
          class={textFieldRecipe({ variant: "bordered", size: "sm" })}
          type="text"
          name="description"
          required
        />
      </label>
      <button class={buttonRecipe({ size: "sm", color: "accent" })}>
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

const WishlistsGroupItem: Component<WishlistsGroupItemProps> = (props) => {
  return (
    <Show when={props.products[props.productId]}>
      {(product) => (
        <li
          class={cardRecipe({
            shadow: "md",
            class: "bg-base-200",
            size: "side",
          })}
        >
          <figure>
            <img src={product().image} alt={product().name} />
          </figure>
          <div class={cardBodyRecipe()}>
            <span>{props.products[props.productId]?.name}</span>
            <button
              class={buttonRecipe({ size: "sm", color: "error" })}
              {...props.wishlistApi.getRemoveProductButtonProps({
                listId: props.list.listId,
                productId: props.productId,
              })}
            >
              Remove
            </button>
          </div>
        </li>
      )}
    </Show>
  );
};

type WishlistsGroupProps = {
  products: Record<string, Product>;
  list: WishlistStoreList;
  wishlistApi: Wishlist.MachineApi;
};

const WishlistsGroup: Component<WishlistsGroupProps> = (props) => {
  const wishlist = useSelector(
    props.wishlistApi.store,
    ({ context }) => context.lists[props.list.listId]
  );

  return (
    <div class={cardRecipe({ shadow: "md", size: "compact" })}>
      <div class={cardBodyRecipe()}>
        <h3 class={cardTitleRecipe()}>{wishlist()?.name}</h3>
        <ul>
          <For each={wishlist()?.productIds}>
            {(productId) => (
              <WishlistsGroupItem
                list={props.list}
                productId={productId}
                products={props.products}
                wishlistApi={props.wishlistApi}
              />
            )}
          </For>
        </ul>
        <div class={cardActionsRecipe()}>
          <button
            type="button"
            class={buttonRecipe({ size: "sm", color: "error" })}
            {...props.wishlistApi.getRemoveListButtonProps(props.list)}
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
};

const WishlistsGroups: Component<WishlistsGroupsProps> = (props) => {
  const lists = useSelector(
    props.wishlistApi.store,
    ({ context }) => context.lists
  );

  const productsMap = createMemo(() => {
    return Object.fromEntries(
      props.products.map((product) => [product.id, product])
    );
  });

  return (
    <ul>
      <For each={Object.values(lists())}>
        {(list) => (
          <WishlistsGroup
            products={productsMap()}
            wishlistApi={props.wishlistApi}
            list={list}
          />
        )}
      </For>
    </ul>
  );
};

type FlatWishlistProps = {
  products: Product[];
  wishlistApi: Wishlist.MachineApi;
  flatListApi: FlatList.MachineApi;
};

export const FlatWishlist: Component<FlatWishlistProps> = (props) => {
  return (
    <section class="flex flex-col gap-4">
      <h2 class="text-2xl">SolidJS Flat Wishlist</h2>
      <AddListForm
        flatListApi={props.flatListApi}
        wishlistApi={props.wishlistApi}
      />
      <WishlistsGroups
        products={props.products}
        wishlistApi={props.wishlistApi}
      />
    </section>
  );
};
