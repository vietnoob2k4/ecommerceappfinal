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
        axios.post("http://192.168.1.184:8000/login",user).then((response) => {
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
      
      <KeyboardAvoidingView>
      <View>
        

      </View>
        <View style={{marginTop:90}}>
            <Text style={{ fontSize: 25, fontWeight:"bold",marginTop:12}}>     Đăng nhập vào tài khoản</Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#D0D0D0",
              paddingVertical: 5,
              
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
              
              marginTop: 10,
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
            <Pressable style={{width: 200, backgroundColor:"red", marginLeft:'auto', marginRight:'auto', padding:15}}>
                <Text style={{textAlign:'center',color:"white",fontSize: 16, fontWeight:"bold"}} onPress={handleLogin}> ĐĂNG NHẬP</Text>
            </Pressable>
            <Pressable style={{marginTop:15}} onPress={() => navigation.navigate("Register")}>
                <Text style={{textAlign:'center'}}> bạn không có tài khoản ? đăng ký ngay</Text>
            </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})