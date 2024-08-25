import { StyleSheet, Text, View, ScrollView, Pressable, ImageBackground, Dimensions, TextInput } from 'react-native';
import React, { useState } from "react";
import { AntDesign ,Ionicons} from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/CartReducer';

const ProductInfoScreens = () => {
  const route = useRoute();
  const { width } = Dimensions.get("window");
  const navigation = useNavigation();
  const [addedToCart, setAddedToCart] = useState(false)
  const height = (width * 100) / 100;
    const dispatch = useDispatch();
    const addItemToCart = (item) => {
        setAddedToCart(true);
        dispatch(addToCart(item))
        setTimeout(() => {
            setAddedToCart(false)
        },
        60000)
    }

    const cart = useSelector((state) => state.cart.cart);
console.log(cart)
  return (
    <ScrollView style={{ marginTop: 45, flex: 1, backgroundColor: "white" }}>
    
      <View style={{ padding: 10, backgroundColor: "red", flexDirection: 'row', alignItems: 'center' }}>
      <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Pressable style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 7, gap: 10, backgroundColor: "white", borderRadius: 3, height: 38, flex: 1 }}>
          <AntDesign style={{ paddingLeft: 10 }} name="search1" size={24} color="black" />
          <TextInput placeholder="tìm kiếm " />
        </Pressable>
      </View>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {route.params.carouselImages.map((item, index) => (
          <View key={index} style={{ width }}>
            <ImageBackground
              style={{ width, height, resizeMode: 'contain' }}
              source={{ uri: item }}
            >

            <View>
                <View>
                    <Text></Text>
                </View>
            </View>
            </ImageBackground>
          </View>
        ))}
      </ScrollView>
      <View style={{ padding: 10}}>
        <Text style={{fontSize:15, fontWeight:"500"}}>{route?.params?.title}</Text>
        <Text style={{fontSize:20}}>{route?.params?.price} $</Text>
        
      </View>
      <View>
        
      </View>
      <Pressable onPress={() => addItemToCart(route?.params?.item)} style={{backgroundColor:"red", padding:"10", borderRadius:20, justifyContent:'center',marginHorizontal:10,marginVertical: 10, height: 40, alignItems:'center'}}>
{addedToCart ? (
<View>
    <Text style={{color:'white'}}>Added to cart</Text>
</View>
):(
<Text style={{color:'white'}}> Add to cart</Text>
)}

      </Pressable>
      <Pressable style={{backgroundColor:"red", padding:"10", borderRadius:20, justifyContent:'center',marginHorizontal:10,marginVertical: 10, height: 40, alignItems:'center'}}>
<Text style={{color:'white'}}> buy now</Text>
      </Pressable>
    </ScrollView>
  );
};

export default ProductInfoScreens;

const styles = StyleSheet.create({});
