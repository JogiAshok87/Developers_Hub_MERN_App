import React,{useState,createContext} from "react";

export const storeContext = createContext() //assigning createContext() hook to a varible

const ContextProvider = (props) =>{
    const [reviews,setReviews] = useState([])
    const contextValue ={reviews,setReviews}
    
    return(
        <storeContext.Provider value={contextValue}>
            {props.children}
        </storeContext.Provider>

    )

}

export default ContextProvider