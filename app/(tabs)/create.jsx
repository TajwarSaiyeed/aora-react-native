import {ResizeMode, Video} from "expo-av";
import React, {useState} from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {Alert, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import FormField from "../../components/form-field";
import {icons} from "../../constants";
import CustomButton from "../../components/custom-button";
import * as DocumentPicker from "expo-document-picker"
import {createVideo} from "../../lib/appwrite";
import {useGlobalContext} from "../../context/GlobalProvider";
import {router} from "expo-router";

const Create = () => {
    const [uploading, setUploading] = useState(false)
    const [form, setForm] = useState({
        title: '',
        video: null,
        thumbnail: null,
        prompt: '',
    })

    const {user} = useGlobalContext()
    const openPicker = async (selectType) => {
        const result = await DocumentPicker.getDocumentAsync({
            type: selectType === 'video' ? ['video/mp4', 'video/gif']
                : ['image/png', 'image/jpeg'],
        })

        if (!result.canceled) {
            if (selectType === 'video') {
                setForm({...form, video: result.assets[0]})
            } else {
                setForm({...form, thumbnail: result.assets[0]})
            }
        }
    }

    const submit = async () => {
        if (!form.title || !form.video || !form.thumbnail || !form.prompt) {
            return Alert.alert('Error', 'Please fill all fields')
        }
        setUploading(true)

        try {
            await createVideo({
                ...form, userId: user.documents[0].$id
            })
            Alert.alert('Success', 'Post uploaded successfully')
            router.push('/home')
        } catch (e) {
            Alert.alert('Error', e.message)
        } finally {
            setUploading(false)
            setForm({
                title: '',
                video: null,
                thumbnail: null,
                prompt: '',
            })
        }
    }
    return (
        <SafeAreaView className={'bg-primary h-full'}>
            <ScrollView className={'px-4 my-6'}>
                <Text className={'text-2xl text-white font-psemibold'}>
                    Upload Video
                </Text>
                <FormField
                    title={'Video Title'}
                    value={form.title}
                    placeholder={"Give your video a catchy title..."}
                    handleChangeText={(text) => setForm({...form, title: text})}
                    otherStyles={'mt-10'}
                />
                <View className={'mt-7 space-y-2'}>
                    <Text className={'text-base text-gray-100 text-pmedium'}>
                        Upload Video
                    </Text>
                    <TouchableOpacity
                        onPress={() => openPicker('video')}
                    >
                        {form.video ? (
                            <Video
                                source={{uri: form.video.uri}}
                                className={'w-full h-64 rounded-2xl'}
                                resizeMode={ResizeMode.COVER}
                            />
                        ) : (
                            <View className={'w-full h-40 px-4 bg-black-100 rounded-2xl items-center justify-center'}>
                                <View
                                    className={'w-14 h-14 border border-dashed border-secondary-100 justify-center items-center'}>
                                    <Image
                                        source={icons.upload}
                                        resizeMode={'contain'}
                                        className={'w-1/2 h-1/2'}
                                    />
                                </View>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                <View className={'mt-7 space-y-2'}>
                    <Text className={'text-base text-gray-100 text-pmedium'}>
                        Thumbnail Image
                    </Text>
                    <TouchableOpacity
                        onPress={() => openPicker('image')}
                    >
                        {form.thumbnail ? (
                            <Image
                                source={{uri: form.thumbnail.uri}}
                                className={'w-full h-64 rounded-2xl'}
                                resizeMode={'cover'}
                            />
                        ) : (
                            <View className={'w-full h-16 px-4 bg-black-100 rounded-2xl items-center justify-center border-2 border-black-200 flex-row space-x-2'}>
                                <Image
                                    source={icons.upload}
                                    resizeMode={'contain'}
                                    className={'w-5 h-5'}
                                />
                                <Text className={'text-sm text-gray-100 font-pmedium'}>
                                    Choose a file
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                <FormField
                    title={'AI Prompt'}
                    value={form.prompt}
                    placeholder={"The prompt you used to create this video..."}
                    handleChangeText={(text) => setForm({...form, prompt: text})}
                    otherStyles={'mt-10'}
                />

                <CustomButton
                    title={'Submit & Publish'}
                    handlePress={submit}
                    containerStyles={'mt-7'}
                    isLoading={uploading}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default Create;