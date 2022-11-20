import { View, Text, KeyboardAvoidingView, TextInput, Button, StyleSheet} from 'react-native'
import React, { useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config';
import { TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import  Ionicons from '@expo/vector-icons/Ionicons';







const LoginScreen = () => {
  
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation()

   useEffect(() => {
     auth.onAuthStateChanged(user => {
       if (user) {
         navigation.navigate("Home")
        }
     })
   }, []) 

    const regHandle = () => {
      navigation.navigate("Register")
    }

   

    const signUp = () => {
       createUserWithEmailAndPassword(auth, email, password)
       .then((userCredential) => {
        console.log("Usuário Adicionado com Sucesso.")

       })
       .catch((error) => {
        console.log("Ocorreu um erro ao cadastrar o usuário.")
        console.log("Error:" + error.mesage)
       })
    }

    const signIn = () => {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
       console.log("Usuário logado com Sucesso.")

      })
      .catch((error) => {
       console.log("Ocorreu um erro ao logar o usuário.")
       console.log("Error:" + error.mesage)
      })
   }
    
  return (

  
    <KeyboardAvoidingView style={styles.container}>
    
    <View style={styles.topPortion}> 
    <Image source={{ uri: "https://i.imgur.com/z390zwB.png" }} style={{ width: 203 , height: 116}} />
    </View>
        <View style={styles.inputContainer}>
          <TextInput
           style={styles.inputText}
           value={email}
           onChangeText={text => setEmail(text)}
           autoFocus
           placeholder="CPF ou Email" 
          />
        </View>

        <View style={styles.inputContainer}>
         <TextInput 
         style={styles.inputText}
         value={password}
         onChangeText={text => setPassword(text)}
         secureTextEntry 
         placeholder="**********" />  
        </View>

        
        <TouchableOpacity onPress={signIn} style={styles.logButton}>
          <TextInput style={styles.logText}>
            ENTRAR  
          </TextInput>
          <Ionicons style={styles.logIcon} name="chevron-forward-outline" size={18} color="#48D3CB"/>
        </TouchableOpacity>

        <TouchableOpacity onPress={regHandle} style={[styles.logButton, styles.regButton]}>
          <TextInput style={styles.regText}>
            CADASTRAR          
          </TextInput>
          <View style={styles.VerticalLine}></View>
          <Ionicons style={styles.textIcon} name="call-sharp" size={25} color="#48D3CB"/>
        </TouchableOpacity>

        {/* <Button style={styles.button} onPress={signUp} title="Entrar" /> */}
        {/*<Button onPress={signUp} title="Cadastrar" />*/}  

    </KeyboardAvoidingView>

    
       
       
  )
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
      backgroundColor: '#A6D93B',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    
    inputContainer: {
      width: '80%',
      
    },

    inputText: {
      backgroundColor: '#FFF',
      paddingHorizontal: 35,
      paddingVertical: 15,
      borderRadius: 23, 
      marginTop: 25,
    },

    logButton: {
      backgroundColor: '#FFF',
      borderRadius: 23,
      width: '72%',
      paddingVertical: 15,
      fontWeight: 'bold',
      alignItems: 'center',
      marginTop: 150,
      justifyContent: 'center',
      flexDirection: 'row',

    },

    regButton: {
      marginTop: 15,
      backgroundColor: '#7CA81F',
      marginBottom: 20,
      flexDirection: 'row',
    },

    logText: {
      color: '#7CA81F',
      fontSize: 15,
      fontWeight: 'bold',

    },

    regText: {
      color: '#FFF',
      fontSize: 15,
      fontWeight: 'bold',
      marginLeft: 90,
      
    },

    topPortion: {
      width: '100%',
      backgroundColor: '#FFF',
      alignItems: 'center',
      paddingTop: 500,
      marginBottom: 100,
      paddingBottom: 50,
    },

    textIcon: {
      marginLeft: 20,
    },

    logIcon: {
    },

    VerticalLine: {
      height: '120%',
      width: 2,
      backgroundColor: '#FFF',
      marginLeft: 40,
    }

  });
export default LoginScreen
