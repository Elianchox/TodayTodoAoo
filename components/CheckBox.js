import * as React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default function Checkbox({
    id,
    text,
    status,
    isToday,
    hour
}){
    return isToday ? (
        <TouchableOpacity style={status ? styles.checked : styles.unChecked}>
            {status && <Entypo name='check' size={16} color='#FAFAFA'></Entypo>}
        </TouchableOpacity>
    ) : (
        <View style={styles.isToday}/>
    )
}

const styles = StyleSheet.create({
    checked:{
        width:20,
        height:20,
        marginLeft:15,
        marginRight:13,
        borderRadius:6,
        backgroundColor:'#262626',
        alignItems:'center',
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:2
        },
        shadowOpacity:.3,
        shadowRadius:5,
        elevation:5,
    },
    unChecked:{
        width:20,
        height:20,
        marginLeft:15,
        marginRight:13,
        borderRadius:6,
        borderColor:'#E8E7E8',
        backgroundColor:'#fff',
        alignItems:'center',
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:2
        },
        shadowOpacity:.3,
        shadowRadius:5,
        elevation:5,
    },
    isToday:{
        width:10,
        height:10,
        marginHorizontal:10,
        borderRadius:10,
        backgroundColor: '#262626',
        marginRight:13,
        marginLeft: 15,
    }
})