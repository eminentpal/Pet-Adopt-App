import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import Feather from '@expo/vector-icons/Feather';

export default function OwnerInfo({pet}) {

    //console.log(pet.user[])
  return (
    <View style={styles.container}>
        <View
        style={{
            display:'flex',
            flexDirection: 'row',
            alignItems:'center',
            gap:20
        }}
        >
      <Image source={{uri:pet?.user[1]}}
      style={{
       width: 50,
       height:50,
       borderRadius:99,

      }}
      />
      <View>
      <Text
      style={{
        fontFamily: 'outfit-medium',
        fontSize: 17,
      }}
      >{pet?.user}</Text>
        
        <Text
        style={{
            fontFamily: 'outfit',
            color:Colors.GRAY
        }}
        >Pet Owner</Text>
      </View>
      </View>
      <Feather name="send" size={24} color={Colors.PRIMARY} />

    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal:20,
        paddingHorizontal:20,
        display:'flex',
        flexDirection:'row',
        alignItems: 'center',
        gap:20,
        borderWidth:1,
        borderRadius:15,
        padding:10,
        backgroundColor:Colors.WHITE,
        justifyContent:'space-between',
        marginBottom: 70,
        borderColor: Colors.PRIMARY,


    }
});