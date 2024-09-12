import { View, Text, SafeAreaView, ScrollView, Image, Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Input from '@/components/Input'
import icons from '@/constants/icons'
import { getCurrentUser, Login, Logout, Register } from '@/lib/AppWrite'
import { Link, useRouter } from 'expo-router'
import Layout from '@/components/Onboarding/Layout'
import { useGlobalContext } from '@/context/GlobalProvider'

const signIn = () => {
  const route = useRouter()
  const [userdata, setuserdata] = useState({email:"", password:""})
  const [isloading, setisloading] = useState(false)
  const [showpassword, setshowpassword] = useState(true)
  const {user,cont} = useGlobalContext()
  
  const toggleshow = () => {
    setshowpassword(!showpassword)
  } 

  const handlechange = (value: string, id: string) => {
    setuserdata({...userdata, [id]: value})
  } 
  
  const Onsubmit = async () => {
    setisloading(true)
    if(userdata.email==="" || userdata.password===""){
      Alert.alert("error", "please fill all input")
      setisloading(false)
      return
    }
    try{
      const submitdata = await Login(userdata.email, userdata.password).then(()=>{
        cont()
        route.replace("/(tabs)/Home")
      })
     
    }
    catch(err:any){
      Alert.alert(err.message)
    }
    finally {
      setisloading(false)
    } 
    
  }

  return (
    <Layout
     title='Sign In'
     btnText='Sign In'
     btnLink={Onsubmit}
     bottomLink="/(auth)/signUp"
     bottomText= " Don't Have an account"
     btnLinkText='sign up'
     isloading = {isloading}
    >
      <Input placeholder='your unique email' id='email'
      title='email' handlechange={handlechange} data={userdata.email}/> 
      <Input placeholder='password'
        data={userdata.password}
        title= "password" 
        id="password"
        icon={showpassword ? icons.eyeHide : icons.eye} 
        iconStyle='w-[20px] h-[20px]'
        toggleshow={toggleshow}
        handlechange={handlechange}
        show = {showpassword}
      />
      <TouchableOpacity onPress={getCurrentUser} className=' items-end'>
        <Text className='text-white font-plight font-normal'>Forget password</Text>
      </TouchableOpacity>
    </Layout>
  )
}

export default signIn