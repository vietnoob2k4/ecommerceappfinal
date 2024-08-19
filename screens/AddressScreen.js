import { StyleSheet, Text, View ,ScrollView, TextInput, Pressable, Alert} from 'react-native'
import React ,{useContext, useEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode"
import { UserType } from '../UserContext';
import axios from 'axios';

const AddressScreen = () => {

    const navigation = useNavigation();
    const [name, setName] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [houseNo, setHouseNo] = useState("");
    const [street, setStreet] = useState("");
    const [landmark, setLandmark] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const {userId,setUserId}   = useContext(UserType)
    useEffect(() => {
      const fetchUser = async () => {
          const token = await AsyncStorage.getItem("authToken");
          if (token) {
              // Split the JWT token to extract payload
              const tokenPayload = token.split('.')[1];
              // Decode the base64 payload
              const decodedPayload = JSON.parse(atob(tokenPayload));
              // Extract userId from the payload
              const userId = decodedPayload.userId;
              setUserId(userId);
          }
      }

      fetchUser();
  }, []);
console.log(userId)

const handleAddAddress = () => {
    const address = {
        name,
        mobileNo,
        houseNo,
        street,
        landmark,
        postalCode
    }

    axios.post("http://172.17.161.213:8000/addresses",{userId,address}).then((response) => {
        Alert.alert("Success","Addresses added successfully");
        setName("");
        setMobileNo("");
        setHouseNo("");
        setStreet("");
        setLandmark("");
        setPostalCode("");

        setTimeout(() => {
          navigation.goBack();
        },500)
    }).catch((error) => {
        Alert.alert("Error","Failed to add address")
        console.log("error",error)
    })
}
    
  return (
    <ScrollView style={{marginTop:50}}>
      <View style={{height: 50, backgroundColor:'red'}} />
      <View style={{padding: 10}}>
        <Text style={{fontSize: 20, fontWeight:'bold'}}> thêm địa chỉ</Text>
        <TextInput placeholder='address' style={{padding: 10, borderColor:'black', borderWidth: 2, marginTop: 10}}/>
        <View>
            <Text style={{fontSize:15, fontWeight:'bold'}}> tên</Text>
            <TextInput value={name} onChangeText={(text) => setName(text)}  placeholder='name' style={{padding: 10, borderColor:'black', borderWidth: 2, marginTop: 10}}/>

        </View>
        <View>
        <Text style={{fontSize:15, fontWeight:'bold'}}> số điện thoại</Text>
        <TextInput  value ={ mobileNo } onChangeText={(text) => setMobileNo(text)} placeholder='+84' style={{padding: 10, borderColor:'black', borderWidth: 2, marginTop: 10}}/>

        </View>
        <View>
        <Text style={{fontSize:15, fontWeight:'bold'}}> địa chỉ chi tiết</Text>
        <TextInput value={houseNo} onChangeText={(text) => setHouseNo(text)} placeholder='no.' style={{padding: 10, borderColor:'black', borderWidth: 2, marginTop: 10}}/>

        </View>
        <View>
        <Text style={{fontSize:15, fontWeight:'bold'}}> đường</Text>
        <TextInput value={street} onChangeText={(text) => setStreet(text)} placeholder='street.' style={{padding: 10, borderColor:'black', borderWidth: 2, marginTop: 10}}/>

        </View>
        <View>
        <Text style={{fontSize:15, fontWeight:'bold'}}> điểm mốc</Text>
        <TextInput value={landmark} onChangeText={(text) => setLandmark(text)} placeholder='lmrk.' style={{padding: 10, borderColor:'black', borderWidth: 2, marginTop: 10}}/>

        </View>
        <View>
        <Text style={{fontSize:15, fontWeight:'bold'}}> postalcode</Text>
        <TextInput value={postalCode} onChangeText={(text) => setPostalCode(text)} placeholder='###########' style={{padding: 10, borderColor:'black', borderWidth: 2, marginTop: 10}}/>

        </View>

        <Pressable onPress={handleAddAddress}  style={{backgroundColor:"red", padding: 19, justifyContent:'center',alignItems:'center', marginTop: 20}}>
            <Text style={{color: 'white'}}> Save</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}

export default AddressScreen

const styles = StyleSheet.create({})