import Modal from "./UI/Modal";
import { useContext } from "react";
import { CartContext } from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import UserProgressContext from "../store/userProgressContext";

export default function Cart() {
  const { items } = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = items.reduce((totalPrice, item) => {
    return (totalPrice += item.quantity * item.price);
  }, 0);

  return (
    <Modal className="cart" open={userProgressCtx.progress === 'cart'}>
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.quantity}
          </li>
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <Button textOnly>Close</Button>
      <Button>Go checkout</Button>
    </Modal>
  );
}
