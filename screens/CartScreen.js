import { StyleSheet, Text, View, ScrollView, Pressable, Image, Alert } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrementQuantity, incementQuantity, removeFromCart } from '../redux/CartReducer';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
    const cart = useSelector((state) => state.cart.cart);
    const total = cart?.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const increaseQuantity = (item) => dispatch(incementQuantity(item));
    const decreaseQuantity = (item) => dispatch(decrementQuantity(item));

    const confirmDeleteItem = (item) => {
        Alert.alert(
            "Delete Item",
            "Are you sure you want to remove this item from your cart?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", onPress: () => dispatch(removeFromCart(item)), style: "destructive" }
            ]
        );
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Your Cart</Text>
            </View>

            <View style={styles.cartItemsContainer}>
                {cart?.map((item, index) => (
                    <View style={styles.cartItem} key={index}>
                        <View style={styles.itemDetails}>
                            <Image style={styles.itemImage} source={{ uri: item?.image }} />
                            <View style={styles.itemInfo}>
                                <Text style={styles.itemTitle}>{item?.title}</Text>
                                <Text style={styles.itemPrice}>{item?.price} $ x {item?.quantity} pcs</Text>
                            </View>
                        </View>
                        <View style={styles.itemActions}>
                            <Pressable style={styles.actionButton} onPress={() => confirmDeleteItem(item)}>
                                <Text style={styles.actionButtonText}>Delete</Text>
                            </Pressable>
                            <Pressable style={styles.actionButton} onPress={() => increaseQuantity(item)}>
                                <Text style={styles.actionButtonText}>Add 1 More</Text>
                            </Pressable>
                            {item?.quantity > 1 ? (
                                <Pressable style={styles.actionButton} onPress={() => decreaseQuantity(item)}>
                                    <Text style={styles.actionButtonText}>Decrease 1</Text>
                                </Pressable>
                            ) : (
                                <Text style={styles.singleItemText}>Only 1 Left</Text>
                            )}
                        </View>
                    </View>
                ))}
            </View>

            <View style={styles.summaryContainer}>
                <Text style={styles.summaryText}>Subtotal:</Text>
                <Text style={styles.totalAmount}>{total} $</Text>
            </View>

            <Pressable style={styles.purchaseButton} onPress={() => navigation.navigate('Confirm')}>
                <Text style={styles.purchaseButtonText}>Purchase All Items</Text>
            </Pressable>
        </ScrollView>
    );
};

export default CartScreen;

const styles = StyleSheet.create({
    container: {
        marginTop: 55,
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d32f2f',
        marginBottom: 40,
    },
    headerText: {
        fontSize: 22,
        color: 'white',
        fontWeight: 'bold',
    },
    cartItemsContainer: {
        marginHorizontal: 10,
    },
    cartItem: {
        backgroundColor: 'white',
        marginVertical: 5,
        padding: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
    },
    itemDetails: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginRight: 15,
    },
    itemInfo: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: '500',
    },
    itemPrice: {
        marginTop: 5,
        fontSize: 16,
        color: '#d32f2f',
    },
    itemActions: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between',
    },
    actionButton: {
        backgroundColor: '#ffcc00',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
    },
    actionButtonText: {
        fontSize: 14,
        fontWeight: '500',
    },
    singleItemText: {
        fontSize: 14,
        color: '#999',
    },
    summaryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginVertical: 20,
    },
    summaryText: {
        fontSize: 20,
        fontWeight: '500',
    },
    totalAmount: {
        fontSize: 20,
        color: '#d32f2f',
    },
    purchaseButton: {
        backgroundColor: '#d32f2f',
        paddingVertical: 15,
        borderRadius: 8,
        marginHorizontal: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    purchaseButtonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
});
