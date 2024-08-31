import type { EventFromStore } from "@xstate/store";
import type { WishlistStore } from "../wishlist";
import type { NestedStore } from "./store";

export const subscribeWishlistStore = (
  nestedStore: NestedStore,
  wishlistStore: WishlistStore
) => {
  wishlistStore.inspect((event) => {
    if (event.type === "@xstate.event") {
      const typedEvent = event.event as EventFromStore<WishlistStore>;
      if (typedEvent.type === "removeList") {
        nestedStore.send({ type: "removeList", listId: typedEvent.listId });
      }
    }
  });
};
