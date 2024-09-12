import React, { useEffect, useState } from 'react'

interface inter {
  fn: (val?: any) => Promise <any>;
}

const useCustomFetch = ({fn}: inter) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState("") 
    const getdata = async (val?: any) => {
      setloading(true)
      try{
        const response = await fn(val)
        if(response) setData(response)
      }
      catch(err: any) {
        seterror(err.message)
      }
      finally {
        setloading(false)
      }
    }
    useEffect(()=>{
      getdata()
    },[])
    
    const refresh = async( val?: any) => {
     await getdata(val)
    }
  return {
    data,
    loading,
    error,
    refresh
  }
  
}

export default useCustomFetch
