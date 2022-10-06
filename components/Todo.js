import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Checkbox from './CheckBox';

export default function Todo({
    id,
    text,
    status,
    isToday,
    hour
}){
    return(
        <View style={styles.container}>
            <Checkbox
                id={id}
                text={text}
                status={status}
                isToday={isToday}
                hour={hour}
            />
            <View>
                <Text style={status ? [styles.text, styles.statusTrue] : styles.text}>{text}</Text>
                <Text style={status ? [styles.hour, styles.statusTrue] : styles.hour}>{hour}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginBottom: 20,
        flexDirection:'row',
        alignItems:'center'
    },
    text:{
        fontSize:15,
        fontWeight:'500',
        color:'#767676',
    },
    hour:{
        fontSize:13,
        fontWeight:'500',
        color:'#969696',
    },
    statusTrue:{
        textDecorationLine: 'line-through',
        color:'#70707070'
    }
})
