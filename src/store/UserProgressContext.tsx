import { createContext, useState } from "react";

const UserProgressContext = createContext({
  progress: "",
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

export function UserProgressContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userProgress, setUserProgress] = useState<"cart" | "checkout" | "">(
    ""
  );

  function showCart() {
    console.log("showCart");
    setUserProgress("cart");
  }

  function hideCart() {
    console.log("hideCart");
    setUserProgress("");
  }

  function showCheckout() {
    console.log("showCheckout");
    setUserProgress("checkout");
  }

  function hideCheckout() {
    console.log("hideCheckout");
    setUserProgress("");
  }

  const context = {
    progress: userProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };

  return (
    <UserProgressContext.Provider value={context}>
      {children}
    </UserProgressContext.Provider>
  );
}

export default UserProgressContext;
