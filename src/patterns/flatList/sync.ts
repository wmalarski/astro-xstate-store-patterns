import type { EventFromStore } from "@xstate/store";
import type { WishlistStore } from "../wishlist";
import type { FlatListStore } from "./store";

export const subscribeWishlistStore = (
  flatListStore: FlatListStore,
  wishlistStore: WishlistStore
) => {
  wishlistStore.inspect((event) => {
    if (event.type === "@xstate.event") {
      const typedEvent = event.event as EventFromStore<WishlistStore>;
      if (typedEvent.type === "removeList") {
        flatListStore.send({ type: "removeList", listId: typedEvent.listId });
      }
    }
  });
};
