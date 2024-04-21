import React from 'react';

import {Tabs} from "expo-router";
import {Image, Text, View} from "react-native";

import {icons} from "../../constants";


const TabIcon = ({focused, color, icon, name}) => {
    return (
        <View
            className={'items-center justify-center gap-2'}
        >
            <Image
                source={icon}
                resizeMode="contain"
                tintColor={color}
                className={'w-6 h-6'}
            />
            <Text
                style={{color: color}}
                className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
            >
                {name}
            </Text>
        </View>
    );
};


const TabsLayout = () => {
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: '#FFA001',
                    tabBarInactiveTintColor: '#CDCD30',
                    tabBarStyle: {
                        backgroundColor: "#161622",
                        borderTopColor: '#232533',
                        borderTopWidth: 1,
                        height: 84
                    }
                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        title: 'Home',
                        headerShown: false,
                        tabBarIcon: ({focused, color}) => (
                            <TabIcon
                                name="Home"
                                icon={icons.home}
                                focused={focused}
                                color={color}
                            />
                        )
                    }}
                />
                <Tabs.Screen
                    name="bookmark"
                    options={{
                        title: 'Bookmark',
                        headerShown: false,
                        tabBarIcon: ({focused, color}) => (
                            <TabIcon
                                name="Bookmark"
                                icon={icons.bookmark}
                                focused={focused}
                                color={color}
                            />
                        )
                    }}
                /><Tabs.Screen
                name="create"
                options={{
                    title: 'Create',
                    headerShown: false,
                    tabBarIcon: ({focused, color}) => (
                        <TabIcon
                            name="Create"
                            icon={icons.plus}
                            focused={focused}
                            color={color}
                        />
                    )
                }}
            /><Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({focused, color}) => (
                        <TabIcon
                            name="Profile"
                            icon={icons.profile}
                            focused={focused}
                            color={color}
                        />
                    )
                }}
            />
            </Tabs>
        </>
    );
};

export default TabsLayout;