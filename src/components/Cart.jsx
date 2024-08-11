import Modal from "./UI/Modal";
import { useContext } from "react";
import { CartContext } from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import UserProgressContext from "../store/userProgressContext";
import CartItem from "./CartItem";

export default function Cart() {
  const { items } = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = items.reduce((totalPrice, item) => {
    return (totalPrice += item.quantity * item.price);
  }, 0);

  function handleCloseCart() {
    userProgressCtx.hideCart();
  }

  function handleGoToCheckout() {
    userProgressCtx.showCheckout();
  }

  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress === "cart"}
      onClose={userProgressCtx.progress === "cart" ? handleCloseCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => (
          // <li key={item.id}>
          //   {item.name} - {item.quantity}
          // </li>
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {items.length > 0 && (
          <Button onClick={handleGoToCheckout}>Go checkout</Button>
        )}
      </p>
    </Modal>
  );
}
