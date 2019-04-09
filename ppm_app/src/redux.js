//create store -- in redux library
import { createStore } from 'redux';
//import { stat } from 'fs';

//initial State
const initialState = {
  productList: [],
};

//action
export const updateState = (prodlist) => ({
  type: "UPDATE_STATE",
  payload: prodlist,
});

export const addNewProduct = (product) => ({
  type: "ADD_NEW_PRODUCT",
  payload: product,
});

export const deleteTileItem = (id) => ({
  type: "DELETE_PRODUCT",
  payload: id,
});

export const updateProductData = (id, data) => ({
  type: "UPDATE_PRODUCT_DATA",
  data: data,
  payload: id,
})

//reducer
//initial state and action to be passed as parameters to my reducer
export const reducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "UPDATE_STATE":
      return {
        ...state,
        productList: action.payload,
      };
    case "ADD_NEW_PRODUCT":
      return {
        ...state,
        productList: [...state.productList, action.payload],
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        productList: [...state.productList.slice(0, action.payload), ...state.productList.slice(action.payload + 1)],
      }
    case "UPDATE_PRODUCT_DATA":
      return {
        ...state,
        productList: [
          ...state.productList.slice(0, action.payload),
          state.productList[action.payload] = action.data,
          ...state.productList.slice(action.payload + 1)
        ],
      }

    default:
      return state;
  }

};

//export my store to the provider
// first parameter must be a reducer - a function
// switched the order around - threw an error saying reducer is not a function
export const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());