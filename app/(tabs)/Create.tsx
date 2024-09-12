import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, Alert, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import Input from '@/components/Input'
import icons from '@/constants/icons'
import * as ImagePicker from 'expo-image-picker'
import Button from '@/components/Button'
import { ResizeMode, Video } from 'expo-av'
import { useGlobalContext } from '@/context/GlobalProvider'
import { createPost } from '@/lib/AppWrite'
import { router } from 'expo-router'

interface imagepicker {
  assetId: "",
  base64: null,
  duration: null,
  exif: null,
  fileName: "",
  fileSize: number,
  height: number,
  type: "",
  uri: ""
  width: number
}

interface init {
  title:"", 
  video:imagepicker | null, 
  thumbnail: imagepicker | null, 
  AI_prompt: ""
}


const Create = () => {
  const {user} = useGlobalContext()
  const [form, setform] = useState<init>({title: "", video: null, thumbnail: null, AI_prompt: ""})
  const [isloading, setisloading] = useState(false)
  const handleChange = (value: string, id: string) => {
    setform({...form, [id]: value})
  }
  const handlepicker = async (docType: string, id: string) => {
     let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: docType === "image" ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if(!result.canceled){
      setform({...form,  [id]:result.assets[0]})
    }
  }

  const handleSubmit = async () =>  {
    const { title, video, thumbnail, AI_prompt } = form;
    if (!title || !video || !thumbnail || !AI_prompt) {
      Alert.alert("Empty input", "Please fill all inputs");
      return
    }
    setisloading(true)
    const postInfo = {...form, userid:user.$id}
    try {
     const post =await createPost(postInfo).then(() => {
      Alert.alert("Created!", "New Post Created");
      router.replace('/(tabs)/Home');
      setform({
        title: "", video: null, thumbnail: null, AI_prompt: ""
      })
    })
    }

    catch(err: any) {
    console.log(err.message)
    }

     finally {
      setisloading(false)
     }

  }

  return (
    <SafeAreaView className='bg-black h-full'>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className='min-h-[85vh] px-5 py-10'>
          <Text className=' text-white font-pmedium mb-8 text-3xl'>Upload Video</Text>
          <Input 
            placeholder='Give your Video a catchy title'
            data={form.title}
            title='Video Title'
            id = "title"
            handlechange={handleChange}
          />


          <View>
            <Text className='text-xl text-white mb-3 capitalize font-pregular'>Upload Video</Text>
            <TouchableOpacity className='w-[327px] h-[200px] bg-semi_black justify-center items-center' onPress={()=>handlepicker("video", "video")}>
              {form.video ? 
              <Video 
                source={{uri: form.video.uri}}
                resizeMode={ResizeMode.COVER}
                style={{height: "100%", width:"100%"}}
                shouldPlay
                useNativeControls={false}

              /> : 
              <Image source={icons.upload} className='w-12 h-12' resizeMode='contain' />
              }
            </TouchableOpacity>
          </View>

          <View className='my-5'>
            <Text className='text-xl text-white mb-3 capitalize font-pregular'>Thumbnail Image</Text>
            {form.thumbnail ? 
              <TouchableOpacity onPress={()=> handlepicker("image", "thumbnail")}>
                <Image source={{uri: form.thumbnail.uri}} className=' w-[327px] h-[250px]' resizeMode='cover'/>
              </TouchableOpacity>: 
              <View className='w-[327px] h-[58px] bg-semi_black justify-center items-center'>
                <TouchableOpacity onPress={()=>handlepicker("image", "thumbnail")} className=' flex-row items-center'>
                  <Image source={icons.upload} className='w-12 h-12' resizeMode='contain' />
                  <Text className='text-white'>Choose a file</Text>
                </TouchableOpacity>
              </View>
            }
          </View>
          
          <Input 
            title='AI Prompt'
            id="AI_prompt"
            data={form.AI_prompt}
            placeholder='The AI prompt of your video'
            handlechange={handleChange}
          />
          
          <Button 
            text='Submit & Publish'
            handlePress={handleSubmit}
            isloaded={isloading}
          />

        </View>
      </ScrollView>
      
    </SafeAreaView>
  )
}

export default Create

const styles = StyleSheet.create({})