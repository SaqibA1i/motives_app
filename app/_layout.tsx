import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { Wrapper } from "@/components/Wrappers";
import { useColorScheme } from "@/hooks/useColorScheme";
import * as Font from 'expo-font';
import { Handlee_400Regular } from '@expo-google-fonts/handlee';
import { PlusJakartaSans_400Regular } from '@expo-google-fonts/plus-jakarta-sans';
import { Heebo_400Regular } from '@expo-google-fonts/heebo';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    Font.loadAsync({
      Handlee_400Regular,
      PlusJakartaSans_400Regular,
      Heebo_400Regular
    });
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);


  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Wrapper>
        <Stack>
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="signup" options={{ headerShown: false }} />

          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </Wrapper>
    </ThemeProvider>
  );
}
