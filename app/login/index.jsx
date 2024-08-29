import { View, Text, Image, Pressable, Alert } from 'react-native'
import {React, useCallback, useEffect, useState} from 'react'
import Colors from "../../constants/Colors";
import * as WebBrowser from 'expo-web-browser';
import { useAuth, useOAuth, useUser } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import { Redirect } from 'expo-router';


export const useWarmUpBrowser = () => {
  useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync()
    return () => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

WebBrowser.maybeCompleteAuthSession()



export default function LoginScreen  () {

  const { user } = useUser();
  const [sessionexist, setsessionexist] = useState(false)
  const { isSignedIn } = useAuth();

  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })
  
  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/(tabs)/home', { scheme: 'myapp' }),
      })

      console.log({message:createdSessionId})
      if (createdSessionId) {
        setActive({ session: createdSessionId })

        setsessionexist(true)

      
    
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', {err})
  
    }
  }, [])

  console.log(isSignedIn )

  // use this to redirect user after signed in
  if (sessionexist || isSignedIn) {
    return <Redirect href={'/(tabs)/home'} />
  }
  
  return (

    <View
    style={{
        backgroundColor:Colors.WHITE,
        height:'100%'
    }}
    > 
      <Image 
      source={require('./../../assets/images/login.png')}
      style={{
        width: '100%'  ,
        height:500
      }}
      />
      <View style={{
        padding: 20,
        display: 'flex',
        alignItems:'center'
      }}>
        <Text
        style={{
            fontFamily:'outfit-bold',
            fontSize: 30,
            textAlign:'center'
        }}
        >Ready to make a new friend? </Text>
        <Text 
        style={{
            fontFamily: 'outfit',
            fontSize: 18,
            textAlign:'center',
            color:Colors.GRAY
        }}
        >
            Let's adopt the pet which you like and make there
            there life happy again.
        </Text>
        <Pressable
        onPress={onPress}
        style={{
            padding:14,
            marginTop:100,
            backgroundColor:Colors.PRIMARY,
            width: '100%',
            borderRadius:14
        }}
        >

            <Text
             style={{
                fontFamily:'outfit-medium',
                fontSize: 20,
                textAlign: 'center'
            }}
            >
              Get Started
            </Text>
        </Pressable>
  
      </View>
    </View>
  )
}