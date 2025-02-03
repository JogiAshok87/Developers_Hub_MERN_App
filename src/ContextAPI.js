import React, { useState, createContext } from "react";

export const storeContext = createContext(); //assigning createContext() hook to a varible

//it is used in index.js , it is used to wrape the App.js file
const ContextProvider = (props) => {
  const [reviews, setReviews] = useState([]);
  const contextValue = { reviews, setReviews };

  return (
    <storeContext.Provider value={contextValue}>
      {props.children}
    </storeContext.Provider>
  );
};

export default ContextProvider;
