import React, {useEffect} from 'react';
import {FlatList, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import EmptyState from "../../components/empty-state";
import useAppwrite from "../../hooks/useAppwrite";
import VideoCard from "../../components/video-card";
import {useLocalSearchParams} from "expo-router";
import {searchPosts} from "../../lib/appwrite";
import SearchInput from "../../components/search-input";

const Search = () => {
    const {query} = useLocalSearchParams()

    const {data: posts, refetch} = useAppwrite(() => searchPosts(query));

    useEffect(() => {
        refetch();
    }, [query]);


    return (<SafeAreaView className={'bg-primary h-full'}>
        <FlatList
            data={posts}
            keyExtractor={item => item.$id}
            renderItem={({item}) => <VideoCard data={item}/>}
            ListHeaderComponent={() => (
                <View className={'my-6 px-6'}>
                    <Text className={'font-pmedium text-sm text-gray-100'}>Search Results</Text>
                    <Text className={'text-2xl font-psemibold text-white'}>
                        {query}
                    </Text>
                    <View className={'mt-6 mb-8'}>
                        <SearchInput initialQuery={query}/>
                    </View>
                </View>
            )}
            ListEmptyComponent={() => (<EmptyState
                title={'No videos found'}
                subtitle={"No videos found for this search query. Please try again with a different query."}
            />)}
        />
    </SafeAreaView>);
};

export default Search;