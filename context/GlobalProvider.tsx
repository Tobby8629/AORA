import { getCurrentUser } from '@/lib/AppWrite';
import React, { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react'
import { useFocusEffect } from 'expo-router'

const globalContext = createContext<any>(null);

export const useGlobalContext = () => useContext(globalContext) 

interface  global {
  children: ReactNode
}


const GlobalProvider = ({children}: global) => {
const [user, setuser] = useState({})
const [loading, setloading] = useState(false)
const [islogged, setislogged] = useState(false)

const cont = async () => {
  setloading(true);
  try {
    const currentUser = await getCurrentUser();
    setuser(currentUser);
    setislogged(true);
    
  } catch (err: any) {
    // console.error("Error fetching current user:", err.message || "No current user");
  } finally {
    setloading(false);
  }
};

useFocusEffect(useCallback(()=>{
   cont()
},[]))

  return (
   <globalContext.Provider value={{
      user,
      setuser,
      loading,
      setloading,
      islogged,
      setislogged,
      cont
   }}>
     {children}
   </globalContext.Provider>
  )
}

export default GlobalProvider

