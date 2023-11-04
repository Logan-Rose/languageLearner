import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, Modal, Pressable } from "react-native";
import verbs from "../verbs.json";
import words from "../words.json";
import sampleSentences from "../sample.json";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { useState } from "react";

export default function Verbs(props) {
  const frenchWords = Object.keys(words);
  const [french, setFrench] = useState("");
  const [english, setEnglish] = useState("");
  const [conjugation, setConjugation] = useState({});

  const [modalVisible, setModalVisible] = useState(false);

  async function updateWord() {
    const verbRef = collection(props.db, "Verbs");
    const q = query(verbRef, orderBy("English", "desc"), limit(1));
    const dbWords = await getDocs(q)
      .then((querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push(doc.data());
        });
        return docs;
      })
      .catch((e) => {
        console.log(e);
      });
    console.log(dbWords);
    // const index = Math.floor(Math.random() * frenchWords.length);
    // setFrench(frenchWords[index]);
    // setEnglish(words[frenchWords[index]].english);
    // setConjugation(words[frenchWords[index]].conjugation);
    const dbWord = dbWords[0];
    setConjugation(dbWord["Present"]);
    setFrench(dbWord["French"]);
    setEnglish(dbWord["English"]);
    // setConjugation(words[frenchWords[index]].conjugation);
  }

  function pressButton(eng, fr) {
    setFrench(fr);
    setEnglish(eng);
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: "space-around",
          height: "50%",
        }}
      >
        <View
          style={{
            width: 300,
            display: "flex",
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "black", textAlign: "center" }}>{french}</Text>
          <Button
            style={{ backgroundColor: "red" }}
            title="Translation"
            color="#841573"
            onPress={() => {
              pressButton(`${french}: ${english}`);
            }}
          ></Button>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: 300,
            alignSelf: "center",
          }}
        >
          <View
            style={{
              display: "flex",
              flex: 1,
            }}
          >
            {conjugation &&
              Object.keys(conjugation).map((key) => (
                <Button
                  key={key}
                  title={key}
                  color="#841573"
                  onPress={() => {
                    pressButton(key, conjugation[key]);
                  }}
                ></Button>
              ))}
          </View>
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
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 6,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
