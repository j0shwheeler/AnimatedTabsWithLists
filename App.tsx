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
  MaskedViewComponent,
  PanResponder
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
  
const renderTabBar = (props) =>  {
  return (
      <TabBar onIndexChange={setTabIndex} {...props} />
  )
};

const windowHeight = Dimensions.get("window").height;

const Tab = createMaterialTopTabNavigator();
const TabNavigator = ({ onScrollEvent, pan }) => { 
   return (
     <Animated.View 
      style={[{ height: 1000}, { transform: [{ translateY: pan.y }]}]}
      {...panResponder.panHandlers}
      >
      <Tab.Navigator 
         tabBar={renderTabBar}
      >
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

  const onScrollEvent = () => {

  }

  const pan = useRef(new Animated.ValueXY()).current;

  const calcPanY = (panY) => {
    const TOP_THRESH = -150;
    if(panY < TOP_THRESH) {
      return TOP_THRESH;
    }
    return panY;
  }

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => {
        return true;
      },
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: calcPanY(pan.y._value)
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: pan.x, dy: calcPanY(pan.y) }
        ]
      ),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      }
    })
  ).current;



  return (
    <>
      <NavigationContainer>
        <SafeAreaView>
          <Animated.View 
            style={[{ height: 150, backgroundColor: "#CCCCCC"}, {transform: [{translateY: pan.y}]}]}
            {...panResponder.panHandlers}
          >
            <Text>Sticky Tabs With Header & FlatLists</Text>
          </Animated.View>
          <TabNavigator onScrollEvent={ onScrollEvent } pan={pan} />
        </SafeAreaView>
      </NavigationContainer>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
 
});