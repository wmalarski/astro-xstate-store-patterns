import type { WishlistStoreList } from "../wishlist";
import type { NestedProductGroup } from "./store";

export type GetListGroupResult = {
  parents: string[];
  current: NestedProductGroup[];
  children: GetListGroupResult[];
};

const groupByPosition = (
  groups: NestedProductGroup[],
  parents: string[]
): GetListGroupResult => {
  const mapping = new Map<string, NestedProductGroup[]>();
  const current = new Array<NestedProductGroup>();

  groups.forEach((group) => {
    const position = group.position[parents.length];

    if (!position) {
      current.push(group);
      return;
    }

    const map = mapping.get(position);
    if (!map) {
      mapping.set(position, [group]);
      return;
    }

    map.push(group);
  });

  const children = new Array();

  mapping.forEach((values, key) => {
    children.push(groupByPosition(values, [...parents, key]));
  });

  return { children, current, parents };
};

// const groupByPosition2 = (
//   groups: NestedProductGroup[],
//   parents: string[]
// ): GetListGroupResult => {

//   return { children, current, parents };
// };

export type GetListGroupData = {
  listId: string | null;
  current: WishlistStoreList[];
  children: Record<string, GetListGroupData>;
};

// export type GetListGroupRoot = {
//   current: WishlistStoreList[];
//   children: Record<string, GetListGroupData>;
// };

export const getListGroup = (
  wishlists: Record<string, WishlistStoreList>,
  nested: Record<string, NestedProductGroup>
) => {
  const result: GetListGroupData = {
    children: {},
    current: [],
    listId: null,
  };

  const deepAssign = (
    wishlist: WishlistStoreList,
    path: string[],
    data: GetListGroupData
  ) => {
    const [current, ...rest] = path;

    if (!current) {
      data.current.push(wishlist);
      return;
    }

    const child = data.children[current];

    if (child) {
      deepAssign(wishlist, rest, child);
      return;
    }

    const newChild = { children: {}, current: [], listId: current };
    data.children[current] = newChild;

    deepAssign(wishlist, rest, newChild);
  };

  Object.values(wishlists).forEach((wishlist) => {
    const nestedList = nested[wishlist.listId];

    if (!nestedList) {
      result.current.push(wishlist);
      return;
    }

    deepAssign(wishlist, nestedList.position, result);
  });

  return result;
};
