import React, {useState} from 'react';
import {FlatList, Image, RefreshControl, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {images} from "../../constants";
import SearchInput from "../../components/search-input";
import Trending from "../../components/trending";
import EmptyState from "../../components/empty-state";
import {getALlLatestPosts, getALlPosts} from "../../lib/appwrite";
import useAppwrite from "../../hooks/useAppwrite";
import VideoCard from "../../components/video-card";
import {useGlobalContext} from "../../context/GlobalProvider";

const Home = () => {
    const [refreshing, setRefreshing] = useState(false);
    const {user} = useGlobalContext();

    const {data: posts, refetch} = useAppwrite(getALlPosts);
    const {data: latestPosts,} = useAppwrite(getALlLatestPosts);


    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }

    return (
        <SafeAreaView className={'bg-primary h-full'}>
            <FlatList
                data={posts}
                keyExtractor={item => item.$id}
                renderItem={({item}) => <VideoCard data={item}/>}
                ListHeaderComponent={() => (
                    <View className={'my-6 px-6 space-y-6'}>
                        <View className={'justify-between items-start flex-row mb-6'}>
                            <View>
                                <Text className={'font-pmedium text-sm text-gray-100'}>Welcome Back,</Text>
                                <Text className={'capitalize text-2xl font-psemibold text-white'}>
                                    {user.documents && user?.documents[0]?.username}
                                </Text>
                            </View>
                            <View className={'mt-1.5'}>
                                <Image
                                    source={images.logoSmall}
                                    className={'w-9 h-10'}
                                    resizeMode={'contain'}
                                />
                            </View>
                        </View>
                        <SearchInput/>
                        <View className={'w-full flex-1 pt-5 pb-8'}>
                            <Text className={'text-gray-100 text-lg font-pregular mb-3'}>
                                Latest Videos
                            </Text>
                            <Trending
                                posts={latestPosts ?? []}
                            />
                        </View>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title={'No videos found'}
                        subtitle={"Be the first one to upload a video"}
                    />
                )}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
            />
        </SafeAreaView>
    );
};

export default Home;