'use client'
import React, { createContext } from 'react'

export const MyContext = createContext();
// Donnée d'un utilisateur au dashboard
const MyContextUser = ({ children, userData }) => {

    return (
        <MyContext.Provider value={{ userData }}>
            {children}
        </MyContext.Provider>
    );
}

export default MyContextUser