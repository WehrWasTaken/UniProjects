import { View, Text } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity, Image, StyleSheet, TextInput, FlatList} from 'react-native';
import { auth } from '../firebase-config';
import  Ionicons from '@expo/vector-icons/Ionicons';
import { db } from '../firebase-config';
import { collection, getDocs, query, where } from 'firebase/firestore';

const HomeScreen = () => {
    const navigation = useNavigation();
    const [name, setName] = React.useState([]);

    
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

    const getName = async () => {
    const q = query(collection(db, 'cadastro'), where('userID', "==", user.uid));
    const querySnapshot = await getDocs(q);
    const name = [];

    querySnapshot.forEach((doc) => {
    name.push(doc.data());

    //console.log(doc.id, " => ", doc.data().nomeUsuario);
    console.log(name);
    
    
  });
  setName(name); 
}

//getName();

}

return (

    <SafeAreaView>
      
        <View style={styles.topPortion}>
          <View style={styles.TopText}>
          <Text style={styles.welcomeText}>
          Bem vindo,
          </Text>
          <FlatList
          data={name}
          renderItem={({item}) => 
          <Text style={[styles.welcomeText, styles.welcomeTextHighlight]}>
          {item.nomeUsuario}
          </Text>}
          />
          </View>
        
        <Ionicons style={styles.topIcon} size={32} color='#48D3CB' name='notifications-outline' />
        <Image style={styles.userAvatar} source={{uri: "https://i.imgur.com/aNBeNyt.png"}} />
      </View>

      <View style={styles.levelPortion}>
        <View style={styles.levelText}>
          <Text style={styles.levelText}>Nível</Text>
          <Ionicons style={styles.levelIcon} size={20} color='#F3F81D' name='chevron-up-outline' />
          <Text style={styles.levelLongText}>
            VOCÊ RECICLOU{"\n"}
            <Text style={{fontWeight: '600'}}>2 VEZES</Text> NESSA{"\n"}
            SEMANA.
          </Text>
        </View>
        <Text style={styles.levelNumber}>23</Text>
      </View>

      <View style={styles.menuIcons}>
      <TouchableOpacity style={styles.circularMenu}>
        <Ionicons style={styles.circularIcons} size={25} color='#FFF' name='map-outline' />
        </TouchableOpacity>
      <TouchableOpacity style={styles.circularMenu}>
        <Ionicons style={styles.circularIcons} size={25} color='#FFF' name='time-outline' />
        </TouchableOpacity>
      <TouchableOpacity style={styles.circularMenu}>
        <Ionicons style={styles.circularIcons} size={25} color='#FFF' name='medal-outline' />
        </TouchableOpacity>
      <TouchableOpacity style={styles.circularMenu}>
        <Ionicons style={styles.circularIcons} size={25} color='#FFF' name='information-circle-outline' />
        </TouchableOpacity>
      <TouchableOpacity style={styles.circularMenu}>
        <Ionicons style={styles.circularIcons} size={20} color='#FFF' name='chevron-up-outline' />
        </TouchableOpacity>
      </View>
      
       
        
        
      
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

  welcomeText: {
    color: '#CA812C',
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 18,

  },

  welcomeTextHighlight: {
    fontWeight: '200',
    fontSize: 30,
    marginTop: -5,
    marginLeft: -2,

  },

  topPortion: {
    marginTop: 20,
    marginHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 50,

  },

  topIcon: {
    marginTop: 12,
    marginLeft: 25,

  },

  levelPortion: {
    backgroundColor: '#7CA81F',
    justifyContent: 'center',
    height: 160,
    width: "94%",
    marginTop: 40,
    marginLeft: 10,
    borderBottomRightRadius: 23,
    borderTopRightRadius: 23,

  },

  levelPortionMask: {
    width: 20,
    height: 190,
    marginTop: -10,
    backgroundColor: '#FFF',
    marginLeft: 10,

  },

  levelText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#F3F81D',
    fontSize: 25,
    marginTop: 3,
    marginLeft: 25,
  },

  levelNumber: {
    fontSize: 60,
    fontWeight: '200',
    color: '#FFF',
    marginLeft: 47,
    marginTop: -60,

  },

  levelIcon: {
    marginTop: 15,
    marginRight: 65,

  },

  levelLongText: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: '200',
    fontSize: 18,
    marginRight: 50,
    marginTop: 15,
  
  },

  circularMenu: {
    width: 60,
    height: 60,
    backgroundColor: '#7CA81F',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',

  },

  menuIcons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,

  },

})

export default HomeScreen
