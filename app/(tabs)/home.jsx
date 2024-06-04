import React, {useState} from 'react';
import {FlatList, Image, RefreshControl, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {images} from "../../constants";
import SearchInput from "../../components/search-input";
import Trending from "../../components/trending";
import EmptyState from "../../components/empty-state";

const Home = () => {
    const [refreshing, setRefreshing] = useState(false);


    const onRefresh = () => {
        setRefreshing(true);
        // re call videos -> if any new videos appeard
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }

    return (
        <SafeAreaView className={'bg-primary h-full'}>
            <FlatList
                data={[
                    {id: 1, name: 'John'},
                    {id: 2, name: 'Doe'},
                    {id: 3, name: 'Jane'},
                ]}
                // data={[]}
                keyExtractor={item => item.$id}
                renderItem={({item}) => <Text className={'text-3xl text-white'}>{item.name}</Text>}
                ListHeaderComponent={() => (
                    <View className={'my-6 px-6 space-y-6'}>
                        <View className={'justify-between items-start flex-row mb-6'}>
                            <View>
                                <Text className={'font-pmedium text-sm text-gray-100'}>Welcome Back</Text>
                                <Text className={'text-2xl font-psemibold text-white'}>
                                    Tajwar Saiyeed
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
                                posts={[
                                    {id: 1},
                                    {id: 2},
                                    {id: 3},
                                    {id: 4},
                                ] ?? []}
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