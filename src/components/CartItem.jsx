import { currencyFormatter } from "../util/formatting";
import { CartContext } from "../store/CartContext";
import { useContext } from "react";

export default function CartItem({item}) {
    // using the logic of adding and removing the item from the cart
    const {addItem, removeItem} = useContext(CartContext);
    
  return (
    <li className="cart-item">
      <p>
        {item.name} - {item.quantity} X {currencyFormatter.format(item.price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={() => addItem(item)}>+</button>
        <span>{item.quantity}</span>
        <button onClick={() => removeItem(item.id)}>-</button>
      </p>
    </li>
  );
}
