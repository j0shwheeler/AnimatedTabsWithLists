// React Native Collapsible Toolbar with Animation
// https://aboutreact.com/react-native-collapsible-toolbar/

// import React in our code
import React, {useState, useCallback, useMemo, useRef} from 'react';
// import all the components we are going to use
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Animated,
  Dimensions,
  MaskedViewComponent
} from 'react-native';
import { createMaterialTopTabNavigator, MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { TODOItemListScreen, UserListScreen, FormScreen, TabBar } from "./src/components";
import { PanGestureHandler, State } from "react-native-gesture-handler";
const { Value, event } = Animated;
import ReAnimated from 'react-native-reanimated';


const App = () => {
  const dummyData = [
    'Text',
    'Input',
    'Button',
    'Card',
    'CheckBox',
    'Divider',
    'Header',
    'List Item',
    'Pricing',
    'Rating',
    'Search Bar',
    'Slider',
    'Tile',
    'Icon',
    'Avatar',
  ];
  const Header_Maximum_Height = 150;
  //Max Height of the Header
  const Header_Minimum_Height = 0;
  //Min Height of the Header
  let count = 0;
  
  const [scrollOffsetY, setScrollOffsetY] = useState(-45);
  const [scrollOffsetYTest, setScrollOffsetYTest] = useState(-35);

  const translateY = new Animated.Value(0);

  const translateYForTabNavigator = new Animated.Value(100);
  const translateYForPageHeader = new Animated.Value(0);
  
  const scrolledYPos = useRef(0);
  const MAX_NAVIGATOR_OFFSET = 140;
  const onGestureEvent = ({nativeEvent}) => {
    const { translationY } = nativeEvent;
     if(translationY < 10) {
      translateYForTabNavigator.setValue(translationY)
       translateYForPageHeader.setValue(translationY)
     } 
    else {
       translateYForTabNavigator.setValue(0);
       translateYForPageHeader.setValue(0);
     }
    // console.log(nativeEvent);
  }

  const onScrollEvent = (y: number) => {
     if(y < MAX_NAVIGATOR_OFFSET) {
      translateYForTabNavigator.setValue(-y+100)
      // translateYForPageHeader.setValue(-y+100)
    } 
    // else {
    //   translateYForTabNavigator.setValue(-MAX_NAVIGATOR_OFFSET+100);
    //   translateYForPageHeader.setValue(-MAX_NAVIGATOR_OFFSET+100);
    // }
  }
  const windowHeight = Dimensions.get('screen').height;

  
const renderTabBar = (props) => (
<PanGestureHandler
 onGestureEvent={() => onGestureEvent}
 onHandlerStateChange={onGestureEvent}
>
  <Animated.View>
    <TabBar onIndexChange={setTabIndex} {...props} />
  </Animated.View>
  </PanGestureHandler>
);

const Tab = createMaterialTopTabNavigator();
 const TabNavigator = ({ onScrollEvent }) => {
   return (
     <Animated.View style={[{height: windowHeight, top: translateYForTabNavigator}]}>
      <Tab.Navigator tabBar={renderTabBar}>
          <Tab.Screen
          name="TODOScreen">
            {() => <TODOItemListScreen onScrollEvent={onScrollEvent} />}
          </Tab.Screen>
          <Tab.Screen
          name="UserScreen" component={UserListScreen} />
          <Tab.Screen
          name="FormScreen" component={FormScreen} />
      </Tab.Navigator>
    </Animated.View>
   )
 }

  const [tabIndex, setTabIndex] = useState(0);


  return (
    <>
    <NavigationContainer>
    <SafeAreaView style={styles.container}>
    <PanGestureHandler 
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onGestureEvent}>
          <Animated.View
            style={[
              styles.header, { height: 500, top: translateYForPageHeader }
            ]}
            >
      <View style={styles.container}>
        
            <Text style={styles.headerText}>
              React Native Collapsible Toolbar with Animation
            </Text>
         
        <TabNavigator onScrollEvent={onScrollEvent} />
      </View>
      </Animated.View>
        </PanGestureHandler>
    </SafeAreaView>
    
    </NavigationContainer>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    height: 150,
    backgroundColor: "#ccc"
  },
  headerText: {
    color: '#000',
    fontSize: 18,
    textAlign: 'center',
  },
  textStyle: {
    textAlign: 'center',
    color: '#000',
    fontSize: 18,
    padding: 20,
  },
});