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

import {UIListView, UIProgressBar} from './UIElements'

import { Linking } from 'expo';

import ScreenNowPlaying from './Screens/NowPlaying'


export class StatusBar extends React.Component{
    constructor(){
        super()
    }
    
    render(){
        return(
            <LinearGradient style={styles.StatusBar} colors={['#EDF4FA', '#BDC4CA']}></LinearGradient>
        )
    }
}


export default class Screen extends React.Component{
    constructor(){
        super();
        this.history = []
        this.state = {
            current: 'ScreenMain'
        }
    }
    componentWillMount(){
    }

    onChange(direction){
        //console.log(direction)
        if(this.current.onChange){
            this.current.onChange(direction)
        }
    }
    onRelease(){
        if(this.current.onRelease){
            this.current.onRelease()
        }
    }
    onClick(){
        this.current.onClick()
    }
    changeScreen(newScreen){
        this.history.push(this.state.current)
        this.setState({
            current: newScreen
        })
    }
    goBack(){
        if(this.history.length>=1){
            this.setState({current: this.history.pop()})
        }
    }
    getScreen(){
        return {
            'ScreenMain': <ScreenMain clickWheelValue={this.props.clickWheelValue} ref={elem=>this.current=elem} onChangeScreen={screen=>this.changeScreen(screen)}></ScreenMain>,
            'ScreenNowPlaying': <ScreenNowPlaying clickWheelValue={this.props.clickWheelValue} ref={elem=>this.current=elem}></ScreenNowPlaying>,
            'ScreenMusic': <ScreenMusic clickWheelValue={this.props.clickWheelValue} ref={elem=>this.current=elem} onChangeScreen={screen=>this.changeScreen(screen)}></ScreenMusic>,
            'ScreenVideos': <ScreenVideos clickWheelValue={this.props.clickWheelValue} ref={elem=>this.current=elem}></ScreenVideos>,
            'ScreenPhotos': <ScreenPhotos clickWheelValue={this.props.clickWheelValue} ref={elem=>this.current=elem}></ScreenPhotos>,
        }
    }

    render(){
        return(
            <View style={styles.Screen}>
                <StatusBar></StatusBar>
                {this.getScreen()[this.state.current]}
            </View>
        )
    }
}


class ScreenMain extends React.Component{
    constructor(){
        super();
        this.state = {
            selectedIndex: {
                text: 'Now Playing', 
                screen: 'ScreenNowPlaying'
            }
        }
    }
    onChange(direction){
        //console.log(direction, "hi");
        this.menu.onChange(direction)
    }
    onClick(){
        if( this.state.selectedIndex.screen ){
            this.props.onChangeScreen( this.state.selectedIndex.screen )
        }
        if( this.state.selectedIndex.action ){
            this.state.selectedIndex.action()
        }
    }
    render(){
        return(
            <UIListView ref={(elem)=>{this.menu = elem}} clickWheelValue={this.props.clickWheelValue} 
                onChangeSelectedIndex={(item) => {
                    this.state.selectedIndex = item
                }}            
                content={[
                    {
                        text: 'Now Playing',
                        screen: 'ScreenNowPlaying'
                    },
                    {
                        text: 'Music',    
                        screen: 'ScreenMusic'
                    },
                    {
                        text: 'Videos',
                        screen: 'ScreenVideos'
                    },
                    {
                        text: 'Photos',
                        screen: 'ScreenPhotos'
                    },
                    {text: 'Podcasts'},
                    {text: 'Audiobooks'},
                    {text: 'Extras'},
                    {
                        text: 'Wait list',
                        action: ()=> {Linking.openURL('https://mailchi.mp/0bdb6bed638d/rewoundanroid')}
                    },
                    {
                        text: 'About (edvilme, v.0.9)',
                        action: ()=>{ Alert.alert("Hello world! Twitter: @edvilme") }
                    },
            ]}></UIListView>
        )
    }
}





class ScreenMusic extends React.Component{
    constructor(){
        super();
        this.state = {
            selectedIndex: null
        }
    }
    onClick(){
        //if( this.state.selectedIndex.screen ){
            //this.props.onChangeScreen( this.state.selectedIndex.screen )
            this.props.onChangeScreen( 'ScreenNowPlaying' )
        //}
    }
    render(){
        return(
            <UIListView  clickWheelValue={this.props.clickWheelValue} 
                onChangeSelectedIndex={(item) => {
                    this.state.selectedIndex = item
                }}            
                content={[
                    {text: 'Playlists'},
                    {text: 'Genres'},
                    {text: 'Albums'},
                    {text: 'Artists'},
            ]}></UIListView>
        )
    }
}

class ScreenMusicGenres extends React.Component{

}

class ScreenVideos extends React.Component{
    constructor(){
        super();
    }
    onClick(){

    }
    render(){
        return(
            <View>
                <Text>Videos</Text>
            </View>
        )
    }
}

class ScreenPhotos extends React.Component{
    constructor(){
        super();
    }
    onClick(){

    }
    render(){
        return(
            <View>
                <Text>Photos</Text>
            </View>
        )
    }
}





const styles = StyleSheet.create({
    StatusBar: {
        width: '100%',
        height: 30
    },
    Screen: {
        backgroundColor: 'white', 
        height: Dimensions.get('window').width*0.9, 
        width: Dimensions.get('window').width*0.9, 
        borderRadius: 20,
        margin: 16
    }
})