import { create } from "zustand";

export type Product = {
  id: number;
  title: string;
  price: number;
};

type CartState = {
  products: Product[];
  cartItemsCount: number;
  addToCart: (p: Product) => void;
  removeFromCart: (productId: number) => void;
};

const useCartStore = create<CartState>((set) => ({
  products: [],
  cartItemsCount: 0,
  addToCart: (product) => {
    set((state: { products: Product[]; cartItemsCount: number }) => ({
      products: [...state.products, product],
      cartItemsCount: state.cartItemsCount + 1,
    }));
  },
  removeFromCart: (id) =>
    set((state: { products: Product[]; cartItemsCount: number }) => ({
      products: state.products.filter((p) => p.id !== id),
      cartItemsCount: state.cartItemsCount - 1,
    })),
}));

export default useCartStore;
