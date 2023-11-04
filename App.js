import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import verbs from "./verbs.json";
import words from "./words.json";
import sampleSentences from "./sample.json";
import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  addDoc,
  getDocs,
  collection,
  listCollections,
} from "firebase/firestore";
import Verbs from "./components/verbs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome } from "@expo/vector-icons";
// Initialize Firebase

export default function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyDBkAMkGkq8EfG3PM3IvFplhkzwhBGZvEs",
    authDomain: "language-learner-7a159.firebaseapp.com",
    projectId: "language-learner-7a159",
    storageBucket: "language-learner-7a159.appspot.com",
    messagingSenderId: "494813479375",
    appId: "1:494813479375:web:388293ddfec8f3a19d12ba",
    measurementId: "G-4JGKB4WBR4",
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  // For more information on how to access Firebase in your project,
  // see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

  const [mode, setMode] = useState("home");
  verbMode = () => mode == "verb";
  homeMode = () => mode == "home";
  sentenceMode = () => mode == "sentence";

  return (
    <View style={styles.container}>
      {homeMode() && (
        <View>
          <Button
            onPress={() => {
              setMode("verb");
            }}
            title="Verb Mode"
          ></Button>
          <Button
            onPress={() => {
              setMode("sentence");
            }}
            title="Sentence Mode"
          ></Button>
        </View>
      )}
      {verbMode() && <Verbs db={db}></Verbs>}
      {sentenceMode() && (
        <View>
          <Text>HELLo</Text>
        </View>
      )}
      {!homeMode() && (
        <View
          style={{
            flex: 1,
          }}
        >
          <FontAwesome.Button
            name="home"
            size={48}
            color={"black"}
            backgroundColor={"white"}
            onPress={() => {
              setMode("home");
            }}
          />
        </View>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: "0",
    margin: "0",
  },
});
