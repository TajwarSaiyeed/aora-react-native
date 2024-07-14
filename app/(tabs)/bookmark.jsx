import React from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {Text, View} from "react-native";

const Bookmark = () => {
    return (
        <SafeAreaView className={'bg-primary h-full'}>
            <View className={'flex-1 justify-center items-center'}>
                <Text className={'text-white text-2xl font-psemibold'}>
                   Coming Soon
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default Bookmark;