import React from 'react';
import { StyleSheet, Text, View,Keyboard,AsyncStorage,Alert,TouchableWithoutFeedback,ScrollView } from 'react-native';
import { Form, Item,Input,Label,Button } from 'native-base'
import {DatePicker} from 'react-native-propel-kit';

export default class AddNewContactScreen extends React.Component {
  state={
    time:"",
    todo:"",
    date:"",
    desc:"",
    selDate:new Date(),
  }
  static navigationOptions = {
    title:"Add ToDo Task"
  }

  saveToDo = async() =>{
    if(
      this.state.time !== ""&&
      this.state.todo !== ""
    ){
      //create Todo object
      var todos={
        time:this.state.time,
        todo:this.state.todo,
        date:this.state.date,
        desc:this.state.desc
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
      Alert.alert("All Feilds are required ! ")
    }
   // console.log("test,",this.state.todo)
  }
  setDate=(date)=>{
    this.setState({
      date:date.toString().substring(0, 15)
    })

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
           placeholder="Do Gym"
           onChangeText={todo=>this.setState({todo})}
          />
        </Item>
        <Item style={styles.inputItem}>
          <Label style={styles.labelStyle}>Date : </Label>
          <DatePicker style={styles.datePickstyle}  
          placeholder="03/01/2020"
          color='grey'
           onChange={this.setDate} />
        </Item>
        <Item style={styles.inputItem}>
          <Label style={styles.labelStyle}>Time : </Label>
          <Input 
           autoCorrect={false}
           autoCapitalize="none"
           keyboardType="default"
           placeholder="12:00 (24 hr Time)"
           onChangeText={time=>this.setState({time})}
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
  }
});
