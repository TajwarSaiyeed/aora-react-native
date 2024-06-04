import React from "react";
import {Image, TextInput, TouchableOpacity, View} from "react-native";

import {icons} from '../constants'

const SearchInput = ({value, handleChangeText, keyboardType}) => {
    return (<View
        className={'border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-xl focus:border-secondary items-center flex-row space-x-4'}>
        <TextInput
            value={value}
            onChangeText={handleChangeText}
            keyboardType={keyboardType}
            placeholder={"Search for a video topic"}
            placeholderTextColor={'#7b7b8b'}
            className={'text-base mt-0.5 flex-1 text-white font-pregular'}
        />
        <TouchableOpacity>
            <Image
                source={icons.search}
                className={'w-5 h-5'}
                resizeMode={'contain'}
            />
        </TouchableOpacity>
    </View>);
};

export default SearchInput;