import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Pressable,
    Image,
    KeyboardAvoidingView,
    TextInput,
    Alert,
    ScrollView
  } from "react-native";
  import React, { useState } from "react";
  import { MaterialIcons } from "@expo/vector-icons";
  import { AntDesign } from "@expo/vector-icons";
  import { Ionicons } from "@expo/vector-icons";
  import { useNavigation } from "@react-navigation/native";
  import axios from "axios";

  const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const navigation = useNavigation();
  
  
  
      const handleRegister = () => {
          const user = {
            name: name,
            email: email,
            password: password,
          };
      
          // send a POST  request to the backend API to register the user
          axios
            .post("http://192.168.1.184:8000/register", user)
            .then((response) => {
              console.log(response);
              Alert.alert(
                "Registration successful",
                "You have been registered Successfully"
              );
              setName("");
              setEmail("");
              setPassword("");
            })
            .catch((error) => {
              Alert.alert(
                "Registration Error",
                "An error occurred while registering"
              );
              console.log("registration failed", error);
            });
        };
  
  
  
  
      
    return (
      <ScrollView>
  <SafeAreaView style={{flex:1, backgroundColor:"white", alignItems:"center"}}>
        
        <KeyboardAvoidingView>
          <View style={{alignItems: 'center',marginTop:200,}} >
              <Text style={{ fontSize: 25, fontWeight:"bold",marginTop:12}}>Đăng ký </Text>
          </View>
          <View style={{marginTop: 30}}>
          <View style={{flexDirection:'row', alignItems:'center', gap:5,backgroundColor:"#D0D0D0", paddingVertical: 5, marginTop: 30}}>
              <Ionicons name='person' size={24}  style={{ marginLeft: 8}} />
              <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: name ? 16 : 16,
                }}
                placeholder="enter your name"
              />
          </View>
          </View>
          <View style={{marginTop: 10}}>
          <View style={{flexDirection:'row', alignItems:'center', gap:5,backgroundColor:"#D0D0D0", paddingVertical: 5, marginTop: 10}}>
              <MaterialIcons name="email" size={24}  style={{ marginLeft: 8}} />
              <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: password ? 16 : 16,
                }}
                placeholder="enter your Email"
              />
          </View>
          </View>
          <View style={{marginTop: 10}}>
          <View style={{flexDirection:'row', alignItems:'center', gap:5,backgroundColor:"#D0D0D0", paddingVertical: 5, marginTop: 10}}>
              <AntDesign name="lock1" size={24}  style={{ marginLeft: 8}} />
              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: email ? 16 : 16,
                }}
                placeholder="enter your Password"
              />
          </View>
          </View>
          <View style={{marginTop:12, flexDirection: 'row', alignItems:'center', justifyContent:'space-between'}}>
              
  
          </View>
          <View style={{marginTop:70}}>
              <Pressable onPress={handleRegister} style={{width: 200, backgroundColor:"red", borderRadius: 6, marginLeft:'auto', marginRight:'auto', padding:15}}>
                  <Text style={{textAlign:'center',color:"white",fontSize: 16, fontWeight:"bold"}}> ĐĂNG KÝ</Text>
              </Pressable>
              <Pressable style={{marginTop:15}} onPress={() => navigation.navigate("Login")}>
                  <Text style={{textAlign:'center'}}> đã có tài khoản, đăng nhập ngay</Text>
              </Pressable>
          </View>
          <View style={{height: 100}}>
  
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
      </ScrollView>
      
    )
  }
export default RegisterScreen

const styles = StyleSheet.create({})