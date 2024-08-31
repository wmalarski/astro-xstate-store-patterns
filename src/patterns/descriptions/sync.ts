import type { EventFromStore } from "@xstate/store";
import type { WishlistStore } from "../wishlist";
import type { DescriptionsStore } from "./store";

export const subscribeWishlistStore = (
  descriptions: DescriptionsStore,
  wishlistStore: WishlistStore
) => {
  wishlistStore.inspect((event) => {
    if (event.type === "@xstate.event") {
      const typedEvent = event.event as EventFromStore<WishlistStore>;
      if (typedEvent.type === "removeList") {
        descriptions.send({ type: "remove", listId: typedEvent.listId });
      }
    }
  });
};
