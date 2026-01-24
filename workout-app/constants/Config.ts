// Replace localhost with your machine's local IP if testing on physical device
// Android Emulator uses 10.0.2.2 usually
// iOS Simulator uses localhost
import { Platform } from "react-native";

// Use 10.0.2.2 for Android Emulator, localhost for iOS/Web
const SERVER_HOST = Platform.OS === "android" ? "10.0.2.2" : "localhost";

export const API_URL = `http://${SERVER_HOST}:5000/api/workouts`;
