import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import env from "~/config/env";

export interface LendingEntity {
  defi: string;
  market: string;
  asset: string;
  liquid_threshold: number;
  price: number;
  amount: number;
}

export type LendingStoreProps = {
  supplies: LendingEntity[];
  borrowed: LendingEntity[];
};

export interface LendingActionsProps {
  // supply
  addSupply: (data: any) => void;
  removeSupply: () => void;
  // borrow
  addBorrow: (data: any) => void;
  removeBorrow: () => void;
}

export type LendingProps = LendingStoreProps & LendingActionsProps;
const keyStorage = `${env.APP_PREFIX}`;

export const useLendingStore = create<
  LendingProps,
  [["zustand/persist", LendingProps]]
>(
  persist(
    (set) => ({
      supplies: [],
      borrowed: [],

      // supply actions
      addSupply: (data: any) =>
        set((state) => ({ supplies: [...state.supplies, data] })),
      removeSupply: () => set({ supplies: [] }),

      // borrow actions
      addBorrow: (data: any) =>
        set((state) => ({ borrowed: [...state.borrowed, data] })),
      removeBorrow: () => set({ borrowed: [] }),
    }),
    {
      name: keyStorage, // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
