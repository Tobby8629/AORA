import React, { useEffect, useRef, useState } from 'react';
import { Animated, Text, View, StyleSheet, Easing } from 'react-native';


interface BookmarkPopup {
  visible: boolean
  message: string
  setmessage: React.Dispatch<React.SetStateAction<string>>
  setvisible:React.Dispatch<React.SetStateAction<boolean>>
}

const BookmarkPopup = ({ visible, message, setvisible, setmessage }: BookmarkPopup) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.ease,
      }).start(() => {
        // Fade out after 2 seconds
        setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }, 4000);
      });
    }

    setvisible(false)
    // setmessage("")
  }, [visible]);

  return (
    <Animated.View className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-semi_black rounded-lg p-3 w-fit" style={[{ opacity: fadeAnim }]}>
      <Text className= 'text-whitish_gray text-sm font-plight'  style={styles.popupText}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  popupContainer: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 10,
  },
  popupText: {
    // color: '#fff',
    // fontSize: 16,
  },
});

export default BookmarkPopup;
