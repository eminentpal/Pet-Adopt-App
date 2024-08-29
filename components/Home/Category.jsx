import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db } from '../../config/FireBaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import Colors from '../../constants/Colors';

export default function Category({category}) {

    const [categoryList, setcategoryList] = useState([])
    const [selectedCategory, setselectedCategory] = useState('Birds')

    useEffect(() => {
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

  return (
    <View 
    style={{
        marginTop:20
    }} >
      <Text style={{
        fontFamily:'outfit-medium'
      }}>Category</Text>

      <FlatList
       numColumns={4}
       data={categoryList}
       renderItem={({item, index}) =>(
             <TouchableOpacity style = {{
               flex:1
             }}
              onPress={() => {
                setselectedCategory(item?.name);
                category(item.name)

              }}
             >
                  <View style={[styles.containers, selectedCategory == item.name &&  styles.selectedCategoryContainer]}>
                    <Image source={{uri: item?.imageUrl}} style={
                        {
                           width:40,
                           height:40
                        }
                    }/> 
                     </View>
                     <Text style={{
                        textAlign:'center',
                        fontFamily:'outfit'
                     }}>{item?.name}</Text>
             </TouchableOpacity>
       )}
      
      />
    </View>
  )
}

const styles = StyleSheet.create({
    containers:{
        backgroundColor: Colors.LIGHT_PRIMARY,
        padding: 15,
        alignItems: 'center',
        borderWidth:1,
        borderRadius:15,
        borderColor:Colors.PRIMARY,
        margin:5


    },
   selectedCategoryContainer:{
    backgroundColor:Colors.SECONDARY,
    borderColor: Colors.SECONDARY
   } 
});