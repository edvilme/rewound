import React from 'react';
import {
    StyleSheet,
    Animated,
    PanResponder,
    Dimensions,
    View,
    Text,
    ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';




export class UIListViewItem extends React.Component{
    constructor(){
        super();
    }

    render(){
        return(
            <View style={[styles.ListViewItem, {backgroundColor: this.props.selected ? 'rgb(0,122,255)' : 'white'}]} onLayout={event=>{
                this.props.onLayout(event)
            }}>
                <Text style={[styles.ListViewItemText, {color: this.props.selected ? 'white' : 'black'}]}>{this.props.text}</Text>    
            </View>
        )
    }
}

export class UIListView extends React.Component{
    constructor(){
        super();
        this.arr = []
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
        this.scroll.scrollTo({
            x: 0,
            y: 16*this.state.selectedIndex, 
            animated: true
        })
        this.props.onChangeSelectedIndex( this.props.content[ this.state.selectedIndex ] )
    }
    render(){
        //this.updateSelectedIndex(this.props.clickWheelValue, this.props.content.length)
        return(
            
            <ScrollView ref={elem=>{this.scroll = elem}} scrollEnabled={false}>
            {
                this.props.content.map((l, i)=>(
                    <UIListViewItem text={l.text} selected={ i == this.state.selectedIndex } onLayout={event=>{
                        const layout = event.nativeEvent.layout;
                        this.arr[i] = layout.x
                    }}></UIListViewItem>
                ))
            }
            </ScrollView>
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
        this.props.onUpdate( this.state.selectedIndex )
    }
    render(){
        return(
            <View style={styles.ProgressBar_Cont}>
                <Text style={{fontSize: 12}}>Vol. {this.state.selectedIndex}</Text> 
                <View style={styles.ProgressBar}>
                    <View style={[styles.ProgressBar_Progress, {width: `${(this.state.selectedIndex/this.props.max)*100}%`}]}></View>
                </View>
            </View>
        )
    }
}

export class UICoverflow extends React.Component{
    constructor(){
        super();
        this.state={
            selectedIndex: 0
        }
        this.range = 8
    }
    
    f(x){        
        let a = this.range.toFixed(0);
        let b = this.state.selectedIndex.toFixed(0);
        let c = b - (a/2)
        let result = (-4/(a**2))*((x - c)**2 - a*( x - c ))
        return result < 0.2 ? 0: result**2
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
        this.scroll.scrollTo({y: 0, x: 196*this.state.selectedIndex-90+24})
        this.forceUpdate()
        //this.props.onUpdate( this.state.selectedIndex )
    } 

    render(){
        return(
            <ScrollView ref={elem=>{this.scroll = elem}} horizontal scrollEnabled={false} contentContainerStyle={{alignContent: 'center', alignItems: 'center', justifyContent: 'center'}}>
                {
                    this.props.content.map((l, i)=>{
                        return( <View style={{ width: 180, height: 180, backgroundColor: 'black', margin: 8, 
                        borderColor: i==this.state.selectedIndex ? 'blue' : 'black', 
                        borderWidth: i==this.state.selectedIndex ? 2 : 0,
                        transform: [
                            { scale: this.f(i) }
                        ]

                        }}></View> )
                    })
                }
            </ScrollView>
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