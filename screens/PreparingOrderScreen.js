import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';

const PreparingOrderScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Delivery')
        }, 4000)
    },[])
  return (
    <SafeAreaView className='bg-[#00CCBB] flex-1 justify-center items-center'>
      <Animatable.Image 
        source={{uri: 'https://media.giphy.com/media/dAzkOoCgoFHtCAdFhe/giphy.gif'}}
        animation='slideInUp'
        iterationCount={1}
        direction="alternate"
        className='h-96 w-96'
      />
      <Animatable.Text
        animation='slideInUp'
        iterationCount={2}
        className='text-lg my-10 text-white font-bold text-center'
      >
        Stiamo inviando il tuo ordine al Ristorante, attendi qualche secondo.
      </Animatable.Text>
        <Progress.Circle size={60} indeterminate={true} color='white' />
    </SafeAreaView>
  )
}

export default PreparingOrderScreen