/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {FontAwesome} from '@expo/vector-icons';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faClock, faFilm, faHeart} from "@fortawesome/free-solid-svg-icons";
import Ionicons from '@expo/vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {Appearance, ColorSchemeName, Pressable} from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import NotFoundScreen from '../screens/NotFoundScreen';
import WatchLaterScreen from '../screens/WatchLaterScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import HomeScreen from '../screens/HomeScreen';
import {RootStackParamList, RootTabParamList, RootTabScreenProps} from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import {useCallback, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {getTrendingID} from "../redux/actions/actionGetTrendingID";
import * as SplashScreen from 'expo-splash-screen';

export default function Navigation({colorScheme}: { colorScheme: ColorSchemeName }) {
    const [appIsReady, setAppIsReady] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        async function prepare() {
            try {
                const loadTrendingID = async () => {
                    // @ts-ignore
                    await dispatch(getTrendingID());
                };
                //console.log("test1:", trendingMovies);
                loadTrendingID();
            } catch (e) {
                console.warn(e);
            } finally {
                // Tell the application to render
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            // This tells the splash screen to hide immediately! If we call this after
            // `setAppIsReady`, then we may see a blank screen while the app is
            // loading its initial state and rendering its first pixels. So instead,
            // we hide the splash screen once we know the root view has already
            // performed layout.
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);
    if (!appIsReady) {
        return null;
    }
    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <RootNavigator/>
        </NavigationContainer>
    );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Root" component={BottomTabNavigator} options={{headerShown: false}}/>
            <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{title: 'Oops!'}}/>
            <Stack.Screen name="Favorite" component={FavoriteScreen} options={{headerShown: false}}/>
            <Stack.Screen name="WatchLater" component={WatchLaterScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
    let colorScheme = useColorScheme();
    const isLightTheme = colorScheme === "light"

    return (
        <BottomTab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor: isLightTheme ? "black" : "white",

            }}>
            <BottomTab.Screen
                name="WatchLater"

                component={WatchLaterScreen}
                options={({navigation}: RootTabScreenProps<'WatchLater'>) => ({
                    tabBarIcon: ({color, size}) => <TabBarIcon name={faClock} color={color} size={20}/>,
                    headerShown: false,

                })}
            />
            <BottomTab.Screen
                name="Home"
                component={HomeScreen}

                options={{
                    headerShown: false,
                    tabBarIcon: ({color, size}) => <TabBarIcon name={faFilm} color={color} size={20}/>,
                }}
            />
            <BottomTab.Screen
                name="Favorite"
                component={FavoriteScreen}

                options={{
                    headerShown: false,
                    tabBarIcon: ({color, size}) => <TabBarIcon name={faHeart} color={color} size={20}/>,
                }}
            />
        </BottomTab.Navigator>
    );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
    name: any;
    color: string;
    size: number;
}) {
    return <FontAwesomeIcon icon={props.name} style={{marginBottom: -5}} size={props.size} color={props.color}/>;
}
