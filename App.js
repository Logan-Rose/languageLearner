import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import verbs from "./verbs.json";
import words from "./words.json";
import sampleSentences from "./sample.json";
import { useState } from "react";

export default function App() {
  const tmp = "Logan";
  const frenchWords = Object.keys(words);
  const [french, setFrench] = useState("");
  const [english, setEnglish] = useState("");
  const [conjugation, setConjugation] = useState({});
  function updateWord() {
    const index = Math.floor(Math.random() * frenchWords.length);
    setFrench(frenchWords[index]);
    setEnglish(words[frenchWords[index]].english);
    setConjugation(words[frenchWords[index]].conjugation);
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={{ color: "black", fontSize: "48px" }}>{french}</Text>
        <Button
          style={{ backgroundColor: "red" }}
          title="Translation"
          color="#841573"
          onPress={() => {
            alert(`${french}: ${english}`);
          }}
        ></Button>
        <Button
          style={{ backgroundColor: "red" }}
          title="j"
          color="#841573"
          onPress={() => {
            alert(`${conjugation.j}`);
          }}
        ></Button>
        <Button
          style={{ backgroundColor: "red" }}
          title="tu"
          color="#841573"
          onPress={() => {
            alert(`${conjugation.tu}`);
          }}
        ></Button>
      </View>
      <View>
        <Button
          style={{ backgroundColor: "red" }}
          title="Nouveau Mot"
          color="#841573"
          onPress={() => {
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
