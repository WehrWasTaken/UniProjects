import { View, Text, KeyboardAvoidingView, TextInput, Button} from 'react-native'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config';





const LoginScreen = () => {
  
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
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
    
  return (
    <View>
        <View>
         <Text className="font-bold text-xl text-gray-800">Usuário</Text> 
          <TextInput 
           value={email}
           onChangeText={text => setEmail(text)}
           autoFocus
           placeholder="CPF ou Email" 
          />
        </View>

        <View>
         <Text className="font-bold text-xl text-gray-800">Senha</Text> 
         <TextInput 
         className="" 
         value={password}
         onChangeText={text => setPassword(text)}
         secureTextEntry 
         placeholder="**********" />
        </View>

        <Button onPress={signUp} class="bg-red-700" title="Login" /> 
    </View>
       
       
  )
}
export default LoginScreen
