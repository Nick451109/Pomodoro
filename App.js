import { StatusBar } from "expo-status-bar";
import { SafeAreaView, TouchableOpacity } from "react-native-web";
import { useEffect, useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View,
  Button, 
  Platform
} from "react-native";
import Header from "./src/components/Header";
import Timer from "./src/components/Timer";
import {Audio} from "expo-av";

const colors = ["#F7DC6F", "#A2D9CE", "#D7BDE2"];

export default function App() {
  //"isWorking" sera falso por defecto
  //"setIsWorking" es la funcion la cual llamaré y enviare como parammetro el estado nuevo que deseo (true o false)
  //usestate solo es el nombre del hook junto con el estado por defecto que quiero que tenga "isWorking"

  const [isWorking, setIsWorking] = useState(false);

  //variable para mantener el tiempo que llevamos 
  //25 * 60 me da los segundos que tiene 25 minutos
  const [time, setTime] = useState(25 * 60);

  //en que "tiempo" estamos (break, short break etc)
  const[currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK");

  //variable que utilzia el boton para empezar o parar el timer 
  const [isActive, setIsActive] = useState(false);

  //ciclos de vida de un componente
  //toma 2 parametros, una callback y un array de dependencias
  //effecct solo activara si los valores dentro del array cambian
  useEffect(() => {
    let interval = null;

    if(isActive){
      //correr el timer
      interval = setInterval(()=>{
        setTime(time -1 );
      }, 1000);
    } else{
      //limpiar el intervalo
      clearInterval(interval);
    }

    //cuando llegue a 0, que se pare todo
    if (time === 0){
      setIsActive(false);
      //acceder al estado previo
      setIsWorking((prev) => !prev);
      setTime(isWorking?300:1500);
    }

    return()=>clearInterval(interval);
  }, [isActive, time]);

  function handleStartStop(){
    //es igual a lo contrario que teniamos antes
    //si el boton estaba en true, al darle click será false
    //si el boton estaba en start, al darle click, será stop
    playSound();
    setIsActive(!isActive);
  }

  //sonido de boton
  //debemos esperar a que se cargue el audio antes de poder tocarlo
  async function playSound(){
    const {sound} = await Audio.Sound.createAsync(
      require("./assets/click.mp3")
    );
    await sound.playAsync();
  }

  return (
    //safe area solo para IOS 
    //paddingtop solo para android
    //statusbar, barra de hora, bateria etc (light, dark..)
    //<Header /> es mi componente
    //se pondra un color de fondo dependiendo del indice de "tiempo" en el cual nos encontremos

    //se aplican componentes:
    //Header, Timer
    <SafeAreaView style={[styles.container, {backgroundColor: colors[currentTime]}]}>
      <View style={{
        flex:1,
        paddingHorizontal:15, 
        paddingTop: Platform.OS==="android" && 30
        }}>
        <Text style={styles.text}>Pomodoro</Text>
        
        <Header 
        currentTime={currentTime} 
        setCurrentTime = {setCurrentTime}
        setTime={setTime}
        />

        <Timer time={time}/>

        <TouchableOpacity 
        onPress={handleStartStop}
        style={styles.button}>
          <Text style={{color:"white", fontWeight:"bold"}}>{isActive? "STOP":"START"}</Text>
        </TouchableOpacity>
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
  button:{
    alignItems:"center",
    backgroundColor:"#333333",
    padding:15,
    marginTop: 15,
    borderRadius:15,
  }
});
