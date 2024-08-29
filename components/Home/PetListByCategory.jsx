import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Category from './Category'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../config/FireBaseConfig'
import PetListItem from './PetListItem'

export default function PetListByCategory() {

  const [petList, setPetList] = useState([])

  useEffect(() => {
    //We are passing in Birds category so it will be our default post list that will show on
    //the dashboard else the post list will be empty until we click on a category
    GetPetList('Birds')
  }, [])

  //we use this to get pet list from firetore
  const GetPetList = async (category) => {

    //we set to empty array so cus in the forEach command we are 
    //pushing in new file, else we get duplicates.
    setPetList([])

  const q = query (collection(db, 'Pets'),where('category','==',category))
  const querySnapshot = await getDocs(q)

  querySnapshot.forEach( doc => {
    setPetList(petList => [...petList, doc.data()])


  })
}



  return (
    <View>
      <Category
      // we pass in a function we are going to call in category component
      category={(value) =>GetPetList(value)}
      /> 
<Text>Hi</Text>
      <FlatList
      data={petList}
      renderItem={({item, index}) => (
        <PetListItem pet={item } />
  
       
  )}
      />
    </View>
  )
}