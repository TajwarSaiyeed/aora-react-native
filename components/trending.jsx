import React from 'react';
import {FlatList, Text} from "react-native";

const Trending = ({posts}) => {
    return (
        <FlatList
            data={posts}
            renderItem={({item}) => (<Text className={'text-white text-2xl'}>{item.id}</Text>)}
            horizontal
        />
    );
};

export default Trending;