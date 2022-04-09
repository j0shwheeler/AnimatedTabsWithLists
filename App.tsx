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
const { Value, event, diffClamp } = Animated;
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
  
const renderTabBar = (props) =>  {
  return (
      <TabBar onIndexChange={setTabIndex} {...props} />
  )
};

const windowHeight = Dimensions.get("window").height;

const Tab = createMaterialTopTabNavigator();
const TabNavigator = ({ translateY }) => { 
   return (
     <Animated.View 
      style={[{ height: windowHeight}, { transform: [{ translateY }]}]}
      {...panResponder.panHandlers}
      >
      <Tab.Navigator 
         tabBar={renderTabBar}
      >
          <Tab.Screen
          name="TODOScreen" component={TODOItemListScreen} />
          <Tab.Screen
          name="UserScreen" component={UserListScreen} />
          <Tab.Screen
          name="FormScreen" component={FormScreen} />
      </Tab.Navigator>
      </Animated.View>
   )
 }

  const [tabIndex, setTabIndex] = useState(0);

  const headerHeight = 150;
  const pan = useRef(new Animated.ValueXY()).current;
  const panYClamped = diffClamp(pan.y, -headerHeight, 0);
  const translateY = panYClamped;


  const calcTranslateY = (yValue) => {
      return yValue;
  }

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (e, gesture) => {
        return true;
      },
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
      },
      onPanResponderMove: (e, gesture) => {        
        return Animated.event(
        [
          null,
          { dx: pan.x, dy: pan.y }
        ], { useNativeDriver: false }
      )(e, {...gesture, dx: gesture.dx, dy: calcTranslateY(gesture.dy)});
      },
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
            style={[{ height: 150, backgroundColor: "#CCCCCC"}, {transform: [{ translateY }]}]}
            {...panResponder.panHandlers}
          >
            <Text>Sticky Tabs With Header & FlatLists</Text>
          </Animated.View>
          <TabNavigator translateY={translateY} />
        </SafeAreaView>
      </NavigationContainer>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
 
});