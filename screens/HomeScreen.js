import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import { auth } from '../firebase-config';
import  Ionicons from '@expo/vector-icons/Ionicons';

const HomeScreen = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false,
      }) 
    }, [])
    

    const signOut = () => {
      auth.signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
    }

    const user = auth.currentUser;

if (user !== null) {
  user.providerData.forEach((profile) => {
    console.log("Sign-in provider: " + profile.providerId);
    console.log("  Provider-specific UID: " + profile.uid);
    console.log("  Name: " + profile.displayName);
    console.log("  Email: " + profile.email);
    console.log("  Photo URL: " + profile.photoURL);
    const uid = user.uid;
    console.log(uid);
  });
}


  return (
    
    <SafeAreaView>
      <TouchableOpacity  onPress={signOut} style={[styles.logButton, styles.regButton]}>
          <TextInput style={styles.regText}>
            LOGOUT
          </TextInput>
        </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

  logButton: {
    backgroundColor: '#FFF',
    borderRadius: 23,
    width: '72%',
    paddingVertical: 15,
    fontWeight: 'bold',
    alignItems: 'center',
    marginTop: 100,

  },
})

export default HomeScreen