import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/Recipes/homepage";
import OneRecipe from "./components/Recipes/oneRecipe";
import OneIngredient from "./components/Ingredients/one_ingredient";
import OneCategory from "./components/Categories/category_recipes";
import Footer from "./components/Footer";
import SplashPage from "./components/SplashPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          {/* <Route exact path="/login" >
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route> */}
          <Route exact path={"/recipes/:id"}>
            <OneRecipe />
          </Route>
          <Route exact path={"/ingredients/:id"}>
            <OneIngredient />
          </Route>
          <Route exact path={"/categories/:id"}>
            <OneCategory />
          </Route>
          <Route exact path={"/"}>
            <HomePage />
          </Route>
          <Route exact path={["/", "/login"]}>
            <SplashPage />
          </Route>
        </Switch>
      )}
      <Footer isLoaded={isLoaded} />
    </>
  );
}

export default App;
