import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Dimensions,
  PanResponder,
  SafeAreaView,
  Alert,
  Linking
} from 'react-native';

import ClickWheel from './ClickWheel';
import Screen from './Screen';
 




export default class App extends React.Component{
  constructor(){
    super();
    this.state = {
      clickWheelValue: 0
    }
  }
  render(){
    return (
      <SafeAreaView style={styles.container}>

        <Screen clickWheelValue={this.state.clickWheelValue} ref={elem => this.screen = elem}></Screen>

        <ClickWheel
          onUpdateValue={(value)=>{
            this.setState({clickWheelValue: value})
          }}

          onMenuClick={()=>{
            this.screen.goBack()
          }}

          onClick={()=>{
            //Linking.openURL("https://mailchi.mp/0bdb6bed638d/rewoundanroid")
            this.screen.onClick();
          }}

         onChange={(direction)=>{
           this.screen.onChange(direction)
         }}
         onRelease={()=>{
           this.screen.onRelease()
         }}

        ></ClickWheel>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  ScrollWheel: {
    height: Dimensions.get('window').width*0.75,
    width: Dimensions.get('window').width*0.75,
    borderRadius: (Dimensions.get('window').width*0.75)/2,
    backgroundColor: '#303030'
  }, 
  
  
  container: {
    flex: 1,
    backgroundColor: '#303030',
    alignItems: 'center',
    justifyContent: 'center',
  },



});
