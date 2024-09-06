import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import Shared from '../Shared/Shared';
import { useUser } from '@clerk/clerk-expo';

//added default to be black incase color is not defined
//cus dx prop color was defined as white from the prop
//passed from petlistitem component but not on d petdetails component
export default function MarkFav({pet, color='black'}) {

    const user = useUser()

   

    const [favList, setfavList] = useState()

    //the [user] dependency is making d code block to be called
    //too many times which can slow performance.
    useEffect(() => {
      user && GetFav()
    
    }, [user])

    const GetFav = async () => {
        
       const result = await Shared.GetFavList(user)
       //we check if we have favorites, if we have favorite den add it else leave as empty array
        setfavList(result?.favorites ? result?.favorites : [])
    }

    const AddToFav = async () => {

        const favorite = favList;
        
        favorite.push(pet?.id)
     
      await Shared.UpdateFav(user,favorite);
      GetFav()


    }

   const removeFromFav = async () => {
     const favorite = favList.filter(item=> item != pet.id)
     await Shared.UpdateFav(user,favorite);
     GetFav()
   }
    
  return (
    <View>
       { favList?.includes(pet.id) ?
        <Pressable onPress={() => removeFromFav()}>
        
        <Entypo name="heart" size={24} color="red" />

        </Pressable>
           :
        <Pressable onPress={() => AddToFav()} >
        
         <Entypo name="heart-outlined" size={24} color={color} />

         </Pressable>
        }
    </View>
  )
}