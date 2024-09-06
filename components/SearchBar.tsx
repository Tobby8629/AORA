import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import icons from '@/constants/icons'
import { router, usePathname, useRouter } from 'expo-router'
interface SearchBarProps {
  searchText?: string;
}

const SearchBar = ({searchText}: SearchBarProps) => {
  const route = useRouter()
  const [value, setvalue] = useState(searchText || "")
  const getpath = usePathname()
  const handleclick = () => {
    if(value==="") {
      Alert.alert(" No value to query the database")
      return
    }

    else if(getpath.startsWith("/search")) {
       router.setParams({query: value})
    } 

    else {
      router.push(`/search/${value}`)
    }
  }
  return (
    <View className='h-[58px] my-5 items-center border-[1px] border-transparent flex-row justify-between bg-semi_black w-full rounded-md px-5'>
        <TextInput className='h-full text-whitish_gray text-xl w-11/12 font-pregular'
         placeholder='Search for a video topic'
         placeholderTextColor={"#CDCDE0"}
         value= {value}
         returnKeyType="go"
         onSubmitEditing={handleclick}
         onChangeText={(value)=>setvalue(value)}
        />
        <TouchableOpacity onPress={handleclick}>
          <Image source={icons.search}
            resizeMode='contain'
            className='w-[17px] h-[17px]' 
          />
        </TouchableOpacity>
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({})