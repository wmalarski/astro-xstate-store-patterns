import { createStore } from "@xstate/store";

export type NestedProductGroup = {
  listId: string;
  name: string;
  position: string[];
};

type NestedStoreAddListEvent = NestedProductGroup;

export type NestedStoreRemoveListEvent = {
  listId: string;
};

export type NestedStoreUpdatePositionsEvent = {
  positions: Record<string, string[]>;
};

type CreateNestedStoreArgs = {
  initialLists?: Record<string, NestedProductGroup>;
};

export const createNestedStore = ({
  initialLists,
}: CreateNestedStoreArgs = {}) => {
  return createStore(
    { lists: initialLists ?? {} },
    {
      addList: (context, args: NestedStoreAddListEvent) => {
        return { ...context, lists: { ...context.lists, [args.listId]: args } };
      },
      removeList: (context, event: NestedStoreRemoveListEvent) => {
        if (!(event.listId in context.lists)) {
          return context;
        }

        const updated = { ...context.lists };
        delete updated[event.listId];

        return { ...context, lists: updated };
      },
      updatePositions: (context, event: NestedStoreUpdatePositionsEvent) => {
        const update = { ...context.lists };

        Object.entries(event.positions).forEach(([listId, position]) => {
          const list = update[listId];

          if (!list) {
            return;
          }

          update[listId] = { ...list, position };
        });

        return { ...context, lists: update };
      },
    }
  );
};

export type NestedStore = ReturnType<typeof createNestedStore>;
