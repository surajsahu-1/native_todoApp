import { Stack } from "expo-router"

const RootLayout = () => {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={
                    {
                        // headerShown: false,
                        headerTitle: "To-Do List",
                        headerStyle: {
                            backgroundColor: "#FAF3E0",
                        },
                        animation: "slide_from_right",
                        animationDuration: 300,
                        statusBarColor: "#FAF3E0",

                    }
                }
            />
        </Stack>
    )
}

export default RootLayout