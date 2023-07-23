import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const options =["Pomodoro","Short break", "Long break"];

export default function Header({currentTime, setCurrentTime, setTime}){

    function handlePress(index) {
        //asigno los minutos dependiendo del caso de tiempo
        const newTime = index === 0 ? 25: index === 1 ? 5 : 15;
        setCurrentTime(index);
        setTime(newTime * 60); 
    }

    return(
        <View style={{flexDirection:"row"}}>
            {options.map((item, index)=>(
                <TouchableOpacity 
                key = {index} 
                onPress={() => handlePress(index)} 
                //si el timepo es distinto al que seleccioné, ponlo transparente
                style={[styles.itemStyle,currentTime !== index && {borderColor: "transparent"}]}
                >

                    <Text style={{fontWeight:'bold'}}>{item}</Text>
                </TouchableOpacity>
                ))}
        </View>
    );
}

//crear estilos propios
//hoja de estilos de react native la cual toma un objeto de clases
const styles = StyleSheet.create({
    itemStyle:{
        width: "33%",
        alignItems: "center",
        borderWidth: 3,
        padding: 5,
        borderRadius: 10,
        borderColor: "white",
        marginVertical: 20,
    }
})