import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../constants/Colors'

export default function AboutPet({pet}) {
    const [readMore, setreadMore] = useState(true)
  return (
    <View style={{
        padding: 20,
    }}>
      <Text
      style={{
        fontFamily: 'outfit-medium',
        fontSize: 20,

      }}
      >{pet?.name}</Text>
      <Text
      style={{
        fontFamily: 'outfit',
        fontSize: 14
      }}
      numberOfLines={readMore ? 3 : 20}
      >{pet?.about} </Text>

      <Pressable
      onPress={() => setreadMore(!readMore)}
      
      >
      {readMore && <Text
      style={{
        fontFamily: 'outfit-medium',
        fontSize: 14,
        color:Colors.SECONDARY
      }}
      > Read More</Text>}
      
{!readMore && <Text
      style={{
        fontFamily: 'outfit-medium',
        fontSize: 14,
        color:Colors.SECONDARY
      }}
      > Show Less</Text>}
      </Pressable>

    </View>
  )
}