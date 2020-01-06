import React from 'react';
import {
  StyleSheet,
  Animated,
  PanResponder,
  View,
  Text,
  Alert,
  Platform
} from 'react-native';

import * as Haptics from 'expo-haptics';


class CenterButton extends React.Component{
    constructor(){
        super();
        this.panResponder;
    }
    componentWillMount(){
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                this.props.onClick();
                Platform.OS != 'web' ? Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium) : ()=>{}
            }
        })
    }
    render(){
        return(
            <View style={styles.CenterButton} {...this.panResponder.panHandlers}></View>
        )
    }
}

class SecondaryButton extends React.Component{
    constructor(){
        super();
        this.panResponder;
    }
    componentWillMount(){
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                this.props.onClick();
                Platform.OS != 'web' ? Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium) : ()=>{}
            }
        })
    }
    render(){
        return(
            <View style={[styles.SecondaryButton, this.props.style]} {...this.panResponder.panHandlers}></View>
        )
    }
}

export default class ClickWheel extends React.Component{

    getTouchAngle(x, y, r){
        return (Math.atan2((y-r), (x-r))*(180/Math.PI) + 180); 
    }

    constructor(props){
        super(props);
        this.panResponder;
        this.state = {
            initialAngle: 0,
            currentAngle: 0
        }
    }


    componentWillMount(){
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveSouldSetPanResponder: () => false,
            onPanResponderGrant: (evt, gesture) => {
                this.setState({
                    initialAngle: this.getTouchAngle(evt.nativeEvent.locationX, evt.nativeEvent.locationY, 150),
                    previousAngle: this.state.initialAngle,
                    deltaAngle: 0,
                })
            },
            onPanResponderMove: (evt, gesture) => {
                this.setState({
                    previousAngle: this.state.currentAngle,
                    currentAngle: this.getTouchAngle(evt.nativeEvent.locationX, evt.nativeEvent.locationY, 150),
                    deltaAngle: this.state.currentAngle - this.state.initialAngle < 0 ? 360 + this.state.currentAngle - this.state.initialAngle : this.state.currentAngle - this.state.initialAngle,
                    direction: this.state.currentAngle > this.state.previousAngle ? 'negative' : 'positive',
                })
                if( Math.abs(this.state.currentAngle - this.state.initialAngle) >= 20 ){
                    this.setState({
                        initialAngle: this.state.currentAngle
                    })
                    //console.log(this.state.direction)

                    Platform.OS != 'web' ? Haptics.selectionAsync() : ()=>{}
                    let updateValue = this.state.currentAngle - this.state.initialAngle < 0 ? 360 + this.state.currentAngle - this.state.initialAngle : this.state.currentAngle - this.state.initialAngle;
                    this.props.onUpdateValue( this.state.direction == 'positive' ? updateValue : -1*updateValue );
                    
                    this.props.onChange(this.state.direction)

                }
            },
            onPanResponderRelease: (evt, gesture) => {
                this.setState({
                    initialAngle: this.getTouchAngle(evt.nativeEvent.locationX, evt.nativeEvent.locationY, 150),
                    currentAngle: this.state.initialAngle,
                    previousAngle: this.state.initialAngle,
                    deltaAngle: 0
                })
                this.props.onRelease()

            }
        })
    }

    render(){
        return(
            <View style={styles.ClickWheel} {...this.panResponder.panHandlers}>
                <CenterButton onClick={()=>{ this.props.onClick() }}></CenterButton>
                <SecondaryButton onClick={()=>{ this.props.onMenuClick() }} style={{top: 0, left: 150-40}} ></SecondaryButton>
                <SecondaryButton onClick={()=>{  }} style={{top: 2*150-80, left: 150-40}} ></SecondaryButton>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    ClickWheel: {
        backgroundColor: '#E0E0E0', 
        height: 300, 
        width: 300, 
        borderRadius: 150,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    CenterButton:{
        backgroundColor: 'white',
        height: 140, 
        width: 140, 
        borderRadius: 70
    },
    SecondaryButton: {
        //backgroundColor: 'green',
        height: 80, 
        width: 80,
        borderRadius: 40,
        position: 'absolute',
    }
})