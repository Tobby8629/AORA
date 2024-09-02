import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import images from '@/constants/images'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { Link, useRouter } from 'expo-router'
import icons from '@/constants/icons'
import Layout from '@/components/Onboarding/Layout'
import { Register } from '@/lib/AppWrite'

const signUp = () => {
  const route = useRouter()
  const [showpassword, setshowpassword] = useState(true)
  const [isloading, setisloading] = useState(false)
  const [userdata, setuserdata] = useState({email:"", username:"", password:""})
  const toggleshow = () => {
    setshowpassword(!showpassword)
  }
  const handlechange = (value: string, id: string) => {
    setuserdata({...userdata, [id]: value})
  } 

  const Onsubmit = async () => {
    setisloading(true)
    if(userdata.email==="" || userdata.username==="" || userdata.password ===""){
      Alert.alert("error", "please fill all input")
      setisloading(false)
      return
    }
    try{
      const submitdata = await Register(userdata.email, userdata.username, userdata.password)
      if(!submitdata) throw Error
      route.push("/(tabs)/Home")
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
     title='Sign Up'
     btnText='Sign Up'
     btnLink = {Onsubmit}
     bottomLink="/(auth)/signIn"
     bottomText= " Already have an account"
     btnLinkText='sign in'
     isloading={isloading}
   >
    <Input placeholder='your unique username' id="username"
     title='username' data={userdata.username} handlechange={handlechange} /> 

    <Input placeholder='Enter your email' id="email"  
    title='email' data={userdata.email}  keyboard_type="email-address" handlechange={handlechange} />

    <Input placeholder='password' id="password" 
    title='password' data={userdata.password} show={showpassword} toggleshow={toggleshow} 
    icon={showpassword ? icons.eyeHide : icons.eye} handlechange={handlechange}
     iconStyle='w-[20px] h-[20px]' />
    </Layout>
  )
}

export default signUp

const styles = StyleSheet.create({})