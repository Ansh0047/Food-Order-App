import Header from "./components/Header";
import Meals from "./components/Meals";
import CartContextProvider from "./store/CartContext";
import UserProgressContext from "./store/userProgressContext";

function App() {
  return (
      <CartContextProvider>
        <Header />
        <Meals />
      </CartContextProvider>
  );
}

export default App;
