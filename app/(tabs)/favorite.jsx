import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-expo';
import Shared from './../../Shared/Shared'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/FireBaseConfig';
import PetListItem from './../../components/Home/PetListItem' 

export default function Favorite() {

  const user = useUser()
 const [loader, setloader] = useState(false)
  const [favIds, setfavIds] = useState([])
  const [favPetList, setFavPetList] = useState([])

  useEffect(() =>{
    user&&GetFavPetIds()
  }, [])



//fetch fav ids

const GetFavPetIds = async () => {
  setloader(true)
  const result = await Shared.GetFavList(user);
  console.log({G:favIds})
  setfavIds(result?.favorites)
  setloader(false)
    GetFavPetList(result?.favorites)
  

}

 //Fetch Related Pet List

 const GetFavPetList = async (favId_) => {
  setloader(true)
  setFavPetList([])
 
  const q= query(collection(db, 'Pets'),where('id','in', favId_))


  const querySnapshot = await getDocs(q)

  querySnapshot.forEach((doc) =>{
   
    setFavPetList(prev=>[...prev,doc.data()])
    console.log(favPetList);

  })
  setloader(false)


 }


  return (
    <View style={{
      padding:20,
      marginTop:20
    }}>
      <Text style={{
        fontFamily: 'outfit-medium',
        fontSize: 30,
      }}>Favorite</Text>

      <FlatList
      data={favPetList}
      numColumns={2}
      onRefresh={GetFavPetIds}
      refreshing={loader}
      renderItem={({item,index}) => (
        <View>
        <PetListItem pet={item}/>
        </View>
      )}
      /> 
    </View>
  )
}