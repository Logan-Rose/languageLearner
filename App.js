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
  // For more information on how to access Firebase in your project,
  // see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  // addDoc(collection(db, "Verbs"), {
  //   first: "Alan",
  //   middle: "Mathison",
  //   last: "Turing",
  //   born: 1912,
  // })
  //   .then((docRef) => {
  //     console.log("Document written with ID: ", docRef.id);
  //   })
  //   .catch((error) => {
  //     console.error("Error adding document: ", error);
  //   });

  // getDocs(collection(db, "Verbs")).then((querySnapshot) => {
  //   querySnapshot.forEach((doc) => {
  //     console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
  //   });
  // });
  // listCollections(collection(db)).then((querySnapshot) => {
  //   querySnapshot.forEach((doc) => {
  //     console.log("~~~~~~~~~~");
  //     console.log(doc);
  //     console.log("~~~~~~~~~~");
  //   });
  // });

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
              alert(`${french}: ${english}`);
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
            <Button
              style={{ backgroundColor: "red" }}
              title="il/elle"
              color="#841573"
              onPress={() => {
                alert(`${conjugation.il}`);
              }}
            ></Button>
          </View>
          <View
            style={{
              display: "flex",
              borderStyle: "solid",
              flex: 1,
            }}
          >
            <Button
              style={{ backgroundColor: "red" }}
              title="nous"
              color="#841573"
              onPress={() => {
                alert(`${conjugation.nous}`);
              }}
            ></Button>
            <Button
              style={{ backgroundColor: "red" }}
              title="vous"
              color="#841573"
              onPress={() => {
                alert(`${conjugation.vous}`);
              }}
            ></Button>
            <Button
              style={{ backgroundColor: "red" }}
              title="ils/elles"
              color="#841573"
              onPress={() => {
                alert(`${conjugation.ils}`);
              }}
            ></Button>
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
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderStyle: "solid",
    borderColor: "green",
    borderWidth: "2px",
  },
});
