import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, onE } from 'react'
import { auth } from '../firebase-config';
import { createUserWithEmailAndPassword} from 'firebase/auth';
import { db } from '../firebase-config';
import { useNavigation } from '@react-navigation/native';
import  Ionicons from '@expo/vector-icons/Ionicons';
import { setDoc, doc } from 'firebase/firestore';

const Register = () => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [cpf, setCPF] = useState('')
    const [adress, setAdress] = useState('')
    const [cep, setCep] = useState('')
    const navigation = useNavigation()
    

    
    const signUp = () => {
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setDoc(doc(db, 'cadastro', userCredential.user.uid), {
          nomeUsuario: name,
          cpfUsuario: cpf,
          endereco: adress,
          cepUsuario: cep,
        }); 
        console.log("Usuário Adicionado com Sucesso.");   
      
      })
      
      
      .catch((error) => {
       console.log("Ocorreu um erro ao cadastrar o usuário.")
       console.log("Error:" + error.mesage)
      })
   }

   

    
  return (
      
    
    <KeyboardAvoidingView style={styles.container}>
    
    <View style={styles.topPortion}> 
    <Ionicons style={styles.logIcon} name="chevron-back-outline" size={35} color="#48D3CB"/>
    <Text style={styles.topText}>Cadastro</Text>
    </View>
    

        <View style={styles.inputContainer}>
          <TextInput
           style={styles.inputText}
           value={email}
           onChangeText={text => setEmail(text)}
           autoFocus
           placeholder="Endereço de email" 
          />
        </View>


        <View style={styles.inputContainer}>
         <TextInput 
         style={styles.inputText}
         value={password}
         onChangeText={text => setPassword(text)}
         secureTextEntry 
         placeholder="Senha" />  
        </View>

        <View style={styles.inputContainer}>
          <TextInput
           style={styles.inputText}
           value={name}
           onChangeText={text => setName(text)}
           autoFocus
           placeholder="Nome Completo" 
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
           style={styles.inputText}
           value={cpf}
           onChangeText={text => setCPF(text)}
           autoFocus
           placeholder="CPF" 
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
           style={styles.inputText}
           value={adress}
           onChangeText={text => setAdress(text)}
           autoFocus
           placeholder="Endereço" 
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
           style={styles.inputText}
           value={cep}
           onChangeText={text => setCep(text)}
           autoFocus
           placeholder="CEP"
           onSubmitEditing
          />
        </View>

        

        <TouchableOpacity onPress={signUp} style={[styles.logButton, styles.regButton]}>
          <TextInput style={styles.regText}>
            CADASTRAR          
          </TextInput>
        </TouchableOpacity>

        {/* <Button style={styles.button} onPress={signUp} title="Entrar" /> */}
        {/*<Button onPress={signUp} title="Cadastrar" />*/}  

    </KeyboardAvoidingView>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
  flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    paddingTop: 90,
  },
  
  inputContainer: {
    width: '80%',
    
  },

  inputText: {
    backgroundColor: '#FFF',
    paddingHorizontal: 30,
    paddingVertical: 14,
    marginTop: 25,
    borderBottomColor: '#A6D93B',
    borderBottomWidth: 2,
    
  },

  logButton: {
    backgroundColor: '#FFF',
    borderRadius: 23,
    width: '72%',
    paddingVertical: 15,
    fontWeight: 'bold',
    marginTop: 0,
    alignItems: 'center',

  },

  regButton: {
    marginTop: 40,
    backgroundColor: '#7CA81F',
    marginBottom: 20,
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
   
  },

  topPortion: {
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  topText: {
    fontSize: 30,
    color: '#CA812C',
    fontStyle: 'italic',
    fontWeight: 'bold',
    marginLeft: 30,
    marginRight: 30,
  
  },

  textIcon: {
    marginLeft: 20,
  },


});

