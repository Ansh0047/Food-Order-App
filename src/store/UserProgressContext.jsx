import { createContext, useState } from "react";

const UserProgressContext = createContext({
  progress: "", // 'cart' , 'checkout'
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

export function UserProgressContextProvider({ children }) {
  cosnt[userProgress, setUserProgress] = useState("");

  function showCart() {
    setUserProgress("cart");
  }
  function hideCart() {
    setUserProgress("");
  }

  function showCheckout() {
    setUserProgress("checkout");
  }
  function hideCheckout() {
    setUserProgress("");
  }

  const useProgressCtx = {
    progress : userProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout
  }

  return (
    <UserProgressContext.Provider value={useProgressCtx}>{children}</UserProgressContext.Provider>
  );
}

export default UserProgressContext;
