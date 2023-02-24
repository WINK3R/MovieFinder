import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import {View} from "react-native";
import store from "./redux/store";
import {Provider, useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {getTrendingID} from "./redux/actions/actionGetTrendingID";

export default function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();


    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <Provider store={store}>
                <SafeAreaProvider>
                    <Navigation colorScheme={colorScheme}/>
                    <StatusBar/>
                </SafeAreaProvider>
            </Provider>
        );
    }
}
