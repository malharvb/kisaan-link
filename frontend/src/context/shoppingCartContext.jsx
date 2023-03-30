import React, { createContext, useReducer, useEffect } from 'react';

export const CartContext = createContext();

export const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      localStorage.setItem('cart', JSON.stringify({
        cart: [action.payload],
      }))
      return {
        cart: [action.payload],
      };
    case 'CREATE_CART':
      localStorage.setItem('cart', JSON.stringify({
        cart: [...state.cart, action.payload],
      }))
      return {
        cart: [...state.cart, action.payload],
      };
    case 'DELETE_CART':
      return {
        cart: state.cart.filter((item) => item._id !== action.payload._id),
      };
    case 'SET_FROM_LOCAL':
      return {
        cart: action.payload
      }
    default:
      return state;
  }
};

export function CartContextProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { cart: null });

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart'));

    if (cart) {
      dispatch({ type: 'SET_FROM_LOCAL', payload: cart.cart });
    }
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}