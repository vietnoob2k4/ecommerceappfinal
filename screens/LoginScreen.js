import { View, Text,StyleSheet, SafeAreaView ,Image, KeyboardAvoidingView, TextInput, Pressable, Alert} from 'react-native'

import React , { useEffect, useState }from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'

import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
const jwtDecode = require('jwt-decode');

import AsyncStorage from '@react-native-async-storage/async-storage'
const LoginScreen = () => {

    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigation = useNavigation();


    const handleLogin = () =>
         {
        const user = {
          email: email,
          password: password,
        }
        axios.post("http://172.17.161.213:8000/login",user).then((response) => {
          console.log(response);
          const token = response.data.token;
          AsyncStorage.setItem("authToken",token);
          navigation.replace("Main");
        }).catch((error) => {
          Alert.alert("login error");
          console.log(error);
        })
      }
  return (
    
    <SafeAreaView style={{flex:1, backgroundColor:"white", alignItems:"center"}}>
      <View>
        <Image style={{ width: 300, height: 50, marginTop: 100}} source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTime8WBi0okOevaVbgARHAEwTcxGkNTXifJw&s"}}/>

      </View>
      <KeyboardAvoidingView>
        <View >
            <Text style={{ fontSize: 17, fontWeight:"bold",marginTop:12}}>                Đăng nhập vào tài khoản</Text>
        </View>
        <View style={{ marginTop: 70 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#D0D0D0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <MaterialIcons
              style={{ marginLeft: 8 }}
              name="email"
              size={24}
              color="gray"
            />

            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: email ? 16 : 16,
              }}
              placeholder="enter your Email"
            />
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#D0D0D0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <AntDesign
              name="lock1"
              size={24}
              color="gray"
              style={{ marginLeft: 8 }}
            />

            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: password ? 16 : 16,
              }}
              placeholder="enter your Password"
            />
          </View>
        </View>

        <View style={{marginTop:12, flexDirection: 'row', alignItems:'center', justifyContent:'space-between'}}>
            

        </View>
        <View style={{marginTop:70}}>
            <Pressable style={{width: 200, backgroundColor:"red", borderRadius: 6, marginLeft:'auto', marginRight:'auto', padding:15}}>
                <Text style={{textAlign:'center',color:"white",fontSize: 16, fontWeight:"bold"}} onPress={handleLogin}> Dang nhap</Text>
            </Pressable>
            <Pressable style={{marginTop:15}} onPress={() => navigation.navigate("Register")}>
                <Text style={{textAlign:'center'}}> ban khong co tai khoan? dang ki ngay</Text>
            </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})