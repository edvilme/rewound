import React from 'react';
import {
    StyleSheet,
    Animated,
    PanResponder,
    Dimensions,
    View,
    Text
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';




export class UIListViewItem extends React.Component{
    constructor(){
        super();
    }

    render(){
        return(
            <View style={[styles.ListViewItem, {backgroundColor: this.props.selected ? 'rgb(0,122,255)' : 'white'}]}>
                <Text style={[styles.ListViewItemText, {color: this.props.selected ? 'white' : 'black'}]}>{this.props.text}</Text>    
            </View>
        )
    }
}

export class UIListView extends React.Component{
    constructor(){
        super();
        this.state = {
            selectedIndex: 0,
        }
    }

    onChange(direction){
        if(direction == 'positive'){
            if( this.state.selectedIndex < this.props.content.length-1 ){
                this.state.selectedIndex+=1
            }
        } else {
            if( this.state.selectedIndex >= 1 ){
                this.state.selectedIndex-=1
            } else if (this.state.selectedIndex == 0){
                this.state.selectedIndex = 0
            }
        }
        this.props.onChangeSelectedIndex( this.props.content[ this.state.selectedIndex ] )
    }
    render(){
        //this.updateSelectedIndex(this.props.clickWheelValue, this.props.content.length)
        return(
            
            <View>
            {
                this.props.content.map((l, i)=>(
                    <UIListViewItem text={l.text} selected={ i == this.state.selectedIndex }></UIListViewItem>
                ))
            }
            </View>
        )
    }
}
 
export class UIProgressBar extends React.Component{
    render(){
        return(
            <View style={styles.ProgressBar_Cont}>
                <Text style={{fontSize: 12}}>1:23</Text> 
                <View style={styles.ProgressBar}>
                    <View style={[styles.ProgressBar_Progress, {width: '80%'}]}></View>
                </View>
            </View>
        )
    }
}

export class UISlider extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedIndex: this.props.value ? this.props.value : 0
        }
    } 
    onChange(direction){
        if(direction == 'positive'){
            if( this.state.selectedIndex < this.props.max ){
                this.state.selectedIndex+=1
            }
        } else {
            if( this.state.selectedIndex >= 1 ){
                this.state.selectedIndex-=1
            } else if (this.state.selectedIndex == 0){
                this.state.selectedIndex = 0
            }
        }
    }
    render(){
        return(
            <View style={styles.ProgressBar_Cont}>
                <Text style={{fontSize: 12}}>Vol.</Text> 
                <View style={styles.ProgressBar}>
                    <View style={[styles.ProgressBar_Progress, {width: `${(this.state.selectedIndex/this.props.max)*100}%`}]}></View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    ListViewItem: {
        padding: 8,
    },
    ListViewItemText: {
        fontSize: 16
    },
    ProgressBar_Cont: {
        flexDirection: 'row', alignContent: 'center', alignItems: 'center', padding: 16
    },
    ProgressBar: {
        margin: 8,
        flex: 1, 
        height: 20,
        backgroundColor: '#F0F0F0'
    }, 
    ProgressBar_Progress: {
        backgroundColor: 'black',
        height: '100%',
        width: '80%'
    }
})