import React from 'react';
import { StyleSheet, Text, View,Keyboard,AsyncStorage,Alert,TouchableWithoutFeedback,TouchableOpacity,ScrollView } from 'react-native';
import { Form, Item,Input,Label,Button } from 'native-base'

import DateTimePickerModal from 'react-native-modal-datetime-picker'

export default class AddNewContactScreen extends React.Component {
  state={
    time:"",
    todo:"",
    date:"",
    desc:"",
    DTPVisibility:false,
    selectedVal:"Select Date/Time",
    completed:false,
  }
  static navigationOptions = {
    title:"Add ToDo Task"
  }

  saveToDo = async() =>{
    if(
      this.state.todo !== ""
    ){
      //create Todo object
      var todos={
        time:this.state.time,
        todo:this.state.todo,
        date:this.state.date,
        desc:this.state.desc,
        completed:this.state.completed,
      }
      await AsyncStorage.setItem(Date.now().toString(),
      JSON.stringify(todos)
      )
      .then(
        ()=>{
          this.props.navigation.goBack();
        }
      )
      .catch(error =>{
        console.log(error)
      })
    }
    else{
      Alert.alert("Please fill the Task !")
    }
  }
  handleConfirm =(date)=>{
     this.setState({
       selectedVal:date.toString(),
       DTPVisibility:false,
       date:date.toString().substring(0,15),
       time:date.toString().substring(16,21)
     })
  }

  onPressCancel=()=>{
    this.setState({DTPVisibility:false})
  }
  onPressButton=()=>{
    this.setState({DTPVisibility:true})
  }
  render(){
  return (
    <ScrollView>
    <TouchableWithoutFeedback
       onPress={
         ()=>{
           Keyboard.dismiss
         }
       }
    >
    <View style={styles.container}>
      <Form style={styles.container}>
        <Item style={styles.inputItem}>
        {/* <Icon active name='task' /> */}
          <Label style={styles.labelStyle}>Task : </Label>
          <Input 
           autoCorrect={false}
           autoCapitalize="none"
           keyboardType="default"
           placeholder="Eg. Do Gym"
           onChangeText={todo=>this.setState({todo})}
          />
        </Item>
        <Item style={styles.inputItem}>
          <Label style={styles.labelStyle}>Date/Time : </Label>
            <TouchableOpacity
            style={styles.touchanleOpastyle}
            onPress={this.onPressButton}
            >
            <Text style={styles.touchanleOpaText}>{this.state.selectedVal.toString().substring(0,21)}</Text>
            </TouchableOpacity>
          <DateTimePickerModal 
            isVisible={this.state.DTPVisibility}
            onConfirm={this.handleConfirm}
            onCancel={this.onPressCancel}
            mode="datetime"
          />
        </Item>
        <Item style={styles.inputItem}>
          <Label style={styles.labelStyle}>Description : </Label>
          <Input 
           autoCorrect={false}
           autoCapitalize="none"
           keyboardType="default"
           placeholder="Add Description here"
           onChangeText={desc=>this.setState({desc})}
          />
        </Item>  
      </Form>
        {/* <Text>Selected Date/Time : {this.state.selectedVal}</Text> */}
      <Button 
      style={styles.button}
      full
      onPress={
        ()=>{
          this.saveToDo()
        }
      }
      >
        <Text style={styles.buttonText}>
        Save
        </Text>
        </Button>
    </View>
    </TouchableWithoutFeedback>
    </ScrollView>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10,
    height: 500
  },
  inputItem: {
    margin: 10
  },
  button: {
    backgroundColor: "teal",
    marginTop: 40
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  },
  empty: {
    height: 500,
    backgroundColor: "#FFF"
  },
  datePickstyle:{
    top:'23%',
    fontSize:20,
    color:"teal",
    //backgroundColor:'white'
  },
  inputStyle:{
    color:'grey'
  },
  labelStyle:{
    color:"black",
    fontWeight:'bold'
    //laceholderTextColor:"blue"
  },
  touchanleOpastyle:{
    width:"100%",
    height:45,
  },
  touchanleOpaText:{
    fontSize:18,
    top:10,
    color:'teal'
  }
});
