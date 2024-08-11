import { useContext } from "react";
import Modal from "./UI/Modal";
import UserProgressContext from "../store/userProgressContext";
import { CartContext } from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";

export default function Checkout() {
  const userProgressCtx = useContext(UserProgressContext);
  const cartCtx = useContext(CartContext);
  const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
    return (totalPrice += item.quantity * item.price);
  }, 0);

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  // handling form submission and validation
  function handleSubmit(event) {
    event.preventDefault();
    console.log("Submit button clicked");

    // form validation logic using built-in feature FormData object
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());
    // this will return the object that contains the data in the form of key value pairs {email : abc@xyz.com}

    // ... now send the order history to the backend using the post request
    fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order: {
          items: cartCtx.items, // stores which items are ordered
          customer: customerData // stores the info about the user
        }
      })
    });
    return;
  }

  return (
    <Modal
      className="checkout"
      open={userProgressCtx.progress === "checkout"}
      onClose={handleClose}
    >
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

        <Input label="Full Name" type="text" id="name" />
        <Input label="Email Adress" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        <p className="modal-actions">
          <Button textOnly type="button" onClick={handleClose}>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}
