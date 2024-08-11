import { useContext } from "react";
import Modal from "../components/UI/Modal";
import UserProgressContext from "../store/userProgressContext";
import { CartContext } from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";

export default function CheckOut() {
  const userProgressCtx = useContext(UserProgressContext);
  const cartCtx = useContext(CartContext);
  const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
    return (totalPrice += item.quantity * item.price);
  }, 0);

  function handleClose(){
    userProgressCtx.hideCheckout();
  }

  return (
    <Modal className="checkout" open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
      <form>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="full-name" />
        <Input label="Email Adress" type="email" id="email" />
        <Input label="Street" type="text" id="Street" />
        <div className="control-row">
            <Input label="Postal Code" type="text" id="postal-code" />
            <Input label="City" type="text" id="city" />
        </div>
        <p className="modal-actions">
            <Button textOnly type="button" onClick={handleClose}>Close</Button>
            <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}
