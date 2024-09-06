import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';

interface inter {
  className?: string 
}


const SolidRoundSpinner = ({className}: inter) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spinAnimation = () => {
      spinValue.setValue(0);
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => spinAnimation());
    };
    spinAnimation();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View className="flex justify-center items-center">
      <Animated.View
        style={{
          transform: [{ rotate: spin }],
        }}
        className={`w-10 h-10 border-t-2 border-b-2 border-l-2 border-black-500 rounded-full ${className}`}
      />
    </View>
  );
};

export default SolidRoundSpinner;
