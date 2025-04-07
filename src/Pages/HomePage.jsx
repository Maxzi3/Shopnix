import React from "react";
import Navbar from "../UI/Navbar";
import ProductCard from "../features/Product/ProductCard";
import SignupForm from "../features/Authentication/SignupForm";
import LoginForm from "../features/Authentication/LoginForm";
import UpdatePasswordForm from "../features/Authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/Authentication/UpdateUserDataForm";
import Products from "../features/Product/Products";

const HomePage = () => {
  // const product = {
  //   name: "Curved Gaming Monitor",
  //   description:
  //     "32-inch curved monitor with 165Hz refresh rate and 1ms response time.",
  //   price: 500,
  //   priceDiscount: 75,
  //   category: "Monitors",
  //   stockNo: 10,
  //   imageUrl: "https://example.com/products/curved-monitor.jpg",
  //   ratingsAverage: 2,
  //   ratingsQuantity: 140,
  // };
  // return <Products />
 return <LoginForm />;
};

export default HomePage;
