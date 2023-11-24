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
    setAnswered(false)
    // setConjugation(words[frenchWords[index]].conjugation);
  }

  function pressButton(subject, fr) {
    if(answered == false){
      setDisplayedWord(english)
      setAnswered(true)
    }
  }
  
  const responseStyle= {
    backgroundColor: "grey",
    margin: 6,
    flexGrow: 1,
    padding:4,
    borderRadius: 8
  }

  function submitFeedback(val){
   console.log(val)
   updateWord() 
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
        }}
      >
        <View
          style={{
            width: 375,
            height: 625,
            backgroundColor: '#484848',
            borderRadius: 16,
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
                flexGrow: 5,
                backgroundColor: "#484848",
                borderRadius: 18
            }}
            onPress={() => {
              pressButton(`${french}: ${english}`);
            }}
          >
            <Text style={{fontSize: 24, color: "white"}}>{displayedWord}</Text>
          </Pressable>
          <View style={{flexGrow: 1, flexGrow: 1}}>
            { answered &&
              <View style={{ flexGrow: 1, flexDirection: "row", justifyContent: "space-between"}}>
                <Pressable onPress={() =>{submitFeedback(0)}} style={{...responseStyle, backgroundColor: "#FF6666"}}>
                  <Text></Text>
                </Pressable>
                <Pressable onPress={() =>{submitFeedback(1)}} style={{...responseStyle, backgroundColor: "#FFB266"}}>
                  <Text></Text>
                </Pressable>
                <Pressable onPress={() =>{submitFeedback(2)}} style={{...responseStyle, backgroundColor: "#FFFF66"}}>
                  <Text></Text>
                </Pressable>
                <Pressable onPress={() =>{submitFeedback(3)}} style={{...responseStyle, backgroundColor: "#B2FF66"}}>
                  <Text></Text>
                </Pressable>
              </View> 
            }
          </View>
        </View>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 6,
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#383838",
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
