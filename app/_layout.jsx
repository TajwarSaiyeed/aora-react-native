import {Stack} from "expo-router";

const RootLayout = () => {
    return (
        <Stack>
            <Stack.Screen name={'index'}
                          options={{
                              headerShown: false
                          }}
            >
            </Stack.Screen>
        </Stack>
    )
};

export default RootLayout;