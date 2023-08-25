import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import verbs from "./verbs.json";
import { useState } from "react";

export default function App() {
  const tmp = "Logan";
  const frenchWords = Object.keys(verbs);
  const [french, setFrench] = useState("être");
  const [english, setEnglish] = useState("to be");

  function updateWord() {
    const index = Math.floor(Math.random() * frenchWords.length);
    setFrench(frenchWords[index]);
    setEnglish(verbs[frenchWords[index]]);
  }

  return (
    <View style={styles.container}>
      <View>
        <Button
          title={french}
          color="#841573"
          onPress={() => {
            alert(`${french}: ${english}`);
            updateWord();
          }}
        ></Button>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
