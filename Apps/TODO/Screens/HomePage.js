import React, { Component } from 'react'
import { StyleSheet, Text, View ,TouchableOpacity,FlatList,AsyncStorage } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Entypo } from '@expo/vector-icons';
import { Card } from 'native-base';
import _ from 'lodash';
export default class HomePage extends Component {
    state={
        data:[]
    }
    static navigationOptions = {
    title:"ToDo List"
  }
  componentDidMount(){
    
    const { navigation } =this.props;
    navigation.addListener("willFocus",()=>{
      this.getAllTodos();
    })
    
  }
  getAllTodos =async() =>{
    //collects all data
    
    await AsyncStorage.getAllKeys()
    .then(keys=>{
      return AsyncStorage.multiGet(keys)
      .then(
        result=>{
          this.setState({
            data:result
          })
        }
      )
      .catch(error=>{
        console.log(error)
      })
    })
    .catch(error =>{
      console.log(error)
    })

  }
    render() {
        //console.log("Render State data",this.state.data)
        return (
            <View style={styles.container}>
                <View style={styles.box1}>
                    <View style={styles.summaryBox}>
                       <View style={styles.totalTODO}>
                           <Text style={styles.TODOVal}>{this.state.data.length}</Text>
                           <Text style={styles.TODOText}>Total</Text>
                        </View>
                       <View style={styles.pendingTODO}>
                           <Text style={styles.TODOValPen}>2</Text>
                           <Text style={styles.TODOText}>Pending</Text>
                       </View>
                       <View style={styles.doneTODO}>
                           <Text style={styles.TODOValComp}>8</Text>
                           <Text style={styles.TODOText}>Completed</Text>
                       </View>
                    </View>
                </View>
                <View style={styles.box2}>
                    <FlatList 
                     data={this.state.data}
                     renderItem={( {item} ) => {
                        // let todo=JSON.parse(item);
                        let singleTodo=JSON.parse(item[1]);
                       // console.log("+++++++++++++++++++++ ITEM",item)
                     return (
                        <TouchableOpacity 
                        style={styles.todoItemBox}
                        onPress={()=>{
                          this.props.navigation.navigate("TODOView",{
                            key:item[0].toString()
                          })
                        }} >
                        <Card style={styles.listItem}>
                            <View style={styles.iconContainer}>
                              <Text style={styles.timeIcon}>{singleTodo.time ? singleTodo.time: <Text >N/A</Text> }</Text>   
                            </View> 
                            <View style={styles.infoContainer}>
                              <Text style={styles.infoTextTask}>
                              {singleTodo.todo}
                              </Text>
                              <Text style={styles.infoTextDate}>
                              {singleTodo.date ? singleTodo.date : <Text style={styles.notSelected}>Date/Time not selected</Text>}
                              </Text>
                            </View>
                            <View style={styles.infoTextIndicator} backgroundColor={singleTodo.completed ? "#45CE30":"#DFAF2B"}> 
                            </View> 
                        </Card>
                        </TouchableOpacity>
                      );
                    }
                }
            
                keyExtractor={(item,index)=>index.toString()}
                />
                </View>
                
                <TouchableOpacity
                       style={styles.floatButton}
                      onPress={()=>{
                    this.props.navigation.navigate("TODOCreate")
                        }}
                        >
                    <Entypo
                        name="plus"
                        size={30}
                       color="#fff"
                         />
                 </TouchableOpacity>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:'column',
    },
    box1:{
        flex:1/5,
        backgroundColor: 'teal',
    },
    summaryBox:{
        flexDirection:"row",
        alignItems:'center',
        justifyContent:"space-between",
        backgroundColor: 'white',
        borderColor:"teal",
        borderWidth:3,
        height:'80%',
        top:10,
        borderRadius:10,
    },
    totalTODO:{
      flex:1,
      backgroundColor:"#fff",
      alignItems:'center',
        justifyContent:"center",
    },
    pendingTODO:{
        flex:1,
        backgroundColor:"#fff",
        alignItems:'center',
        justifyContent:"center",

    },
    doneTODO:{
        flex:1,
        backgroundColor:"#fff",
        alignItems:'center',
        justifyContent:"center",
    },
    TODOVal:{
        fontSize:25,
        color:'teal',
        fontWeight:'bold'
    },
    TODOText:{
        fontWeight:'bold'
    },
    TODOValPen:{
      fontSize:25,
      color:'#DFAF2B',
      fontWeight:'bold',
    },
    TODOValComp:{
      fontSize:25,
      color:'#45CE30',
      fontWeight:'bold',
    },
    box2:{
        flex:1,
        backgroundColor: 'white',
    },
    listItem: {
        flexDirection: "row",
        padding: 20,
      },
      iconContainer: {
        width: 85,
        height: 55,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "teal",
        borderRadius: 100
      },
      timeIcon: {
        fontSize: 25,
        color: "#fff"
      },
      infoContainer: {
        flex:1,
        flexDirection: "column"
      },
      infoTextTask: {
        fontSize: 20,
        fontWeight: "400",
        paddingLeft: 10,
        paddingTop: 2
      },
      infoTextDate:{
        fontSize: 16,
        fontWeight: "400",
        paddingLeft: 10,
        paddingTop: 2
      },
      infoTextIndicator:{
          width:3,
          //backgroundColor:"#45CE30"//#45CE30 <--green #DFAF2B <--Yellow
      },
    floatButton: {
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.2)",
        alignItems: "center",
        justifyContent: "center",
        width: 55,
        position: "absolute",
        bottom: 15,
        right: 15 ,
        height: 55,
        backgroundColor: "teal",
        borderRadius: 100
      },
      notSelected:{
        color:'red'
      }
  });

