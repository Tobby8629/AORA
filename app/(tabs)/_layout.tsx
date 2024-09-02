// import { Tabs } from 'expo-router';
// import React from 'react';

// import { TabBarIcon } from '@/components/navigation/TabBarIcon';
// import { useColorScheme } from '@/hooks/useColorScheme';

// export default function TabLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: false,
//       }}>
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: 'Home',
//           tabBarIcon: ({ color, focused }) => (
//             <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="explore"
//         options={{
//           title: 'Explore',
//           tabBarIcon: ({ color, focused }) => (
//             <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }

import React from 'react'
import { Tabs } from 'expo-router'
import {Tab_screen } from '../../constants/Screen'
import TabIcon from '@/components/TabIcon'
import { StatusBar } from 'expo-status-bar'


const _layout = () => {
  return (
    <>
      <Tabs screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#FF8C00",
        tabBarStyle: {
          backgroundColor: "#232533",
          height: 84,
          alignItems: 'center',
          justifyContent: "center",
          paddingBottom:0,
          paddingTop: 0,
        }
      }}>
      { Tab_screen.map((e)=>(
        <Tabs.Screen name={e.name} key={e.id} options={{
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <TabIcon src={e.icon} text={e.name} color={color} focused={focused}/>
          ),
        }} />
      ))}
        
      </Tabs>
      <StatusBar style='light'/>
    </>
  )
}


export default _layout


