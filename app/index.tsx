import { Image, StyleSheet, Platform, Text, View, ScrollView, SafeAreaView } from 'react-native';

// import { HelloWave } from '@/components/HelloWave';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
import { Link, useRouter } from 'expo-router';
// import { SafeAreaView } from 'react-native-safe-area-context';
import images from '../constants/images'
import Button from '@/components/Button';

export default function HomeScreen() {
  const navigate = useRouter()
  return (
    // <ParallaxScrollView
    //   headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
    //   headerImage={
    //     <Image
    //       source={require('@/assets/images/partial-react-logo.png')}
    //       style={styles.reactLogo}
    //     />
    //   }>
    //   <ThemedView style={styles.titleContainer}>
    //     <ThemedText type="title">Welcome!</ThemedText>
    //     <Text className='text-red-500'>testing tailwind</Text>
    //     <HelloWave />
    //   </ThemedView>
    //   <ThemedView style={styles.stepContainer}>
    //     <ThemedText type="subtitle">Step 1: Try it</ThemedText>
    //     <ThemedText>
    //       Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
    //       Press{' '}
    //       <ThemedText type="defaultSemiBold">
    //         {Platform.select({ ios: 'cmd + d', android: 'cmd + m' })}
    //       </ThemedText>{' '}
    //       to open developer tools.
    //     </ThemedText>
    //   </ThemedView>
    //   <ThemedView style={styles.stepContainer}>
    //     <ThemedText type="subtitle">Step 2: Explore</ThemedText>
    //     <ThemedText>
    //       Tap the Explore tab to learn more about what's included in this starter app.
    //     </ThemedText>
    //   </ThemedView>
    //   <ThemedView style={styles.stepContainer}>
    //     <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
    //     <ThemedText>
    //       When you're ready, run{' '}
    //       <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
    //       <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
    //       <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
    //       <ThemedText type="defaultSemiBold">app-example</ThemedText>.
    //     </ThemedText>
    //   </ThemedView>
     
    // </ParallaxScrollView>
    <SafeAreaView className=' bg-pry_black h-full'>
      <ScrollView>
        <View className=' items-center justify-center min-h-[90vh] px-5'>
          <Image 
            source={images.logo}
            className='h-[34px] w-[118px]'
            resizeMode= "contain"
          />
          <Image
            source={images.cards}
            className='w-[375px] h-[298px]'
            resizeMode= "contain"
        />

         <View className='my-7'>
          <Text className=' text-4xl font-pbold text-white text-center font-semibold'>
            Discover Endless Possibilities with {" "}
            <Text className=' text-gold text-4xl font-pbold font-semibold'>Aora</Text>
            <View className='relative'>
              <Image 
                source={images.path}
                className='w-[55px] h-[14px] absolute -bottom-2 right-0'
                resizeMode='contain'
              />
            </View>
          </Text>
          
         </View>

         <Text className='text-lg  font-pregular font-normal text-center text-white'>Where Creativity Meets Innovation: Embark on a Journey of Limitless Exploration with Aora</Text>
         
         <Button text='Continue with email' handlePress={()=> navigate.push("/(auth)/signIn")}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  
     
  );
}


