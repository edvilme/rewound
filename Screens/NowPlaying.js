import React from 'react';
import {
    StyleSheet,
    Animated,
    PanResponder,
    Dimensions,
    View,
    Text,
    Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import {UIListView, UIProgressBar, UISlider} from '../UIElements'

export default class ScreenNowPlaying extends React.Component{
    constructor(){
        super();
        this.state = {
            clickWheelActive:false, 
            volume: 0
        }
    }
    onClick(){
    }

    onChange(direction){
        console.log(direction, "now playing")

        this.setState({
            clickWheelActive: true
        });

        if(this.volumeSlider){
            this.volumeSlider.onChange(direction)
        }
    }

    onRelease(){
        setTimeout(()=>{
            this.setState({
                clickWheelActive: false,
            })
        }, 3000)
    }

    render(){
        return(
            <View style={{justifyContent: 'space-between', flex: 1}}>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    <View style={styles.albumArt}></View>
                    <View>
                        <Text style={styles.title}>Wake me up</Text>
                        <Text style={styles.details}>Avicii</Text>
                        <Text style={styles.details}>True</Text>
                    </View>
                </View>
                {
                    this.state.clickWheelActive ? <UISlider ref={(elem)=>{this.volumeSlider=elem}} max={10} onUpdate={value=>{ this.setState({volume: value}) }} value={this.state.volume}></UISlider>:<UIProgressBar></UIProgressBar>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 16, fontWeight: '800'
    }, 
    details: {
        fontSize: 16
    },
    albumArt: {
        width: Dimensions.get('window').width*0.4, 
        height: Dimensions.get('window').width*0.4, 
        backgroundColor: 'black', 
        margin: 16
    }
})