import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import axios from "axios";


export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) =>{
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

    const login = async(inputs) => {
        const res = await axios.post("https://social-media-backend-y14s.onrender.com/api/auth/login",inputs,{
            withCredentials: true
        });
        console.log("res data "+res.data);
        setCurrentUser(res.data);
        
    };
    
    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(currentUser));
    },[currentUser]
    );
    return(
        <AuthContext.Provider value={{currentUser, login  }}>
            {children}
        </AuthContext.Provider>
    );
};

