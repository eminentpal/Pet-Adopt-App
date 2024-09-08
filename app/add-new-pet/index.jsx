import { View, Text, Image ,TextInput, StyleSheet, ScrollView, TouchableOpacity} from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router'
import Colors from '../../constants/Colors'


export default function index() {
    const navigation = useNavigation()

    useEffect(() => {
      navigation.setOptions({
        headerTitle:'Add New Pet'
    

      })
    }, [])

    const hanleInputChange = (fieldName,fieldValue) =>{
          console.log(fieldName, fieldValue)
    }
    
  return (
    <ScrollView  style={{
        padding:20
    }}>
      <Text style={{
        fontFamily:'outfit-medium',
        fontSize:20
      }}>Add New Pet</Text>

      <Image source={require('./../../assets/images/react-logo.png')} 
      style={{
        width:50,
        height:50,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: Colors.GRAY,
      }}
      />
      <View style={styles.InputContainer}>
        <Text style={styles.label} >Pet Name *</Text>
        {/* The fields must match with the one on the Pet collection on firebase */}
        <TextInput style={styles.input} onChangeText={(value) =>hanleInputChange('name',value)} />
      </View>

      <View style={styles.InputContainer}>
        <Text style={styles.label} >Breed *</Text>
        {/* The fields must match with the one on the Pet collection on firebase */}
        <TextInput style={styles.input} onChangeText={(value) =>hanleInputChange('breed',value)} />
      </View>

      <View style={styles.InputContainer}>
        <Text style={styles.label} >Age *</Text>
        {/* The fields must match with the one on the Pet collection on firebase */}
        <TextInput style={styles.input} onChangeText={(value) =>hanleInputChange('age',value)} />
      </View>

      <View style={styles.InputContainer}>
        <Text style={styles.label} >Weight *</Text>
        {/* The fields must match with the one on the Pet collection on firebase */}
        <TextInput style={styles.input} onChangeText={(value) =>hanleInputChange('weight',value)} />
      </View>

      <View style={styles.InputContainer}>
        <Text style={styles.label} >Address *</Text>
        {/* The fields must match with the one on the Pet collection on firebase */}
        <TextInput style={styles.input} onChangeText={(value) =>hanleInputChange('address',value)} />
      </View>

      <View style={styles.InputContainer}>
        <Text style={styles.label} >About *</Text>
        {/* The fields must match with the one on the Pet collection on firebase */}
        <TextInput 
        numberOfLines={5}
        multiline={true}
        style={styles.input}
         onChangeText={(value) =>hanleInputChange('about',value)} />
      </View>
       
       <TouchableOpacity style={styles.button}>
        <Text style={{
            fontFamily: 'outfit-medium',
            textAlign:'center'
        }}>Submit</Text>
       </TouchableOpacity>
        
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    InputContainer:{
        marginVertical: 5
    },
    input:{
       
        backgroundColor:Colors.WHITE,
        borderRadius: 7,
        fontFamily: 'outfit'
    },
    label:{
        marginVertical: 15,
        fontFamily: 'outfit'
    },
    button:{
        padding: 15,
        backgroundColor:Colors.PRIMARY,
        borderRadius: 7,
        marginVertical:10
    }
})