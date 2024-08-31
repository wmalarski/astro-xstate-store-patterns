/** @jsxImportSource solid-js */

import { useSelector } from "@xstate/store/solid";
import { nanoid } from "nanoid";
import { createMemo, createSignal, For, Show, type Component } from "solid-js";
import * as NestedList from "../../patterns/nestedList";
import type { Product } from "../../patterns/products/types";
import * as Wishlist from "../../patterns/wishlist";
import { buttonRecipe } from "../../recipes/button";
import {
  cardBodyRecipe,
  cardRecipe,
  cardTitleRecipe,
} from "../../recipes/card";
import { formControlRecipe } from "../../recipes/formControl";
import { labelRecipe, labelTextRecipe } from "../../recipes/label";
import { textFieldRecipe } from "../../recipes/textField";

type AddListFormProps = {
  nestedListApi: NestedList.MachineApi;
  wishlistApi: Wishlist.MachineApi;
  group?: NestedList.GetListGroupData;
};

const AddListForm: Component<AddListFormProps> = (props) => {
  const [listId, setListId] = createSignal(nanoid());

  return (
    <form
      class="flex flex-col gap-2"
      {...props.nestedListApi.getAddListFormProps(
        props.wishlistApi.getAddListFormProps({
          onSubmit() {
            setListId(nanoid());
          },
        })
      )}
    >
      <h3>{props.group ? "Add Nested Wishlist" : "Add Wishlist"}</h3>
      <input type="hidden" name="listId" value={listId()} />
      <input
        type="hidden"
        name="position"
        value={props.group?.path.join("/")}
      />
      <label class={formControlRecipe()}>
        <div class={labelRecipe()}>
          <span class={labelTextRecipe()}>Name</span>
        </div>
        <input
          required
          class={textFieldRecipe({ variant: "bordered", size: "sm" })}
          type="text"
          name="name"
        />
      </label>
      <button class={buttonRecipe({ size: "sm", color: "secondary" })}>
        Add list
      </button>
    </form>
  );
};

type WishlistsGroupItemProps = {
  products: Record<string, Product>;
  productId: string;
  wishlist: Wishlist.WishlistStoreList;
  wishlistApi: Wishlist.MachineApi;
};

const WishlistsGroupItem: Component<WishlistsGroupItemProps> = (props) => {
  return (
    <Show when={props.products[props.productId]}>
      {(product) => (
        <li class={cardRecipe({ shadow: "md", size: "side" })}>
          <div class={cardBodyRecipe()}>
            <span>{props.products[props.productId]?.name}</span>
            <button
              class={buttonRecipe({ size: "sm", color: "error" })}
              {...props.wishlistApi.getRemoveProductButtonProps({
                listId: props.wishlist.listId,
                productId: props.productId,
              })}
            >
              Remove
            </button>
          </div>
          <figure>
            <img src={product().image} alt={product.name} />
          </figure>
        </li>
      )}
    </Show>
  );
};

type WishlistsGroupProps = {
  products: Record<string, Product>;
  wishlist: Wishlist.WishlistStoreList;
  wishlistApi: Wishlist.MachineApi;
};

const WishlistsGroup: Component<WishlistsGroupProps> = (props) => {
  return (
    <div class="flex flex-col gap-2">
      <div class="flex w-full justify-between">
        <h3 class={cardTitleRecipe()}>{props.wishlist?.name}</h3>
        <button
          class={buttonRecipe({ size: "sm", color: "error" })}
          {...props.wishlistApi.getRemoveListButtonProps(props.wishlist)}
        >
          Remove
        </button>
      </div>
      <ul>
        <For each={props.wishlist?.productIds}>
          {(productId) => (
            <WishlistsGroupItem
              wishlist={props.wishlist}
              productId={productId}
              products={props.products}
              wishlistApi={props.wishlistApi}
            />
          )}
        </For>
      </ul>
    </div>
  );
};

type WishlistsProps = {
  products: Record<string, Product>;
  group: NestedList.GetListGroupData;
  wishlistApi: Wishlist.MachineApi;
  nestedListApi: NestedList.MachineApi;
};

const Wishlists: Component<WishlistsProps> = (props) => {
  return (
    <div
      class={cardRecipe({
        size: "compact",
        shadow: "xl",
        variant: "bordered",
      })}
    >
      <div class={cardBodyRecipe()}>
        <Show when={props.group.current}>
          {(wishlist) => (
            <WishlistsGroup
              products={props.products}
              wishlistApi={props.wishlistApi}
              wishlist={wishlist()}
            />
          )}
        </Show>
        <AddListForm
          nestedListApi={props.nestedListApi}
          wishlistApi={props.wishlistApi}
          group={props.group}
        />
        <ul>
          <For each={Object.values(props.group.children)}>
            {(child) => (
              <li>
                <Wishlists
                  group={child}
                  nestedListApi={props.nestedListApi}
                  wishlistApi={props.wishlistApi}
                  products={props.products}
                />
              </li>
            )}
          </For>
        </ul>
      </div>
    </div>
  );
};

type WishlistsRootProps = {
  products: Product[];
  wishlistApi: Wishlist.MachineApi;
  nestedListApi: NestedList.MachineApi;
};

const WishlistsRoot: Component<WishlistsRootProps> = (props) => {
  const wishlists = useSelector(
    props.wishlistApi.store,
    ({ context }) => context.lists
  );

  const nestedLists = useSelector(
    props.nestedListApi.store,
    ({ context }) => context.lists
  );

  const root = createMemo(() =>
    NestedList.groupByPosition(Object.values(wishlists()), nestedLists())
  );

  const productsMap = createMemo(() =>
    Object.fromEntries(props.products.map((product) => [product.id, product]))
  );

  return (
    <Wishlists
      group={root()}
      nestedListApi={props.nestedListApi}
      products={productsMap()}
      wishlistApi={props.wishlistApi}
    />
  );
};

type NestedWishlistProps = {
  products: Product[];
  wishlistApi: Wishlist.MachineApi;
  nestedListApi: NestedList.MachineApi;
};

export const NestedWishlist: Component<NestedWishlistProps> = (props) => {
  return (
    <section class="flex flex-col gap-4">
      <h2 class="text-2xl">SolidJS Nested Wishlist</h2>
      <WishlistsRoot
        products={props.products}
        nestedListApi={props.nestedListApi}
        wishlistApi={props.wishlistApi}
      />
    </section>
  );
};
