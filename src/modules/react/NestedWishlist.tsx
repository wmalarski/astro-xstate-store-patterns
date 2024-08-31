import { useSelector } from "@xstate/store/react";
import { nanoid } from "nanoid";
import { useMemo, type FC } from "react";
import * as NestedList from "../../patterns/nestedList";
import {
  groupByPosition,
  type GetListGroupData,
} from "../../patterns/nestedList/utils";
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
  group?: GetListGroupData;
};

const AddListForm: FC<AddListFormProps> = ({
  nestedListApi,
  wishlistApi,
  group,
}) => {
  return (
    <form
      className="flex flex-col gap-2"
      {...nestedListApi.getAddListFormProps(wishlistApi.getAddListFormProps())}
    >
      <h3>{group ? "Add Nested Wishlist" : "Add Wishlist"}</h3>
      <input type="hidden" name="listId" value={nanoid()} />
      <input type="hidden" name="position" value={group?.path.join("/")} />
      <label className={formControlRecipe()}>
        <div className={labelRecipe()}>
          <span className={labelTextRecipe()}>Name</span>
        </div>
        <input
          required
          className={textFieldRecipe({ variant: "bordered", size: "sm" })}
          type="text"
          name="name"
        />
      </label>
      <button className={buttonRecipe({ size: "sm", color: "secondary" })}>
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

const WishlistsGroupItem: FC<WishlistsGroupItemProps> = ({
  wishlist,
  productId,
  wishlistApi,
  products,
}) => {
  const product = products[productId];

  if (!product) {
    return null;
  }

  return (
    <li className={cardRecipe({ shadow: "md", size: "side" })}>
      <div className={cardBodyRecipe()}>
        <span>{products[productId]?.name}</span>
        <button
          className={buttonRecipe({ size: "sm", color: "error" })}
          {...wishlistApi.getRemoveProductButtonProps({
            listId: wishlist.listId,
            productId,
          })}
        >
          Remove
        </button>
      </div>
      <figure>
        <img src={product.image} alt={product.name} />
      </figure>
    </li>
  );
};

type WishlistsGroupProps = {
  products: Record<string, Product>;
  wishlist: Wishlist.WishlistStoreList;
  wishlistApi: Wishlist.MachineApi;
  nestedListApi: NestedList.MachineApi;
};

const WishlistsGroup: FC<WishlistsGroupProps> = ({
  nestedListApi,
  wishlist,
  wishlistApi,
  products,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full justify-between">
        <h3 className={cardTitleRecipe()}>{wishlist?.name}</h3>
        <button
          className={buttonRecipe({ size: "sm", color: "error" })}
          {...wishlistApi.getRemoveListButtonProps(
            wishlist,
            nestedListApi.getRemoveListButtonProps(wishlist)
          )}
        >
          Remove
        </button>
      </div>
      <ul>
        {wishlist?.productIds.map((productId) => (
          <WishlistsGroupItem
            key={productId}
            wishlist={wishlist}
            productId={productId}
            products={products}
            wishlistApi={wishlistApi}
          />
        ))}
      </ul>
    </div>
  );
};

type WishlistsProps = {
  products: Record<string, Product>;
  group: GetListGroupData;
  wishlistApi: Wishlist.MachineApi;
  nestedListApi: NestedList.MachineApi;
};

const Wishlists: FC<WishlistsProps> = ({
  nestedListApi,
  products,
  group,
  wishlistApi,
}) => {
  return (
    <div
      className={cardRecipe({
        size: "compact",
        shadow: "xl",
        variant: "bordered",
      })}
    >
      <div className={cardBodyRecipe()}>
        {group.current && (
          <WishlistsGroup
            nestedListApi={nestedListApi}
            products={products}
            wishlistApi={wishlistApi}
            wishlist={group.current}
          />
        )}
        <AddListForm
          nestedListApi={nestedListApi}
          wishlistApi={wishlistApi}
          group={group}
        />
        <ul>
          {Object.values(group.children).map((child) => (
            <li key={child.path.join("/") + child.current?.listId}>
              <Wishlists
                group={child}
                nestedListApi={nestedListApi}
                wishlistApi={wishlistApi}
                products={products}
              />
            </li>
          ))}
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

const WishlistsRoot: FC<WishlistsRootProps> = ({
  nestedListApi,
  products,
  wishlistApi,
}) => {
  const wishlists = useSelector(
    wishlistApi.store,
    ({ context }) => context.lists
  );

  const nestedLists = useSelector(
    nestedListApi.store,
    ({ context }) => context.lists
  );

  const root = useMemo(
    () => groupByPosition(Object.values(wishlists), nestedLists),
    [wishlists, nestedLists]
  );

  const productsMap = useMemo(
    () => Object.fromEntries(products.map((product) => [product.id, product])),
    [products]
  );

  return (
    <Wishlists
      group={root}
      nestedListApi={nestedListApi}
      products={productsMap}
      wishlistApi={wishlistApi}
    />
  );
};

type NestedWishlistProps = {
  products: Product[];
  wishlistApi: Wishlist.MachineApi;
  nestedListApi: NestedList.MachineApi;
};

export const NestedWishlist: FC<NestedWishlistProps> = ({
  nestedListApi,
  products,
  wishlistApi,
}) => {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl">React Nested Wishlist</h2>
      <WishlistsRoot
        products={products}
        nestedListApi={nestedListApi}
        wishlistApi={wishlistApi}
      />
    </section>
  );
};
