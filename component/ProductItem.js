import { StyleSheet, Text, View ,Pressable,Image} from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/CartReducer'
const ProductItem = ({item}) => {
const dispatch = useDispatch();
const [addedToCart,setAddedToCart] = useState(false);

  const addItemToCart = (item) => {
    setAddedToCart(true);
        dispatch(addToCart(item))
        setTimeout(() => {
            setAddedToCart(false)
        },
        60000)

  }
  return (
    <Pressable style={{marginHorizontal:200,marginVertical:20}}>
<Image
        style={{ width: 140, height: 140, resizeMode: "contain" }}
        source={{ uri: item?.image }}
      />
      <Text style={{width:150, marginTop:10}}>{item?.title}</Text>
      <View style={{marginTop:5, flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
        <Text style={{fontSize:15, flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>{item?.price} $</Text>
        <Text style={{color:'#FFC72C',fontWeight:'bold'}}>{item?.rating?.rate} rating</Text>

      </View>
      <Pressable onPress={() => addItemToCart(item)} style={{backgroundColor:"#FFC72C",padding:10,justifyContent:'center',alignItems:'center',marginHorizontal:10,marginTop:10, borderRadius:5}}>
      {addedToCart ? (
<View>
    <Text style={{color:'white'}}>Added to cart</Text>
</View>
):(
<Text style={{color:'white'}}> Add to cart</Text>
)}

      </Pressable>
          </Pressable>
  )
}

export default ProductItem

const styles = StyleSheet.create({})