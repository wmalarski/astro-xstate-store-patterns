import type { PatternAProduct } from "./types";

type PatternAData = {
  products: PatternAProduct[];
};

export const patternAData: PatternAData = {
  products: [
    { id: "1", name: "Chair", price: 40 },
    { id: "2", name: "Door", price: 60 },
  ],
};
