import * as FlatList from "../patterns/flatList";
import { subscribeWishlistStore } from "../patterns/flatList/sync";
import * as NestedList from "../patterns/nestedList";
import * as Wishlist from "../patterns/wishlist";

export const wishlistStore = Wishlist.createWishlistStore();
export const flatListStore = FlatList.createFlatListStore();
export const nestedStore = NestedList.createNestedStore();

subscribeWishlistStore(flatListStore, wishlistStore);
