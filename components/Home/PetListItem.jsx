import { View, Text, Image } from 'react-native'
import React from 'react'

export default function PetListItem({pet}) {

    
  return (
    <View>
     <Image source={{uri:pet?.imageUrl}} 
     style={{
        width:150,
        height:135
    
     }}
     />
    </View>
  )
}