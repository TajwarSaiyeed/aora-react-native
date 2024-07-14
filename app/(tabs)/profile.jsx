import React from 'react';
import {FlatList, Image, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import EmptyState from "../../components/empty-state";
import useAppwrite from "../../hooks/useAppwrite";
import VideoCard from "../../components/video-card";
import {getUserPosts, signOut} from "../../lib/appwrite";
import {useGlobalContext} from "../../context/GlobalProvider";
import {icons} from "../../constants";
import InfoBox from "../../components/info-box";
import {router} from "expo-router";

const Profile = () => {
    const {user, setUser, setIsLoggedIn} = useGlobalContext()
    const {data: posts, refetch} = useAppwrite(() => getUserPosts(user.documents[0].$id));

    const logOut = async () => {
        await signOut();
        setIsLoggedIn(false);
        setUser(null);

        router.replace('/sign-in')
    }

    return (<SafeAreaView className={'bg-primary h-full'}>
        <FlatList
            data={posts}
            keyExtractor={item => item.$id}
            renderItem={({item}) => <VideoCard data={item}/>}
            ListHeaderComponent={() => (
                <View className={'w-full justify-center items-center mt-6 mb-12 px-4'}>
                    <TouchableOpacity
                        className={'w-full items-end mb-10'}
                        onPress={logOut}
                    >
                        <Image
                            source={icons.logout}
                            resizeMode={'contain'}
                            className={'w-6 h-6'}
                        />
                    </TouchableOpacity>
                    <View className={'w-16 h-16 border border-secondary rounded-lg justify-center items-center'}>
                        <Image
                            source={{uri: user?.documents[0]?.avatar}}
                            resizeMode={'cover'}
                            className={'w-[90%] h-[90%] rounded-lg'}
                        />
                    </View>
                    <InfoBox
                        title={user?.documents[0]?.username}
                        containerStyles={'mt-5'}
                        titleStyles={'text-lg'}
                    />
                    <View className={'mt-5 flex-row'}>
                        <InfoBox
                            title={posts.length || 0}
                            subtitle={'Posts'}
                            containerStyles={'mr-10'}
                            titleStyles={'text-xl'}
                        />
                        <InfoBox
                            title='1.2k'
                            subtitle={'Followers'}
                            titleStyles={'text-xl'}
                        />
                    </View>
                </View>
            )}
            ListEmptyComponent={() => (<EmptyState
                title={'No videos found'}
                subtitle={"You haven't uploaded any videos yet"}
            />)}
        />
    </SafeAreaView>);
};

export default Profile;