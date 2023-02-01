import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import {View, Text, ScrollView, FlatList} from "react-native";
import {useEffect, useState} from "react";
import * as React from "react";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();


  if (!isLoadingComplete) {
    return null;
  } else {
    return (
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
    );
  }
}
