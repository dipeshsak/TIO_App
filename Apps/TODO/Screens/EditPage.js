import React from 'react';
import { StyleSheet, Text, View , TouchableOpacity, Keyboard,AsyncStorage,Alert,TouchableWithoutFeedback,ScrollView} from 'react-native';
import {Form , Item , Input, Label,Button} from 'native-base'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

export default class EditContactScreen extends React.Component {
  state={
    time:"",
    todo:"",
    date:"",
    DTPVisibility:false,
    selectedVal:"Select Date/Time",
    key:"",

  }
  static navigationOptions = {
    title:" Edit Todo"
  }

  componentDidMount(){
    const {navigation} =this.props;
    navigation.addListener("willFocus",()=>{
      var key = this.props.navigation.getParam("key","")
      // ToDo
       this.getTodo(key)
    })
  }

  getTodo = async key =>{
    await AsyncStorage.getItem(key)
    .then(todoJsonString=>{
      var todoData =JSON.parse(todoJsonString)
      //set key in object
      todoData["key"]=key
      //set state
      this.setState(todoData)
    })
    .catch(error=>{
      console.log(error)
    })
  }

  updateTodo = async key =>{
    if(
      this.state.todo !== ""
    ){
      var todoData={
        todo:this.state.todo,
        time:this.state.time,
        date:this.state.date,
        desc:this.state.desc
      }
      await AsyncStorage.mergeItem(key,JSON.stringify(todoData))
      .then(
        ()=>{
          this.props.navigation.goBack()
        }
      )
      .catch(error=>{
        console.log(error)
      })
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
    <TouchableWithoutFeedback
    onPress={
      Keyboard.dismiss
    }>
    <ScrollView style={styles.container}>
      <Form>
        <Item style={styles.inputItem}>
          <Label style={styles.labelStyle}>Todo : </Label>
            <Input
              // style={styles.inputStyle}
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="default"
              onChangeText={
                todo=>this.setState({
                  todo
                })
              }
              value={
                this.state.todo
              }
            />
        </Item>
        {/* <Item style={styles.inputItem}>
          <Label>Date : </Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="default"
              onChangeText={
                date=>this.setState({
                  date
                })
              }
              value={
                this.state.date
              }
            />
            
        </Item> */}
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
          <Label style={styles.labelStyle}>Description  : </Label>
            <Input
            // style={styles.inputStyle}
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="default"
              onChangeText={
                desc=>this.setState({
                  desc
                })
              }
              value={
                this.state.desc
              }
            />
        </Item>
      </Form>
      
      <Button
      full
      rounded
      onPress={()=>this.updateTodo(this.state.key)}
      style={styles.button}
      ><Text style={styles.buttonText}>Update</Text></Button>
      <View style={styles.scrollview}></View>
    </ScrollView>
    </TouchableWithoutFeedback>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10
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
  scrollview:{
    height:50
  },
  datePickstyle:{
    top:'23%',
    fontSize:20,
    color:"black",
    //backgroundColor:'white'
  },
  labelStyle:{
    color:"black",
    fontWeight:'bold'
    //laceholderTextColor:"blue"
  },
  touchanleOpastyle:{
    width:200,
    height:45,
  },
  touchanleOpaText:{
    fontSize:18,
    top:10,
    color:'teal'
  }
});
