import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux';
import { selectRestaurant } from '../features/RestaurantSlice';
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { useDispatch } from 'react-redux';
import { XCircleIcon } from 'react-native-heroicons/solid'
import { urlFor } from '../sanity';
import Currency from "react-currency-formatter";

const BasketScreen = () => {
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant)
    const items = useSelector(selectBasketItems);
    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([])
    const dispatch = useDispatch();
    const basketTotal = useSelector(selectBasketTotal)
    useEffect(() => {
        const groupedItems = items.reduce((results, item) => {
            (results[item.id] = results[item.id] || []).push(item);
            return results
        },{})
        setGroupedItemsInBasket(groupedItems);
    },[items])
    return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='flex-1 bg-gray-100'>
        <View className='p-5 border-b border-[#00CCBB] bg-white shadow-xs'>
          <View>
            <Text className='text-lg font-bold text-center'>Carrello</Text>
            <Text className='text-center text-gray-400'>
              {restaurant.title }
            </Text>
          </View>
          <TouchableOpacity
            onPress={navigation.goBack}
            className='rounded-full bg-gray-100 absolute top-3 right-5'
          >
            <XCircleIcon color='#00CCBB' height={50} width={50} />
          </TouchableOpacity>
        </View>
        <View className='flex-row items-center space-x-4 px-4 py-3 bg-white my-5'>
          <Image
            className='h-7 w-9 bg-gray-300 p-4 rounded-full'
            source={{
              uri: 'https://links.papareact.com/wru'
            }}
          />
          <Text className='flex-1'>Arriverà tra 15-20 min</Text>
          <TouchableOpacity>
            <Text className='text-[#00CCBB]'>Cambia</Text>
          </TouchableOpacity>
        </View>
        <ScrollView className='divide-y divide-gray-200'>
          {
            Object.entries(groupedItemsInBasket).map(([key, items]) => (
              <View key={key} className='flex-row items-center space-x-3 bg-white py-2 px-5'>
                  <Text className='text-[#00CCBB]'>{items.length} x</Text>
                  <Image 
                    source={{
                      uri: urlFor(items[0]?.image).url()
                    }}
                    className='h-12 w-12 rounded-full'
                  />
                  <Text className='flex-1'>{items[0]?.name}</Text>
                  <Text className='text-gray-600'>
                    <Currency quantity={items[0]?.price} currency='EUR' />
                  </Text>
                  <TouchableOpacity>
                    <Text
                      className='text-[#00CCBB] text-xs'
                      onPress={() => dispatch(removeFromBasket({ id: key }))}
                    >
                      Rimuovi
                    </Text>
                  </TouchableOpacity>
              </View>
            ) )
          }
        </ScrollView>
        <View className='p-5 bg-white mt-5 space-y-4'>
          <View className='flex-row justify-between'>
            <Text className='text-gray-400'>Subtotale</Text>
            <Text className='text-gray-400'>
              <Currency quantity={basketTotal} currency='EUR' />
            </Text>
          </View>
          <View className='flex-row justify-between'>
            <Text className='text-gray-400'>Trasporto</Text>
            <Text className='text-gray-400'>
              <Currency quantity={2.99} currency='EUR' />
            </Text>
          </View>
          <View className='flex-row justify-between'>
            <Text>Totale</Text>
            <Text className='font-extrabold'>
              <Currency quantity={basketTotal + 2.99} currency='EUR' />
            </Text>
          </View>
          <TouchableOpacity className='rounded-lg bg-[#00CCBB] p-4'>
            <Text className='text-center text-white text-lg font-bold'>Effettua l'ordine</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default BasketScreen