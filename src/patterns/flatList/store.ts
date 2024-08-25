import { createStore } from "@xstate/store";

type FlatListProductGroup = {
  listId: string;
  name: string;
  position: string;
};

type FlatListStoreAddListEvent = FlatListProductGroup;

type FlatListStoreRemoveListEvent = {
  listId: string;
};

export type FlatListStoreUpdatePositionsEvent = {
  positions: Record<string, string>;
};

type CreateFlatListStoreArgs = {
  initialLists?: Record<string, FlatListProductGroup>;
};

export const createFlatListStore = ({
  initialLists,
}: CreateFlatListStoreArgs = {}) => {
  return createStore(
    { lists: initialLists ?? {} },
    {
      addList: (context, args: FlatListStoreAddListEvent) => {
        return { ...context, lists: { ...context.lists, [args.listId]: args } };
      },
      removeList: (context, event: FlatListStoreRemoveListEvent) => {
        if (!(event.listId in context.lists)) {
          return context;
        }

        const updated = { ...context.lists };
        delete updated[event.listId];

        return { ...context, lists: updated };
      },
      updatePositions: (context, event: FlatListStoreUpdatePositionsEvent) => {
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

export type FlatListStore = ReturnType<typeof createFlatListStore>;
