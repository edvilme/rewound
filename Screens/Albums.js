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

import {UIListView, UIProgressBar, UISlider, UICoverflow} from '../UIElements'

export default class ScreenAlbums extends React.Component{
    constructor(){
        super()
    }
    onChange(direction){
        this.coverflow.onChange(direction)
    }
    render(){
        return(
            <UICoverflow content={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]} ref={elem=>{this.coverflow = elem}}></UICoverflow>
        )
    }
}