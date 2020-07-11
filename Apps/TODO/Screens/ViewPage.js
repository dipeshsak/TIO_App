import React from 'react';
import { StyleSheet, Text, View,ScrollView,TouchableOpacity,Linking,Platform,Alert,AsyncStorage,TouchableWithoutFeedback } from 'react-native';
import { Form, Item,Input,Label,Button,Card,CardItem} from 'native-base'
import { Entypo } from "@expo/vector-icons"
export default class ViewPage extends React.Component {
  state={
    time:"",
    todo:"",
    date:"",
    desc:"",
    key:"DummyKey"
  }
  static navigationOptions = {
    title:" View ToDo"
  }
  componentDidMount(){
    const { navigation } =this.props;
    navigation.addListener("willFocus",()=>{
      var key = this.props.navigation.getParam("key","");
      //TOdo : call a method to use  Key
      this.getTodos(key)
    })
  }

  getTodos= async key =>{
      //console.log("Keysssssssssssss",key)
    await AsyncStorage.getItem(key)
    .then(todojsonString =>{
      var todoData= JSON.parse(todojsonString);
      todoData["key"]=key;
      this.setState(todoData)
    })
    .catch(error=>{
      console.log(error)
    })
  }



  editTodo = key =>{
    this.props.navigation.navigate("TODOEdit",{key:key})
  }

  deleteTodo = key =>{
    Alert.alert(
      "Delete Todo ?",
      `${this.state.todo}`,
      [
        {
          text:"Cancel", onPress: ()=>console.log("Cancel Tapped")
        },
        {
          text:"OK" ,
          onPress : async ()=>{
            await AsyncStorage.removeItem(key)
            .then(()=>{
              this.props.navigation.goBack();
            })
            .catch(error=>{
              console.log(error)
            })
          }
        }
      ]
    )
  }
  render(){
      console.log("Key",this.state.key)
  return (
    
  <ScrollView style={styles.container}>
    <View style={styles.infoContainer}>
    <Card>
          <CardItem bordered>
             <Text style={styles.infoText}>
               Todo
             </Text>
          </CardItem>
          <CardItem bordered>
             <Text style={styles.infoTextVal}>
               {this.state.todo}
             </Text>
          </CardItem>
        </Card>

        <Card>
          <CardItem bordered>
             <Text style={styles.infoText}>
               Time
             </Text>
          </CardItem>
          <CardItem bordered>
             <Text style={styles.infoTextVal}>
               {this.state.time ? this.state.time : "  --"}
             </Text>
          </CardItem>
        </Card>

        <Card>
          <CardItem bordered>
             <Text style={styles.infoText}>
               Date
             </Text>
          </CardItem>
          <CardItem bordered>
             <Text style={styles.infoTextVal}>
               {this.state.date ? this.state.date : "  --"}
             </Text>
          </CardItem>
        </Card>

        <Card>
          <CardItem bordered>
             <Text style={styles.infoText}>
               Description
             </Text>
          </CardItem>
          <CardItem bordered>
             <Text style={styles.infoTextVal}>
               {this.state.desc ? this.state.desc :"  --"}
             </Text>
          </CardItem>
        </Card>
    </View>
    
     <Card style={styles.actionContainer}>
       <CardItem style={styles.actionButton} bordered>
         <TouchableOpacity
            onPress={()=>{
             this.editTodo(this.state.key)
            }}
         >
           <Entypo  
             name="edit"
             size={40}
             color="teal"
           />
           {/* <Text style={styles.actionText}>Edit</Text> */}
         </TouchableOpacity>
       </CardItem>

       <CardItem style={styles.actionButton} bordered>
         <TouchableOpacity
            onPress={()=>{
             this.deleteTodo(this.state.key)
            }}
         >
           <Entypo  
             name="trash"
             size={40}
             color="red"
           />
         </TouchableOpacity>
       </CardItem>

     </Card>
  </ScrollView>
    
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  infoText: {
    fontSize: 18,
    //fontWeight: "300",
    color:"black",
    fontWeight:'bold'
  },
  infoTextVal: {
    fontSize: 18,
    fontWeight: "300",
    
  },
  infoContainer:{
    flexDirection:"column"
  },
  actionContainer: {
    flexDirection: "row"
  },
  actionButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
});
