import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-web";
import { useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View,
  Button, 
  Platform
} from "react-native";
import Header from "./src/components/Header";

const colors = ["#F7DC6F", "#A2D9CE", "#D7BDE2"];

export default function App() {
  //"isWorking" sera falso por defecto
  //"setIsWorking" es la funcion la cual llamaré y enviare como parammetro el estado nuevo que deseo (true o false)
  //usestate solo es el nombre del hook junto con el estado por defecto que quiero que tenga "isWorking"

  const [isWorking, setIsWorking] = useState(false);

  //variable para mantener el tiempo que llevamos 
  //25 * 60 me da los segundos que tiene 25 minutos
  const [time, setTime] = useState(25 * 60);

  //en que tiempo estamos (break, short break etc)
  const[currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK");

  console.log(currentTime);

  return (
    //safe area solo para IOS 
    //paddingtop solo para android
    //statusbar, barra de hora, bateria etc (light, dark..)
    //<Header /> es mi componente
    <SafeAreaView style={styles.container}>
      <View style={{paddingTop: Platform.OS==="android" && 30}}>
        <Text style={styles.text}>Pomodoro</Text>
        <Header time={time}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
  },
});
