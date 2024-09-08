import { View, Text, Image ,TextInput, StyleSheet, ScrollView, TouchableOpacity, Pressable, ToastAndroid, ActivityIndicator} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import Colors from '../../constants/Colors'
import { Picker } from '@react-native-picker/picker'
import { collection, doc, getDocs, setDoc } from 'firebase/firestore'
import { db, storage } from '../../config/FireBaseConfig'
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useUser } from '@clerk/clerk-expo'


export default function AddNewPet() {
    const navigation = useNavigation()
    const {user} = useUser()
    const [formData, setformData] = useState(
        //this is for default selection 
        {category:'Dogs', sex:'Male'}
    )
    const [gender, setGender] = useState()
    const [categoryList, setcategoryList] = useState([])
    const [selectedCategory, setselectedCategory] = useState()
    const [image, setImage] = useState()
    const [loader, setLoader] = useState(false)
    const router = useRouter()
    useEffect(() => {
      navigation.setOptions({
        headerTitle:'Add New Pet'
      })
      GetCategories();
    }, [])


     //Get the categories from firestore

     const GetCategories = async () => {
        setcategoryList([])
        const snapshot = await getDocs(collection(db, 'Category'));
      

        snapshot.forEach(doc => {
     
         setcategoryList((categoryList => [...categoryList, doc.data()]))
       })
    }

    const handleInputChange = (fieldName,fieldValue) =>{
          setformData(prev => ({
            ...prev,
            [fieldName]:fieldValue
          })) 
    }

    
    //we got this block of code from expo image picker doc
    //pick image from gallery
    const imagePicker= async ()=>{
         // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    }

    const onSubmit=()=>{
        //we check if all 8 fields are field
        if(Object.keys(formData).length !=8){
            //Toast is only supported on android
          ToastAndroid.show('Enter All Details', ToastAndroid.BOTTOM)
          return;
        }

        UploadImage();
    }

    //use to uploade pet image to firebase

    const UploadImage= async() =>{
        setLoader(true)
         const resp= await fetch(image)
         const blobImage= await resp.blob();
         const storageRef= ref(storage, '/PetAdopt/'+Date.now()+'.jpg')
          uploadBytes (storageRef,blobImage).then((snapshot) =>{
            console.log('file uploaded')
          }).then(resp=> {
            getDownloadURL(storageRef).then(async(imageUrl)=>{

                console.log(imageUrl)
                SaveFormData(imageUrl)
            })
          })
        }

        //use to save our data to firebase store

        const SaveFormData = async (imageUrl) =>{
          const docId= Date.now().toString();
          await setDoc(doc(db,'Pets', docId),{
            ...formData,
            //we pass d image url we got after saving d image
            //and values of the remaining fields we have in our Pets collection
            imageUrl:imageUrl,
            username: user?.fullName,
            email: user?.primaryEmailAddress.emailAddress,
            id:docId,
            userImage:user?.imageUrl

          })
          setLoader(false)
          router.replace('/(tabs)/home')
        }
 
  return (
    <ScrollView  style={{
        padding:20
    }}>
      <Text style={{
        fontFamily:'outfit-medium',
        fontSize:20
      }}>Add New Pet</Text>
      
      <Pressable onPress={imagePicker}>
     {!image ? 
      <Image source={require('./../../assets/images/react-logo.png')} 
      style={{
        width:50,
        height:50,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: Colors.GRAY,
      }}
      />
      :
      <Image source={{uri:image}} 
      style={{
        width:50,
        height:50,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: Colors.GRAY,
      }}
      />
    }
      </Pressable>
      <View style={styles.InputContainer}>
        <Text style={styles.label} >Pet Name *</Text>
        {/* The fields must match with the one on the Pet collection on firebase */}
        <TextInput style={styles.input} onChangeText={(value) =>handleInputChange('name',value)} />
      </View>

      <View style={styles.InputContainer}>
      <Text style={styles.label} >Category *</Text>
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue, itemIndex) =>{
            setselectedCategory(itemValue)
            handleInputChange('category',itemValue)
            }
        }
        style={styles.input}
        >
            {
                categoryList.map((category,index) => (
                    <Picker.Item  key={index} label= {category.name} value={category.name}/>
                ))
            }

        
      
        </Picker>
        </View>

      <View style={styles.InputContainer}>
        <Text style={styles.label} >Breed *</Text>
        {/* The fields must match with the one on the Pet collection on firebase */}
        <TextInput style={styles.input} onChangeText={(value) =>handleInputChange('breed',value)} />
      </View>

      <View style={styles.InputContainer}>
        <Text style={styles.label} >Age *</Text>
        {/* The fields must match with the one on the Pet collection on firebase */}
        <TextInput
        keyboardType='numeric '
        style={styles.input} onChangeText={(value) =>handleInputChange('age',value)} />
      </View>
      <View style={styles.InputContainer}>
      <Text style={styles.label} >Gender *</Text>
      <Picker
        selectedValue={gender}
        onValueChange={(itemValue, itemIndex) =>{
            setGender(itemValue)
            handleInputChange('sex',itemValue)
            }
        }
        style={styles.input}
        >
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
        </Picker>
        </View>
      <View style={styles.InputContainer}>
        <Text style={styles.label} >Weight *</Text>
        {/* The fields must match with the one on the Pet collection on firebase */}
        <TextInput
        keyboardType='numeric'
        style={styles.input} onChangeText={(value) =>handleInputChange('weight',value)} />
      </View>

      <View style={styles.InputContainer}>
        <Text style={styles.label} >Address *</Text>
        {/* The fields must match with the one on the Pet collection on firebase */}
        <TextInput style={styles.input} onChangeText={(value) =>handleInputChange('address',value)} />
      </View>

      <View style={styles.InputContainer}>
        <Text style={styles.label} >About *</Text>
        {/* The fields must match with the one on the Pet collection on firebase */}
        <TextInput 
        multiline={true}
        numberOfLines={10}
        style={[styles.input,{height:100}]}
         onChangeText={(value) =>handleInputChange ('about',value)} />
      </View>

      
       
       <TouchableOpacity style={styles.button}
       disabled={loader}
       onPress={()=>onSubmit() }
    
       >
          {
          loader ?
          
          <ActivityIndicator size={'large'} /> 
          
        : 

        <Text style={{
            fontFamily: 'outfit-medium',
            textAlign:'center'
        }}>Submit</Text>
         }
       </TouchableOpacity>
        
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    InputContainer:{
        marginVertical: 5
    },
    input:{
        padding:10,
        backgroundColor:Colors.WHITE,
        borderRadius: 7,
        fontFamily: 'outfit'
    },
    label:{
        marginVertical: 5,
        fontFamily: 'outfit'
    },
    button:{
        padding: 15,
        backgroundColor:Colors.PRIMARY,
        borderRadius: 7,
        marginVertical:10,
        marginBottom: 50,
    }
})