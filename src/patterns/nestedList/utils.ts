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

export const getListGroup = (groups: NestedProductGroup[]) => {
  return groupByPosition(groups, []);
};
