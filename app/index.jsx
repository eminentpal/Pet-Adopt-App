import { useUser } from "@clerk/clerk-expo";
import { Link, Redirect, useRootNavigationState } from "expo-router";
import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import { getAuth } from "firebase/auth";

export default function Index() {

  /// we use this to get user that is currently signed in
  const { isSignedIn, user, isLoaded } = useUser()

  // const auth = getAuth()

  // const activeUser = auth.currentUser;

 

  // useEffect(() => {
  //   CheckNavLoaded()
  // },[])

  // const CheckNavLoaded = () => {
  //   if(!useRootNavigationState.key)
  //     return null
  // };

  if (!isLoaded) {
    // Handle loading state however you like
    return null
  }

  return  (
    <View
      style={{
        flex: 1
      }}
    >


   { user || isSignedIn ? 

/* {  activeUser ?  */
   
   <Redirect href={'/(tabs)/home'} /> 
   :
   <Redirect href={'/login'} />
  }
    </View>
  );
}
