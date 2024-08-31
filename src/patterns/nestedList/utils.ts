import type { WishlistStoreList } from "../wishlist";
import type { NestedProductGroup } from "./store";

export type GetListGroupData = {
  current?: WishlistStoreList;
  children: Record<string, GetListGroupData>;
  path: string[];
};

const setWithDefault = (
  path: string[],
  fullPath: string[],
  value: WishlistStoreList,
  object: GetListGroupData
) => {
  const [current, ...rest] = path;

  if (!current) {
    object.current = value;
    object.path = fullPath;
    return;
  }

  let child = object.children[current];
  if (child) {
    setWithDefault(rest, fullPath, value, child);
    return;
  }

  const newChild = { children: {}, path: [] };
  object.children[current] = newChild;
  setWithDefault(rest, fullPath, value, newChild);
};

export const groupByPosition = (
  wishlists: WishlistStoreList[],
  nested: Record<string, NestedProductGroup>
) => {
  const result: GetListGroupData = { children: {}, path: [] };

  wishlists.forEach((wishlist) => {
    const position = nested[wishlist.listId]?.position ?? [];
    const path = [...position, wishlist.listId];
    setWithDefault(path, path, wishlist, result);
  });

  return result;
};
