import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Modal,
  TouchableHighlight,
  TextInput,
  AsyncStorage,
} from "react-native";

import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";

import {
  useFonts,
  Lato_400Regular,
  Lato_400Regular_Italic,
} from "@expo-google-fonts/lato";
import { AntDesign } from "@expo/vector-icons";

export default function App() {
  const image = require("./assets/bg.jpg");
  const [tarefas, setTarefas] = useState([{ id: 1, tarefa: "showws" }]);
  const [modal, setModal] = useState(true);
  const [tarefaAtual, setTarefaAtual] = useState("");

  useEffect(() => {
    (async () => {
      try {
        let tarefaList = await AsyncStorage.getItem("listaTarefas");
        if (tarefaList != null) {
          console.log(tarefaList);
          tarefaList = JSON.parse(tarefaList);
          console.log(tarefaList);
          setTarefas(tarefaList);
        }
      } catch (error) {}
    })();
  }, []);

  const adicionarTarefa = () => {
    let id = tarefas.length + 1;
    if (tarefaAtual != "") {
      var newTarefa = { id: id, tarefa: tarefaAtual };
      setTarefas([...tarefas, newTarefa]);
      setarTarefa(newTarefa);
      //console.log(tarefas);
    }
    setModal(!modal);
    setTarefaAtual("");
  };

  const setarTarefa = async (newTarefa) => {
    try {
      await AsyncStorage.setItem(
        "listaTarefas",
        JSON.stringify([...tarefas, newTarefa])
      );
      //console.log("**********");
    } catch (error) {
      //
    }
  };

  const setarNovaListaTarefas = async (newTarefa) => {
    try {
      await AsyncStorage.setItem("listaTarefas", JSON.stringify(newTarefa));
      console.log("**********");
    } catch (error) {
      //
    }
  };

  const deletarTarefa = (tarefa) => {
    var newTarefas = tarefas.filter((value) => {
      return value.id != tarefa.id;
    });
    alert(`Tarefa ${tarefa.id} deletada com sucesso`);
    setTarefas(newTarefas);
    setarNovaListaTarefas(newTarefas);
  };

  const listTarefas = () => {
    return tarefas.map((value, key) => {
      return (
        <View style={styles.tarefaSingle} key={key}>
          <View
            style={{
              flex: 1,
              width: "100%",
              padding: 10,
              alignItems: "center",
            }}
          >
            <Text>{value.tarefa}</Text>
          </View>
          <View style={{ flex: 1, alignItems: "center", padding: 10 }}>
            <TouchableOpacity>
              <AntDesign
                name="minuscircleo"
                size={24}
                color="#f00"
                onPress={() => deletarTarefa(value)}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    });
  };

  const [fontsLoad] = useFonts({
    Lato_400Regular,
    Lato_400Regular_Italic,
  });

  if (!fontsLoad) {
    return <AppLoading />;
  }

  /* Renderização */

  return (
    <ScrollView style={{ flex: 1 }}>
      <StatusBar hidden style="light" />
      <Modal
        animationType="slide"
        transparent={true}
        visible={!modal}
        onRequestClose={() => {
          alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.textAreaContainer}>
              <TextInput
                autoFocus={true}
                multiline={true}
                numberOfLines={4}
                style={styles.textArea}
                onChangeText={(text) => {
                  setTarefaAtual(text);
                }}
              ></TextInput>
            </View>

            <TouchableHighlight
              style={{
                ...styles.openButton,
                backgroundColor: "#2196F3",
                marginTop: 260,
              }}
              onPress={() => {
                setModal(!modal);
              }}
              onPress={() => {
                adicionarTarefa();
              }}
            >
              <Text style={styles.textStyle}>Salvar tarefa</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <ImageBackground source={image} style={styles.header}>
        <View style={styles.coverView}>
          <Text style={styles.textHeader}>App Lista de Tarefas</Text>
        </View>
      </ImageBackground>
      {listTarefas()}
      <View>
        <TouchableOpacity style={styles.areaBtnAdicionarTarefas}>
          <Text
            style={styles.btnAdicionarTarefa}
            onPress={() => {
              setModal(!modal);
            }}
          >
            Adicionar tarefa
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 80,
    resizeMode: "cover",
  },
  textHeader: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Lato_400Regular_Italic",
    marginTop: 30,
  },
  coverView: {
    width: "100%",
    height: 80,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  tarefaSingle: {
    width: "100%",
    marginTop: 30,
    backgroundColor: "#fff",
    borderBottomColor: "#000",
    flexDirection: "row",
    borderBottomWidth: 1,
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
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 20,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  textArea: {
    paddingRight: 100,
  },
  btnAdicionarTarefa: {
    backgroundColor: "#069",
    width: "50%",
    textAlign: "center",
    padding: 14,
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    borderRadius: 10,
  },
  areaBtnAdicionarTarefas: {
    alignItems: "center",
    marginTop: 20,
  },
});
