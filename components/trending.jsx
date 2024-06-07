import React, {useState} from 'react';
import {FlatList, Image, ImageBackground, TouchableOpacity} from "react-native";
import * as Animatable from "react-native-animatable";
import {icons} from "../constants";
import {ResizeMode, Video} from "expo-av";

const zoomIn = {
    0: {
        scale: 0.9
    }, 1: {
        scale: 1
    }
}

const zoomOut = {
    0: {
        scale: 1
    }, 1: {
        scale: 0.9
    }
}

const TrendingItem = ({activeItem, item}) => {
    const [play, setPlay] = useState(false)
    console.log(item.video);
    return (<Animatable.View
        className={'mr-5'}
        animation={activeItem === item.$id ? zoomIn : zoomOut}
        duration={500}
    >
        {play ? (
            <Video
                source={{uri: item.video,}}
                resizeMode={ResizeMode.CONTAIN}
                shouldPlay
                useNativeControls
                onPlaybackStatusUpdate={(status) => {
                    if (status.didJustFinish) {
                        setPlay(false)
                    }
                }}
                onError={(error) => console.error('Video playback error:', error)}
                className={'w-52 h-72 rounded-[35px] mt-3 bg-white/10'}
            />
        ) : (
            <TouchableOpacity
                className={'relative justify-center items-center'}
                activeOpacity={0.7}
                onPress={() => setPlay(true)}
            >
                <ImageBackground
                    source={{uri: item.thumbnail}}
                    className={'w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40'}
                    resizeMode={'cover'}
                />
                <Image
                    source={icons.play}
                    className={'w-12 h-12 absolute'}
                    resizeMode={'contain'}
                />
            </TouchableOpacity>
        )}
    </Animatable.View>)
}

const Trending = ({posts}) => {
    const [activeItem, setActiveItem] = useState(posts[1]);

    const viewableItemsChanged = ({viewableItems}) => {
        if (viewableItems.length > 0) setActiveItem(viewableItems[0].item.$id)
    }
    return (<FlatList
        data={posts}
        renderItem={({item}) => (<TrendingItem
            activeItem={activeItem}
            item={item}
        />)}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={{
            itemVisiblePercentThreshold: 70
        }}
        contentOffset={{x: 170}}
        horizontal
    />);
};

export default Trending;