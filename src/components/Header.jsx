import { useContext } from "react";
import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button";
import { CartContext } from "../store/CartContext";
import UserProgressContext from "../store/userProgressContext";

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems,item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  function handleShowCart(){
    userProgressCtx.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="Food image"/>
        <h1 >Let's order some Cuisine</h1>
      </div>
      <nav>
        <Button textOnly={true} onClick={handleShowCart}>My Cart ({totalCartItems})</Button>
      </nav>
    </header>
  );
}