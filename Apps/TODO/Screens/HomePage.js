import React, { Component } from 'react'
import { StyleSheet, Text, View ,TouchableOpacity,FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Entypo } from '@expo/vector-icons';
import { Card } from 'native-base';
export default class HomePage extends Component {
    state={
        data:[{"todo":"Do GYM","time":"11:00","Date":"12 July"},
            {"todo":"Do YOGA fgzdgrgrg rgrgrzgz rgrsgg","time":"10:23","Date":"09 July"},
            {"todo":"Do YOGA  fgzdgrgrg rgrgrzgz rgrsgg","time":"07:56","Date":"19 July"},
            {"todo":"योग ही भारतातील ","time":"07:56","Date":"19 July"}
    ]
    }
    static navigationOptions = {
    title:"ToDo List"
  }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.box1}>
                    <View style={styles.summaryBox}>
                       <View style={styles.totalTODO}>
                           <Text style={styles.TODOVal}>11</Text>
                           <Text style={styles.TODOText}>Total</Text>
                        </View>
                       <View style={styles.pendingTODO}>
                           <Text style={styles.TODOVal}>3</Text>
                           <Text style={styles.TODOText}>Pending</Text>
                       </View>
                       <View style={styles.doneTODO}>
                           <Text style={styles.TODOVal}>8</Text>
                           <Text style={styles.TODOText}>Completed</Text>
                       </View>
                    </View>
                </View>
                <View style={styles.box2}>
                    <FlatList 
                     data={this.state.data}
                     renderItem={( {item} ) => {
                     return (
                        <TouchableOpacity style={styles.todoItemBox}>
                        <Card style={styles.listItem}>
                            <View style={styles.iconContainer}>
                              <Text style={styles.timeIcon}>{item.time}</Text>   
                            </View> 
                            <View style={styles.infoContainer}>
                              <Text style={styles.infoTextTask}>
                              {item.todo}
                              </Text>
                              <Text style={styles.infoTextDate}>
                              {item.Date}
                              </Text>
                            </View>
                            <View style={styles.infoTextIndicator}> 
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
        //  onPress={()=>{
        //    this.props.navigation.navigate("Add")
        //  }}
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
          backgroundColor:"green"
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
      }
  });

