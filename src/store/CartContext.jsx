import { createContext, useReducer } from "react";

export const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

// state gives us the previous snapshot and action to perform which type of action
function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    // ... update the state to add a meal item

    // check if the item to be added already exists then no need to add that again, just increse the count
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    ); // returns -1 if not found item

    const updatedItems = [...state.items];

    // so what we are doing here is simply find the index to check if the item to be added already exists or not
    // if not exist i.e(index is -1) so add the item and set the quantity to 1
    // else if exits simply update that particular index item and increse the quantity to +1
    // and overwrite this updated item to that index
    if (existingCartItemIndex > -1) {
      // if item exists in the cart we will increse the quantity simply
      // here we have spread the previous data of that particular existed item and increase the quantity simply
      const updatedItem = {
        ...state.items[existingCartItemIndex],
        quantity: state.items[existingCartItemIndex].quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      // add the item to the cart and set its quantity to 1
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    // get the previous data and then overwrite the updated items
    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    // ... remove an item from the state

    // here if the quantity of the item is > 1 then we will reduce the quantity by 1
    // else if quantity is 1 we will remove that item from cart
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    ); // returns -1 if not found item

    const existingCartItem = state.items[existingCartItemIndex];

    const updatedItems = [...state.items];
    if (existingCartItem.quantity === 1) {
      // remove the item from the cart
      updatedItems.splice(existingCartItemIndex, 1); // to remove the item at a particular index
    } else {
      // reduce the quantity by 1
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return { ...state, items: updatedItems };
  }

  // else return the unchanged state
  return state;
}

export default function CartContextProvider({ children }) {
  // {pointer to reducer fucntion , initial state}
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

    function addItem(item){
        dispatchCartAction({
            type: 'ADD_ITEM',
            item: item,
        });
    }

    function removeItem(id){
    dispatchCartAction({
        type: 'REMOVE_ITEM',
        id: id,
    })
    }

  const cartContext = {
    items: cart.items,
    addItem: addItem,
    removeItem: removeItem
  };

  console.log(cartContext);

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}
