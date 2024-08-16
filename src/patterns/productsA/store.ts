import { createStore } from "@xstate/store";
import type { PatternAProduct } from "./types";

type CreateProductsAStoreArgs = {
  products: PatternAProduct[];
};

export const createProductsAStore = () => {
  return createStore(
    // Initial context
    { count: 0, name: "David" },
    // Transitions
    {
      inc: {
        count: (context) => context.count + 1,
      },
      add: {
        count: (context, event: { num: number }) => context.count + event.num,
      },
      changeName: {
        name: (context, event: { newName: string }) => event.newName,
      },
    }
  );
};
