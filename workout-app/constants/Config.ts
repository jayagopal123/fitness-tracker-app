// Replace localhost with your machine's local IP if testing on physical device
// Android Emulator uses 10.0.2.2 usually
// iOS Simulator uses localhost
import { Platform } from "react-native";
import Constants from "expo-constants";

// Use 10.0.2.2 for Android Emulator, localhost for iOS/Web
// Set EXPO_PUBLIC_API_HOST to your machine IP when testing on a physical device
const DEFAULT_HOST = Platform.OS === "android" ? "10.0.2.2" : "localhost";
const hostUri =
  Constants.expoConfig?.hostUri ??
  (Constants.manifest as { hostUri?: string } | undefined)?.hostUri;
const inferredHost = hostUri ? hostUri.split(":")[0] : undefined;
const SERVER_HOST =
  process.env.EXPO_PUBLIC_API_HOST ?? inferredHost ?? DEFAULT_HOST;

export const API_BASE_URL = `http://${SERVER_HOST}:5000`;
export const WORKOUTS_URL = `${API_BASE_URL}/api/workouts`;
export const WORKOUTS_UPSERT_URL = `${WORKOUTS_URL}/upsert`;
