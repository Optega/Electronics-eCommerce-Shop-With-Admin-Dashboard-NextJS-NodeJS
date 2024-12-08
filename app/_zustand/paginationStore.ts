import { create } from "zustand";

export type State = {
  page: number;
  ordersCount: number;
};

export type Actions = {
  incrementPage: () => void;
  decrementPage: () => void;
  setOrdersCount: (ordersCount: number) => void;
};

export const usePaginationStore = create<State & Actions>((set) => ({
  page: 1,
  ordersCount: 0,
  incrementPage: () => {
    set((state: any) => {
      state.page = state.page + 1;
      return { page: state.page };
    });
  },
  decrementPage: () => {
    set((state: any) => {
      if (state.page !== 1) {
        state.page = state.page - 1;
        return { page: state.page };
      }
      return {page: 1};
    });
  },
  setOrdersCount: (ordersCount) => {
    set(() => ({
      ordersCount,
    }));
  },
}));
