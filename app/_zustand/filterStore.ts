// "outOfStock", "inStock", "rating", "price", "sort", "page"
// create store for filters

import { create } from "zustand";

export type State = {
  filters: {
    outOfStock: boolean;
    inStock: boolean;
    rating: number;
    price: number;
    sort: string;
    page: number;
  };
};

export type Actions = {
  setFilters: (filters: State["filters"]) => void;
};

export const useFilterStore = create<State & Actions>((set) => ({
  filters: {
    outOfStock: true,
    inStock: true,
    rating: 0,
    price: 0,
    sort: "defaultSort",
    page: 1,
  },
  setFilters: (filters) => {
    set(() => ({
      filters,
    }));
  },
}));
