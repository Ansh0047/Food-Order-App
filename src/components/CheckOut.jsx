import { useContext } from "react";
import Modal from "./UI/Modal";
import UserProgressContext from "../store/userProgressContext";
import { CartContext } from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import useHttp from "../hooks/useHttp";
import Error from "../components/Error";

const configObject = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const userProgressCtx = useContext(UserProgressContext);
  const cartCtx = useContext(CartContext);

  const { data, isLoading, error, sendRequest, clearData } = useHttp(
    "http://localhost:3000/orders",
    configObject
  );

  const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
    return (totalPrice += item.quantity * item.price);
  }, 0);

  // to close the checkout cart
  function handleClose() {
    userProgressCtx.hideCheckout();
  }
  // to clear the cart after the order
  function handleFinish(){
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  // handling form submission and validation
  function handleSubmit(event) {
    event.preventDefault();
    console.log("Submit button clicked");

    // form validation logic using built-in feature FormData object
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());
    // this will return the object that contains the data in the form of key value pairs {email : abc@xyz.com}

    // using the custom http request method to post the order data
    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items, // stores which items are ordered
          customer: customerData, // stores the info about the user
        },
      })
    );

    /*
    // above syntax is the altenate to this one using the custom hook 
    // ... now send the order history to the backend using the post request
    fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order: {
          items: cartCtx.items, // stores which items are ordered
          customer: customerData, // stores the info about the user
        },
      }),
    });
    */
  }

  // this is to improve the UI where if there is some slow internet then we can show them the data is loading
  let actions = (
    <>
      <Button textOnly type="button" onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isLoading) {
    actions = <span>Sending the data...</span>;
  }

  // to show the success message when we placed the order
  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleFinish}
      >
        <h2>Succes!</h2>
        <p>Your order has been placed successfully.</p>
        <p>
          We willget back to you with more details via email within next few
          minutes.
        </p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
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

        {error && <Error title="Failed to submit the order" message={error} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
