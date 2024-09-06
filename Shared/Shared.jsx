import { doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import {db} from './../config/FireBaseConfig'


const GetFavList = async ({user}) => {

       
    
    const docSnap = await getDoc(doc(db,'UserFavPet', user?.primaryEmailAddress?.emailAddress))
   

   
    if (docSnap?.exists()) {
    
     return docSnap.data();
  
   }
   else {
     await setDoc(doc(db, 'UserFavPet', user?.primaryEmailAddress?.emailAddress),{
        email:  user?.primaryEmailAddress?.emailAddress,
        favorites: []
     })

    
   }
}

const UpdateFav = async ({user},favorite) => {
     

    const docRef = doc(db, 'UserFavPet', user?.primaryEmailAddress?.emailAddress)
    //console.log(docRef)

    try {
        await updateDoc(docRef, {
            favorites: favorite
        })
    } catch (error) {
       console.log(error) 
    }
}

export default { GetFavList, UpdateFav}