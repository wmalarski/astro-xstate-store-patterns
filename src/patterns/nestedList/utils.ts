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
  current: WishlistStoreList;
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
  const result: Record<string, GetListGroupData> = {};

  // const deepAssign = (
  //   wishlist: WishlistStoreList,
  //   path: string[],
  //   data: Record<string, GetListGroupData>
  // ) => {
  //   const [current, ...rest] = path;

  //   if (rest.length === 0) {
  //     data[wishlist.listId] = { current: wishlist, children: {} }
  //     return;
  //   }

  //   const child = data.children[current];

  //   if (child) {
  //     deepAssign(wishlist, rest, child);
  //     return;
  //   }

  //   const newChild = { children: {}, current: [], listId: current };
  //   data.children[current] = newChild;

  //   deepAssign(wishlist, rest, newChild);
  // };

  // Object.values(wishlists).forEach((wishlist) => {
  //   const position = nested[wishlist.listId]?.position ?? [];
  //   const reversed = position.toReversed()

  //   let currentRoot = result

  //   while (reversed.length > 0) {
  //     const element = reversed.pop()!
  //     const nextRoot = currentRoot[element];

  //     if (nextRoot) {
  //       currentRoot = nextRoot.children
  //       continue
  //     }

  //     const newRoot = { current:  }
  //     currentRoot[element] =
  //   }

  //   deepAssign(wishlist, nestedList.position, result);
  // });

  Object.values(wishlists).forEach((wishlist) => {
    const position = nested[wishlist.listId]?.position ?? [];

    //   const reversed = position.toReversed()
    //   let currentRoot = result
    //   while (reversed.length > 0) {
    //     const element = reversed.pop()!
    //     const nextRoot = currentRoot[element];
    //     if (nextRoot) {
    //       currentRoot = nextRoot.children
    //       continue
    //     }
    //     const newRoot = { current:  }
    //     currentRoot[element] =
    //   }
    //   deepAssign(wishlist, nestedList.position, result);
  });

  return result;
};

export type GetListGroupData2 = {
  current?: WishlistStoreList;
  children: Record<string, GetListGroupData2>;
  path: string[];
};

const setWithDefault = (
  path: string[],
  fullPath: string[],
  value: WishlistStoreList,
  object: GetListGroupData2
) => {
  const [current, ...rest] = path;

  console.log("setWithDefault", path, current, value, object);

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

export const groupByPosition2 = (
  wishlists: WishlistStoreList[],
  nested: Record<string, NestedProductGroup>
) => {
  const result: GetListGroupData2 = { children: {}, path: [] };

  wishlists.forEach((wishlist) => {
    const position = nested[wishlist.listId]?.position ?? [];
    const path = [...position, wishlist.listId];
    setWithDefault(path, path, wishlist, result);
  });

  console.log({ result });

  return result;
};
