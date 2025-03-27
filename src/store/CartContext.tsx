import { createContext, useReducer } from "react";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity?: number;
};

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "UPDATE_ITEM"; payload: { id: string } }
  | { type: "CLEAR_CART" };

function getExistingItemsAndItemIndex(
  state: { items: CartItem[] },
  itemId: string
): [CartItem[], number] {
  const existingItems = [...state.items];
  const existingCartItemIndex = existingItems.findIndex(
    (cartItem) => cartItem.id === itemId
  );

  return [existingItems, existingCartItemIndex];
}

function cartReducer(
  state: { items: CartItem[] },
  action: CartAction
): { items: CartItem[] } {
  if (action.type === "ADD_ITEM") {
    const [updatedItems, existingCartItemIndex] = getExistingItemsAndItemIndex(
      state,
      action.payload.id
    );

    if (existingCartItemIndex > -1) {
      const existingItem = updatedItems[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity! + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.payload, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === "UPDATE_ITEM") {
    const [updatedItems, existingCartItemIndex] = getExistingItemsAndItemIndex(
      state,
      action.payload.id
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity! - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === "CLEAR_CART") {
    return { ...state, items: [] };
  }

  return state;
}

const CartContext = createContext<{
  items: CartItem[];
  total: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}>({
  items: [],
  total: 0,
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
});

export function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  const total = cart.items.reduce(
    (acc, { price, quantity }) => acc + price * quantity!,
    0
  );

  function addItem(item: CartItem) {
    dispatchCartAction({
      type: "ADD_ITEM",
      payload: item,
    });
  }

  function removeItem(id: string) {
    dispatchCartAction({ type: "UPDATE_ITEM", payload: { id } });
  }

  function clearCart() {
    dispatchCartAction({ type: "CLEAR_CART" });
  }

  const context = {
    items: cart.items,
    total,
    addItem,
    removeItem,
    clearCart,
  };

  return (
    <CartContext.Provider value={context}>{children}</CartContext.Provider>
  );
}

export default CartContext;
