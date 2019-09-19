import React from "react";
import { connect } from "react-redux";
import "./Burger.css";

import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = props => {
  let transofrmedIngredients = Object.keys(props.ings)
    .map(igKey => {
      return [...Array(props.ings[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  if (transofrmedIngredients.length === 0) {
    transofrmedIngredients = <p>Please start adding ingredients!</p>;
  }
  return (
    <div className="Burger">
      <BurgerIngredient type="bread-top" />
      {transofrmedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    ings: state.brg.ingredients
  };
};

export default connect(mapStateToProps)(burger);
