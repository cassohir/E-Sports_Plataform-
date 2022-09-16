import { StyleSheet, StatusBar } from "react-native";

import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from "@expo-google-fonts/inter";

import './src/services/notifications.config';
import { getPushNotificationToken } from './src/services/getPushNotificationToken';

import { Subscription } from 'expo-modules-core';
import * as Notifications from 'expo-notifications';

import { Routes } from "./src/routes";
import { Background } from "./src/components/Background/Background";
import { Loading } from "./src/components/Loading/Loading";
import { useEffect, useRef } from "react";


export default function App() {
  // ExponentPushToken[xcOiJBCmTNzltEPI9mttUm]

const getNotificationListener = useRef<Subscription>();
const responseNotificationListener = useRef<Subscription>();


useEffect(() => { 
  getPushNotificationToken();
})
  
  useEffect(() => { 
    getNotificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
    });

    responseNotificationListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      if(getNotificationListener.current && responseNotificationListener.current) {
        getNotificationListener.current.remove();
        responseNotificationListener.current.remove();
      }
    }
})

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });
  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      { fontsLoaded ? <Routes /> : <Loading/> }
    </Background>
  );
}
