import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import icons from '@/constants/icons'
import { usePathname } from 'expo-router';

interface SearchBarProps {
  searchText?: string;
  handleclick: (value: string) => void
}

const SearchBar = ({searchText, handleclick}: SearchBarProps) => {
  const [value, setvalue] = useState(searchText || "")
  const getpath = usePathname()
  const changeText = (value: string) => {
    if(getpath.includes("/saved")){
      handleclick(value)
    }
    setvalue(value)
  }
  
  return (
    <View className='h-[58px] my-5 items-center border-[1px] border-transparent flex-row justify-between bg-semi_black w-full rounded-md px-5'>
        <TextInput className='h-full text-whitish_gray text-xl w-11/12 font-pregular'
         placeholder='Search for a video topic'
         placeholderTextColor={"#CDCDE0"}
         value= {value}
         returnKeyType="go"
         onSubmitEditing={() => handleclick(value)}
         onChangeText={(value)=>changeText(value)}
        />
        <TouchableOpacity onPress={()=>handleclick(value)}>
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