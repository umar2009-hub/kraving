import React, { Children, createContext, useContext, useReducer } from 'react'

const CartstateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {

    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          qty: action.qty,
          size: action.size,
          price: action.price,
          img: action.img,
        },
      ];

    case "REMOVE":
      return state.filter((_, i) => i !== action.index);

    case "DROP":
      return [];

    default:
      return state;
  }
};


export const CartProvider = ({children}) => {

    const[state,dispatch] = useReducer(reducer,[]);
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartstateContext.Provider value={state}>
                {children}
            </CartstateContext.Provider>
        </CartDispatchContext.Provider>
    )
};

export const useCart = () => useContext(CartstateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);


