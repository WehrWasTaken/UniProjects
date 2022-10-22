import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'

const HomeScreen = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false,
      }) 
    }, [])

  return (
    
    <SafeAreaView>
      <Text className= 'bg-red-600'>HomeScreen</Text>
    </SafeAreaView>
  )
}

export default HomeScreen