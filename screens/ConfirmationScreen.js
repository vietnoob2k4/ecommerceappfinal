import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Entypo, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { cleanCart } from '../redux/CartReducer';
import { UserType } from '../UserContext';

const ConfirmationScreen = () => {
    const steps = [
        { title: "Address", content: "Address Form" },
        { title: "Delivery", content: "Delivery Options" },
        { title: "Payment", content: "Payment Details" },
        { title: "Place Order", content: "Order Summary" },
    ];

    const [currentStep, setCurrentStep] = useState(0);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState("");
    const { userId } = useContext(UserType);
    const [option, setOption] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const cart = useSelector((state) => state.cart.cart);
    const total = cart?.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        try {
            const response = await axios.get(`http://192.168.1.184:8000/addresses/${userId}`);
            setAddresses(response.data.addresses);
        } catch (error) {
            console.log("Error fetching addresses:", error);
        }
    };

    const handlePlaceOrder = async () => {
        try {
            const orderData = {
                userId,
                cartItems: cart,
                totalPrice: total,
                shippingAddress: selectedAddress,
                paymentMethod: selectedOption,
            };
            const response = await axios.post("http://192.168.1.184:8000/orders", orderData);
            if (response.status === 200) {
                dispatch(cleanCart());
                navigation.navigate("Home");
                Alert.alert("Order placed successfully!");
            } else {
                console.log("Error creating order:", response.data);
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                    <Text style={styles.backButtonText}>Quay lại</Text>
                </Pressable>
            </View>
            <View style={styles.stepsContainer}>
                {steps.map((step, index) => (
                    <View key={index} style={styles.step}>
                        {index > 0 && (
                            <View style={[styles.stepLine, index <= currentStep && styles.stepLineActive]} />
                        )}
                        <View style={[styles.stepCircle, index <= currentStep && styles.stepCircleActive]}>
                            <Text style={styles.stepText}>
                                {index < currentStep ? '✔️' : index + 1}
                            </Text>
                        </View>
                        <Text style={styles.stepTitle}>{step.title}</Text>
                    </View>
                ))}
            </View>

            {currentStep === 0 && (
                <View style={styles.stepContent}>
                    <Text style={styles.sectionTitle}>Chọn địa chỉ giao hàng</Text>
                    {addresses.map((item) => (
                        <Pressable
                            key={item._id}
                            onPress={() => setSelectedAddress(item)}
                            style={[
                                styles.addressCard,
                                selectedAddress._id === item._id && styles.selectedAddressCard,
                            ]}
                        >
                            <FontAwesome5 name={selectedAddress._id === item._id ? "dot-circle" : "circle"} size={24} color="black" />
                            <View style={styles.addressDetails}>
                                <Text style={styles.addressName}>{item.name}</Text>
                                <Text>{item.houseNo}, {item.landmark}, {item.street}</Text>
                                <Text>HANOI, VIETNAM</Text>
                                <Text>Phone No: {item.mobileNo}</Text>
                                <Text>Pin Code: {item.postalCode}</Text>
                                <View style={styles.addressActions}>
                                    <Pressable style={styles.actionButton}><Text>Edit</Text></Pressable>
                                    <Pressable style={styles.actionButton}><Text>Remove</Text></Pressable>
                                    <Pressable style={styles.actionButton}><Text>Set as Default</Text></Pressable>
                                </View>
                                {selectedAddress._id === item._id && (
                                    <Pressable
                                        onPress={() => setCurrentStep(1)}
                                        style={styles.deliverButton}
                                    >
                                        <Text style={styles.deliverButtonText}>Deliver to this address</Text>
                                    </Pressable>
                                )}
                            </View>
                        </Pressable>
                    ))}
                </View>
            )}

            {currentStep === 1 && (
                <View style={styles.stepContent}>
                    <Text style={styles.sectionTitle}>Chọn phương thức giao hàng</Text>
                    <Pressable
                        style={[
                            styles.optionCard,
                            option && styles.selectedOptionCard,
                        ]}
                        onPress={() => setOption(true)}
                    >
                        <FontAwesome5 name={option ? "dot-circle" : "circle"} size={20} color={option ? "#008397" : "gray"} />
                        <Text style={styles.optionText}>Ngày mai trước 10 giờ tối - Viettelpost</Text>
                    </Pressable>
                    <Pressable onPress={() => setCurrentStep(2)} style={styles.continueButton}>
                        <Text style={styles.continueButtonText}>Tiếp tục</Text>
                    </Pressable>
                </View>
            )}

            {currentStep === 2 && (
                <View style={styles.stepContent}>
                    <Text style={styles.sectionTitle}>Chọn phương thức thanh toán</Text>
                    <Pressable
                        style={[
                            styles.optionCard,
                            selectedOption === "cash" && styles.selectedOptionCard,
                        ]}
                        onPress={() => setSelectedOption("cash")}
                    >
                        <FontAwesome5 name={selectedOption === "cash" ? "dot-circle" : "circle"} size={20} color={selectedOption === "cash" ? "#008397" : "gray"} />
                        <Text style={styles.optionText}>Thanh toán khi nhận hàng</Text>
                    </Pressable>
                    <Pressable
                        style={[
                            styles.optionCard,
                            selectedOption === "card" && styles.selectedOptionCard,
                        ]}
                        onPress={() => {
                            setSelectedOption("card");
                            Alert.alert("UPI/Debit card", "Pay Online", [
                                { text: "Cancel", onPress: () => console.log("Cancel pressed") },
                                { text: "OK", onPress: () => console.log("Pay Online") },
                            ]);
                        }}
                    >
                        <FontAwesome5 name={selectedOption === "card" ? "dot-circle" : "circle"} size={20} color={selectedOption === "card" ? "#008397" : "gray"} />
                        <Text style={styles.optionText}>UPI / Thẻ tín dụng hoặc thẻ ghi nợ</Text>
                    </Pressable>
                    <Pressable onPress={() => setCurrentStep(3)} style={styles.continueButton}>
                        <Text style={styles.continueButtonText}>Tiếp tục</Text>
                    </Pressable>
                </View>
            )}

            {currentStep === 3 && selectedOption === "cash" && (
                <View style={styles.stepContent}>
                    <Text style={styles.sectionTitle}>Đặt hàng ngay</Text>
                    <View style={styles.confirmationCard}>
                        <Text style={styles.confirmationText}>Xác nhận đơn hàng</Text>
                    </View>
                    <View style={styles.confirmationCard}>
                        <Text style={styles.confirmationText}>Giao đến {selectedAddress.name}</Text>
                    </View>
                    <View style={styles.orderTotal}>
                        <Text style={styles.orderTotalLabel}>Tổng cộng:</Text>
                        <Text style={styles.orderTotalValue}>{total} $</Text>
                    </View>
                    <Pressable onPress={handlePlaceOrder} style={styles.placeOrderButton}>
                        <Text style={styles.placeOrderButtonText}>Đặt hàng</Text>
                    </Pressable>
                </View>
            )}
        </ScrollView>
    );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({
  container: {
      marginTop: 55,
      paddingHorizontal: 20,
  },
  header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
  },
  backButton: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  backButtonText: {
      fontSize: 24,
      marginLeft: 5,
  },
  stepsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      justifyContent: 'space-between',
  },
  step: {
      flexDirection: 'column',
      alignItems: 'center',
      flex: 1,
  },
  stepLine: {
      height: 2,
      backgroundColor: '#e0e0e0',
      flex: 1,
  },
  stepLineActive: {
      backgroundColor: 'red',
  },
  stepCircle: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 5,
  },
  stepCircleActive: {
      backgroundColor: 'darkred',
  },
  stepText: {
      color: 'white',
      fontWeight: 'bold',
  },
  stepTitle: {
      fontSize: 12,
      textAlign: 'center',
  },
  stepContent: {
      marginBottom: 20,
  },
  sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: 'red',
  },
  addressCard: {
      flexDirection: 'row',
      padding: 10,
      borderWidth: 1,
      borderColor: '#e0e0e0',
      borderRadius: 8,
      marginBottom: 10,
      alignItems: 'center',
  },
  selectedAddressCard: {
      borderColor: 'red',
      backgroundColor: '#ffe6e6',
  },
  addressDetails: {
      marginLeft: 10,
      flex: 1,
  },
  addressName: {
      fontWeight: 'bold',
  },
  addressActions: {
      flexDirection: 'row',
      marginTop: 10,
  },
  actionButton: {
      marginRight: 10,
      padding: 5,
      borderRadius: 5,
      borderColor: 'red',
      borderWidth: 1,
  },
  deliverButton: {
      backgroundColor: 'red',
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
  },
  deliverButtonText: {
      color: 'white',
      textAlign: 'center',
  },
  optionCard: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderWidth: 1,
      borderColor: '#e0e0e0',
      borderRadius: 8,
      marginBottom: 10,
  },
  selectedOptionCard: {
      borderColor: 'red',
      backgroundColor: '#ffe6e6',
  },
  optionText: {
      marginLeft: 10,
      fontSize: 16,
  },
  continueButton: {
      backgroundColor: 'red',
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
  },
  continueButtonText: {
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold',
  },
  confirmationCard: {
      padding: 15,
      borderWidth: 1,
      borderColor: '#e0e0e0',
      borderRadius: 8,
      marginBottom: 10,
      alignItems: 'center',
  },
  confirmationText: {
      fontSize: 16,
  },
  orderTotal: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 20,
  },
  orderTotalLabel: {
      fontWeight: 'bold',
  },
  orderTotalValue: {
      fontWeight: 'bold',
      color: 'red',
      fontSize: 16,
  },
  placeOrderButton: {
      backgroundColor: 'red',
      padding: 15,
      borderRadius: 5,
  },
  placeOrderButtonText: {
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold',
  },
});
