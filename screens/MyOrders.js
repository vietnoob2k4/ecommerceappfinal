import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useLayoutEffect, useEffect, useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MyOrders = () => {
  const { userId } = useContext(UserType);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: {
        backgroundColor: "red",
      },
    });
  }, [navigation]);

  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://172.17.161.213:8000/profile/${userId}`
        );
        const { user } = response.data;
        setUser(user);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const logout = () => {
    clearAuthToken();
  };

  const clearAuthToken = async () => {
    await AsyncStorage.removeItem("authToken");
    console.log("auth token cleared");
    navigation.replace("Login");
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://172.17.161.213:8000/orders/${userId}`
        );
        const orders = response.data.orders;
        setOrders(orders);
        setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Đơn hàng của bạn</Text>
      </View>

      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : orders.length > 0 ? (
        orders.map((order) => (
          <View style={styles.orderContainer} key={order._id}>
          <View>
          <Text style={styles.orderTitle}>Đơn hàng ID: {order._id}</Text>
          <Text style={styles.totalPrice}>Giá tổng: {order.totalPrice} VNĐ</Text> 
          <Text style={styles.orderDate}>Ngày đặt hàng: {order.createdAt}</Text>

          </View>
           

            {order.products.map((product) => (
              <View style={styles.orderContent} key={product._id}>
                <Image
                  source={{ uri: product.image }}
                  style={styles.productImage}
                />
                <View style={styles.orderDetails}>
                  <Text style={styles.productPrice}>Giá: {product.price}</Text>
                  <Text style={styles.addressTitle}>Địa chỉ:</Text>
                  <Text>Số nhà: {order.shippingAddress.houseNo}</Text>
                  <Text>Đường: {order.shippingAddress.street}</Text>
                  <Text>Mốc: {order.shippingAddress.landmark}</Text>
                  <Text>Postal Code: {order.shippingAddress.postalCode}</Text>
                  <Text>Số điện thoại: {order.shippingAddress.mobileNo}</Text>
                  <Text>Tên người nhận: {order.shippingAddress.name}</Text>
                </View>
              </View>
            ))}
          </View>
        ))
      ) : (
        <Text style={styles.noOrdersText}>No orders found</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    marginTop: 12,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
  },
  orderContainer: {
    marginTop: 20,
    marginHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d0d0d0",
    padding: 15,
    backgroundColor: 'white',
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  orderContent: {
    flexDirection: 'row', // Sắp xếp hình ảnh và thông tin theo hàng ngang
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginRight: 15, // Khoảng cách giữa hình ảnh và thông tin
  },
  orderDetails: {
    flex: 1,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  noOrdersText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
  totalPrice:{
    fontSize:20,
    color:'red'
  }
});

export default MyOrders;
