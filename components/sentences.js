import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, Modal, Pressable } from "react-native";
import words from "../words.json";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { useState } from "react";

export default function Sentences(props) {
  const frenchWords = Object.keys(words);
  const [french, setFrench] = useState("");
  const [conjugatedFrench, setConjugatedFrench] = useState("");
  const [english, setEnglish] = useState("");
  const [conjugation, setConjugation] = useState({});
  const [displayedWord, setDisplayedWord] = useState("");
  const [answered, setAnswered] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);

  async function updateWord() {
    const verbRef = collection(props.db, "Common words");
    const q = query(verbRef, orderBy("English", "desc"), limit(1));
    console.log('L:OGAN')
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
    console.log('fffffff')
    console.log(dbWords);

    // const index = Math.floor(Math.random() * frenchWords.length);
    // setFrench(frenchWords[index]);
    // setEnglish(words[frenchWords[index]].english);
    // setConjugation(words[frenchWords[index]].conjugation);
    const dbWord = dbWords[0];
    setConjugation(dbWord["Present"]);
    setFrench(dbWord["French"]);
    setEnglish(dbWord["English"]);
    setDisplayedWord(dbWord["French"]);
    // setConjugation(words[frenchWords[index]].conjugation);
  }

  function pressButton(subject, fr) {
    if(answered == false){
      setDisplayedWord(english)
      setAnswered(true)
    } else {
      setAnswered(false)
     updateWord();
    }
  }
  
  const responseStyle= {
    backgroundColor: "grey",
    margin: 6,
    padding:4 
  }

  return (
    <View style={styles.container}>
      <Modal visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalHeader}>{french}</Text>
            <Text style={styles.modalText}>{conjugatedFrench}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
          <Pressable
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 12,
                paddingHorizontal: 32,
                borderRadius: 4,
                elevation: 3,
                width: 300,
                height: 300,
                backgroundColor: "gray",
                borderRadius: 18
            }}
            onPress={() => {
              pressButton(`${french}: ${english}`);
            }}
          >
          <Text style={{fontSize: 24, color: "white"}}>{displayedWord}</Text>
        </Pressable>
        </View>
        { answered && <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
          <Pressable style={responseStyle}>
            <Text>Hardest</Text>
          </Pressable>
          <Pressable style={responseStyle}>
            <Text>Harder</Text>
          </Pressable>
          <Pressable style={responseStyle}>
            <Text>Hard</Text>
          </Pressable>
          <Pressable style={responseStyle}>
            <Text>alright</Text>
          </Pressable>
          <Pressable style={responseStyle}>
            <Text>easy</Text>
          </Pressable>
          <Pressable style={responseStyle}>
            <Text>easiest</Text>
          </Pressable>
        </View> }
        <View>
          <Button
            style={{ backgroundColor: "red" }}
            title="Nouvelle Mot"
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalText: {
    fontSize: 32,
    marginBottom: 15,
    textAlign: "center",
  },
});
