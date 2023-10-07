import { Alert, Pressable, SafeAreaView, StyleSheet, Text, View, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location'
import { MaterialIcons } from '@expo/vector-icons';
import Carousel from '../components/Carousel';
import Services from '../components/Services';
import DressItem from '../components/DressItem';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../ProductReducer';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {

    const navigation = useNavigation()

    const cart = useSelector((state) => state.cart.cart)
    const total = cart.map((item) => item.quantity * item.price).reduce((curr, prev) => curr + prev, 0)
    const [displayCurrentAddress, setDisplayCurrentAddress] = useState('Loading location')
    const [locationServiceEnabled, setLocationServiceEnabled] = useState(false)

    useEffect(() => {
        checkIfLocationEnabled();
        getCurentLocation();
    }, []);

    const checkIfLocationEnabled = async () => {
        let enabled = await Location.hasServicesEnabledAsync;
        if (!enabled) {
            Alert.alert("Location services not enabled", "Please enable location services",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log('Cancel Pressed')
                    },
                    {
                        text: "OK",
                        onPress: () => console.log('OK Pressed')
                    },
                ],
                { cancelable: false }
            )
        } else {
            setLocationServiceEnabled(enabled)
        }
    }

    const getCurentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permission Denied", "Allow app to use loaction services",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log('Cancel Pressed')
                    },
                    {
                        text: "OK",
                        onPress: () => console.log('OK Pressed')
                    },
                ],
                { cancelable: false }
            )
        }

        const { coords } = await Location.getCurrentPositionAsync();
        if (coords) {
            const { latitude, longitude } = coords;
            let response = await Location.reverseGeocodeAsync({
                latitude, longitude
            });
            for (let item of response) {
                let address = `${item.name} ${item.city} ${item.postalCode}`
                setDisplayCurrentAddress(address)
            }
        }

    }

    const product = useSelector((state) => state.product.product);
    const dispatch = useDispatch()
    useEffect(() => {
        if (product.length > 0) return;
        const fetchProducts = () => {
            services.map((service) => dispatch(getProducts(service)))
        };
        fetchProducts();
    }, [])
    const services = [
        {
            id: "0",
            image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
            name: "shirt",
            quantity: 0,
            price: 10,
        },
        {
            id: "11",
            image: "https://cdn-icons-png.flaticon.com/128/892/892458.png",
            name: "T-shirt",
            quantity: 0,
            price: 10,
        },
        {
            id: "12",
            image: "https://cdn-icons-png.flaticon.com/128/9609/9609161.png",
            name: "dresses",
            quantity: 0,
            price: 10,
        },
        {
            id: "13",
            image: "https://cdn-icons-png.flaticon.com/128/599/599388.png",
            name: "jeans",
            quantity: 0,
            price: 10,
        },
        {
            id: "14",
            image: "https://cdn-icons-png.flaticon.com/128/9431/9431166.png",
            name: "Sweater",
            quantity: 0,
            price: 10,
        },
        {
            id: "15",
            image: "https://cdn-icons-png.flaticon.com/128/3345/3345397.png",
            name: "shorts",
            quantity: 0,
            price: 10,
        },
        {
            id: "16",
            image: "https://cdn-icons-png.flaticon.com/128/293/293241.png",
            name: "Sleeveless",
            quantity: 0,
            price: 10,
        },
    ];

    return (
        <>
            <ScrollView style={{ marginTop: 50, backgroundColor: '#F0F0F0', flex: 1 }}>
                {/* Location and Profile */}
                <View style={{ flexDirection: 'row', alignItems: "center", padding: 10 }}>
                    <MaterialIcons name="location-on" size={24} color="#f65c63" />
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: '600' }}>Home</Text>
                        <Text>{displayCurrentAddress}</Text>
                    </View>

                    <Pressable style={{ marginLeft: "auto", marginRight: 7 }}>
                        <Image
                            style={{ width: 40, height: 40, borderRadius: 20 }}
                            source={{ uri: `https://lh3.google.com/u/0/ogw/AOLn63Hxg7E_rFO4Kxq4C7rWK12GTBJQIltfhrjcCE9w=s32-c-mo` }} />
                    </Pressable>
                </View>

                {/* Search bar */}
                <View style={{ flexDirection: 'row', alignItems: "center", padding: 10, borderWidth: 0.8, margin: 10, justifyContent: "space-between", alignItems: 'center', borderColor: '#c0c0c0c', borderRadius: 7 }}>
                    <TextInput placeholder='Search for item ot more' />
                    <MaterialIcons name="search" size={24} color="#f65c63" />
                </View>

                {/* Image carousel */}
                <Carousel />

                {/* Services Component */}
                <Services />

                {/* Render all products */}
                {product.map((item, index) => (
                    <DressItem item={item} key={index} />
                ))}
            </ScrollView>

            {total === 0 ? (null) : (
                <Pressable style={{ backgroundColor: "#088F8F", padding: 10, marginBottom: 30, margin: 15, borderRadius: 7, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={{fontSize:17,fontWeight:"600",color:'white'}}>{cart.length} items | $ {total}</Text>
                        <Text style={{fontSize:14,fontWeight:"400",color:'white',marginVertical:6}}>extra charges might apply</Text>
                    </View>
                    <Pressable onPress={() => navigation.navigate("PickUp")}>
                        <Text style={{fontSize:17,fontWeight:"600",color:'white'}}>Proceed to pickup</Text>
                    </Pressable>
                </Pressable>
            )}

        </>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})