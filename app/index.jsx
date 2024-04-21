import {StatusBar} from 'expo-status-bar';
import {Text, View} from 'react-native';

const App = () => {
    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Text className={'font-pblack'}>Open up App.js to start working on your app!</Text>
            <StatusBar style="auto"/>
        </View>
    );
}

export default App;
