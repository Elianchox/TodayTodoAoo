import * as React from 'react';
import { View, StyleSheet, Text, BackHandler } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function Splash(){
    const navigation = useNavigation();

    React.useEffect(()=>{
        BackHandler.addEventListener('hardwareBackPress', ()=>{
            return true;
        });
        navigation.addListener('beforeRemove', (e)=>{
            return;
        })
    }, [])

    return(

        <View style={styles.constainer}>
            <LottieView
                style={styles.splash} source={require('../assets/splash.json')}
                autoPlay
                loop={false}
                autoSize
                speed={0.5}
                onAnimationFinish={()=>{
                    navigation.navigate("Home")
                }}
            >
                <Text style={styles.text}>TodayTask</Text>
                <FontAwesome5 name="pencil-alt" size={32} color="black" />
            </LottieView>

        </View>
    )
}

const styles = StyleSheet.create({
    constainer:{
        width:'100%',
        height:'100%',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#000'
    },
    text:{
        fontWeight:'600',
        marginTop:10,
        marginBottom:10,
        fontSize:42
    },
    splash:{
        justifyContent:'center',
        alignItems:'center',
        height:'100%'
    },
    picture:{
        width:40,
        height:40,
        borderRadius:30,
        alignSelf:'flex-end'
      },
})