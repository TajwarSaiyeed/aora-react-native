import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";

import {icons} from '../constants'

const FormField = ({
                       title, value, handleChangeText, otherStyles, keyboardType, placeholder, ...props
                   }) => {

    const [showPassword, setShowPassword] = useState(false)

    return (<View className={`space-y-2 ${otherStyles}`}>
        <Text className={'text-base text-gray-100 text-pmedium'}>
            {title}
        </Text>
        <View
            className={'border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-xl focus:border-secondary items-center flex-row'}>
            <TextInput
                value={value}
                onChangeText={handleChangeText}
                keyboardType={keyboardType}
                placeholder={placeholder}
                placeholderTextColor={'#7b7b8b'}
                className={'flex-1 text-white font-psemibold text-base'}
                secureTextEntry={title === "Password" && !showPassword}
            />
            {title === "Password" && (
                <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                >
                    <Image
                        source={!showPassword ? icons.eye : icons.eyeHide}
                        resizeMode={'contain'}
                        className={'w-6 h-6'}
                    />
                </TouchableOpacity>
            )}
        </View>
    </View>);
};

export default FormField;