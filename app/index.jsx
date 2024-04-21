import {View} from 'react-native';
import {Link} from "expo-router";

const App = () => {
    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Link href={'/home'} className="text-2xl font-bold text-center text-gray-900">
                Welcome to React Native
            </Link>
        </View>
    );
}

export default App;
