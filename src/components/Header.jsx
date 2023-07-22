import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const options =["Pomodoro","Short break", "Long break"];

export default function Header({time}){
    return(
        <View style={{flexDirection:"row"}}>
            {options.map((item, index)=>
                <TouchableOpacity key = {index} style={styles.itemStyle}>
                    <text>{item}</text>
                </TouchableOpacity>
                )}
            <Text>{time}</Text>
        </View>
    );
}

//crear estilos propios
//hoja de estilos de react native la cual toma un objeto de clases
const styles = StyleSheet.create({
    itemStyle:{
        width: "33%",
        borderWidth: 3,
        padding: 5,

    }
})