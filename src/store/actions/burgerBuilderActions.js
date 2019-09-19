import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = ingName => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingName
  };
};

export const removeIngredient = ingName => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: ingName
  };
};

export const mountIngredients = ingredients => {
  return {
    type: actionTypes.ASYNC_MOUNT_INGREDIENTS,
    ingredients: ingredients
  };
};

export const mountIngredietsFail = () => {
  return {
    type: actionTypes.MOUNT_INGREDIENTS_FAIL
  };
};

export const asyncMountIngredients = () => {
  return dispatch => {
    axios
      .get("https://react-my-burger-42f62.firebaseio.com/ingredients.json")
      .then(response => {
        dispatch(mountIngredients(response.data));
      })
      .catch(error => {
        dispatch(mountIngredietsFail());
      });
  };
};
