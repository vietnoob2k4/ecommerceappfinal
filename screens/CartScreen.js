import { StyleSheet, Text, View ,ScrollView,Pressable,Image} from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrementQuantity, incementQuantity, removeFromCart } from '../redux/CartReducer'
import { useNavigation } from '@react-navigation/native'

const CartScreen = () => {
    const cart = useSelector((state) => state.cart.cart)
    console.log(cart)
    const total = cart?.map((item) => item.price * item.quantity).reduce((curr,prev) => curr + prev,0);
    console.log(total)

    const navigation = useNavigation()

    const dispatch = useDispatch();

    const increaseQuantity = (item) => {
        dispatch(incementQuantity(item))
    }
    const decreaseQuantity = (item) => {
        dispatch(decrementQuantity(item))
    }
    const deleteItem = (item) => {
        dispatch(removeFromCart(item))

    }
  return (
    <ScrollView style={{marginTop: 55, flex: 1, backgroundColor: 'white'}}>
        <View style={{height: 60, alignItems:'center',justifyContent:'center', backgroundColor:'red', marginBottom: 40 }}>
            <Text style={{fontSize: 20, color:'white'}}>
                YOUR CART 
            </Text>
        </View>


        <View style={{marginHorizontal:10}}>
            {cart?.map((item, index) => (

<View style={{backgroundColor:'white', marginVertical:5, borderColor:'black', borderWidth:2,}} key={index}>

<Pressable style={{marginVertical: 10, flexDirection:'row',alignItems:'center'}}>
    <View >
        <Image style={{width: 100,height: 100,resizeMode:'contain',marginVertical:5}} source={{uri: item?.image}} />
    </View>
    <View>
        <Text style={{width: 160,marginTop:10}}>{item?.title}</Text>
        <Text style={{width: 160,marginTop:10, color:'red' }}>{item?.price} $     q:{item?.quantity} piece</Text>

    </View>
</Pressable>
<Pressable>
    <View style={{flexDirection:'row',alignItems:'center', paddingHorizontal:10,paddingVertical:5,borderRadius:7}}>
    
        <Pressable style={{backgroundColor: 'pink', padding: 7,marginRight: 10}} onPress={() => deleteItem(item)}>
            <Text> delete</Text>
        </Pressable>
        <Pressable style={{backgroundColor: 'yellow', padding: 7,marginRight: 10}} onPress={() => increaseQuantity(item)}>
            <Text> add 1 more</Text>
        </Pressable>
        {item?.quantity > 1? (
            <Pressable style={{backgroundColor: 'yellow', padding: 7}} onPress={() => decreaseQuantity(item)}>
            <Text> decrease 1</Text>
        </Pressable>
        ):(
            <Text>only 1</Text>
        )}
    </View>
</Pressable>

</View>


            ))}
        </View>
        <View style={{padding: 10, flexDirection:"row",alignItems:"center"}}>
            <Text style={{fontSize: 20, fontWeight: "400"}}> subtotal: </Text>
            <Text style = {{color: "red"}}> {total} </Text>
        </View>
        <Pressable style={{backgroundColor: "red" , padding: 10, borderRadius: 5, justifyContent:'center', alignItems:'center',marginHorizontal:10, marginTop: 10,}}>
            <Text style={{fontWeight:"400", color:"white"}} onPress={() => navigation.navigate('Confirm')}> PURCHASE all items  </Text>
        </Pressable>
        


    </ScrollView>
  )
}

export default CartScreen

const styles = StyleSheet.create({})