//import  Screens
import HomeScreen from './TestHoome'
import TestHoome2 from './TestHoome2'
import TODOHomeScreen from './Apps/TODO/Screens/HomePage.js'
import TODOViewPage  from './Apps/TODO/Screens/ViewPage'
// Import react navigation ,react navigation stack
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const MainNavigator = createStackNavigator(
  {
    ToDoHome:{screen:TODOHomeScreen},
    TODOView:{screen:TODOViewPage}
  },{
    defaultNavigationOptions:{
      headerTintColor:"#fff",
      headerStyle:{
        backgroundColor:"teal"
      },
      headerTitleStyle:{
        color:"#fff",        
      }
    }
  }
)
const NavigationRoute = createAppContainer(MainNavigator)
export default NavigationRoute
