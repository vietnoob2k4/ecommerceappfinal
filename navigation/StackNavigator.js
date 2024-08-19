import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RegisterScreen from '../screens/RegisterScreen'
import LoginScreen from '../screens/LoginScreen'
import HomeScreen from '../screens/HomeScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import ProductInfoScreens from '../screens/ProductInfoScreens'
import AddAddressScreen from '../screens/AddAddressScreen'
import AddressScreen from '../screens/AddressScreen'
import CartScreen from '../screens/CartScreen'
import ProfileScreen from '../screens/ProfileScreen'
import ConfirmationScreen from '../screens/ConfirmationScreen'
import OrderScreen from '../screens/OrderScreen'
import MyOrders from '../screens/MyOrders'
const StackNavigator = () => {
    const Stack = createNativeStackNavigator()
    const Tab = createBottomTabNavigator()
    function BottomTabs() {
        return (
          <Tab.Navigator>
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                tabBarLabel: "Home",
                tabBarLabelStyle: { color: "black" },
                headerShown: false,
                tabBarIcon: ({ focused }) =>
                  focused ? (
                    <Entypo name="home" size={24} color="red" />
                  ) : (
                    <AntDesign name="home" size={24} color="black" />
                  ),
              }}
            />
    
            <Tab.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                tabBarLabel: "Profile",
                tabBarLabelStyle: { color: "black" },
                tabBarIcon: ({ focused }) =>
                  focused ? (
                    <Ionicons name="person" size={24} color="red" />
                  ) : (
                    <Ionicons name="person-outline" size={24} color="black" />
                  ),
              }}
            />
    
            <Tab.Screen
              name="Cart"
              component={CartScreen}
              options={{
                tabBarLabel: "Cart",
                tabBarLabelStyle: { color: "black" },
                headerShown: false,
                tabBarIcon: ({ focused }) =>
                  focused ? (
                    <AntDesign name="shoppingcart" size={24} color="red" />
                  ) : (
                    <AntDesign name="shoppingcart" size={24} color="black" />
                  ),
              }}
            />
          </Tab.Navigator>
        );
      }
    
  return (
   <NavigationContainer>
<Stack.Navigator>
    <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
    <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}}/>
    <Stack.Screen name="Main" component={BottomTabs} options={{headerShown:false}}/>
    <Stack.Screen name="Info" component={ProductInfoScreens} options={{headerShown:false}} />
    <Stack.Screen name="Address" component={AddAddressScreen} options={{headerShown:false}} />
    <Stack.Screen name="Add" component={AddressScreen} options={{headerShown:false}}/>
    <Stack.Screen name="Confirm" component={ConfirmationScreen} options={{headerShown:false}}/>
    <Stack.Screen name="Order" component={OrderScreen} options={{headerShown:false}}/>
    <Stack.Screen name="MyOrders" component={MyOrders} options={{headerShown:false}} />

</Stack.Navigator> 
   </NavigationContainer>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})