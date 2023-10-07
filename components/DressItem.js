import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, decrementQuantity } from '../CartReducer';
import { decrementQuantityProduct, incrementQuantity, incrementQuantityProduct } from '../ProductReducer';

const DressItem = ({ item }) => {
    const cart = useSelector((state) => state.cart.cart)
    const dispatch = useDispatch();
    const addItemToCart = () => {
        dispatch(addToCart(item)) // cart
        dispatch(incrementQuantityProduct(item)) // product
    }

    return (
        <View>
            <Pressable style={{ backgroundColor: "#F8F8F8", borderRadius: 8, padding: 10, flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', margin: 14 }}>
                <View>
                    <Image style={{ width: 70, height: 70 }} source={{ uri: item.image }} />
                </View>
                <View>
                    <Text style={{ fontSize: 17, fontWeight: '500', width: 83, marginBottom: 7 }}>{item.name}</Text>
                    <Text style={{ fontSize: 17, fontWeight: '500', width: 83, marginBottom: 7 }}>${item.price}</Text>
                </View>
                {cart.some((c) => c.id === item.id) ? (
                    <Pressable style={{ flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5 }}>

                        <Pressable onPress={() => {
                            // dispatch(decrementQuantity(item)); 
                            dispatch(decrementQuantityProduct(item))
                        }} style={{ width: 26, height: 26, borderRadius: 13, borderColor: '#BEBEBE', backgroundColor: "#E0E0E0", justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, color: '#088F8F', paddingHorizontal: 6, fontWeight: '600', textAlign: 'center' }}>-</Text>
                        </Pressable>
                        <Pressable>
                            <Text style={{ fontSize: 19, color: '#088F8F', paddingHorizontal: 6, fontWeight: '600' }}>{item.quantity}</Text>
                        </Pressable>
                        <Pressable onPress={() => {
                            // dispatch(incrementQuantity(item)); 
                            dispatch(incrementQuantityProduct(item))
                        }} style={{ width: 26, height: 26, borderRadius: 13, borderColor: '#BEBEBE', backgroundColor: "#E0E0E0", justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, color: '#088F8F', paddingHorizontal: 6, fontWeight: '600', textAlign: 'center' }}>+</Text>
                        </Pressable>

                    </Pressable>
                ) : (
                    <Pressable onPress={() => addItemToCart()} style={{ width: 80, borderRadius: 4 }}>
                        <Text style={{ fontSize: 17, fontWeight: 'bold', borderColor: 'grey', borderWidth: 0.8, marginVertical: 10, color: "#0888F8", textAlign: 'center', padding: 5 }}>Add</Text>
                    </Pressable>
                )

                }

            </Pressable>

        </View>
    )
}

export default DressItem

const styles = StyleSheet.create({})