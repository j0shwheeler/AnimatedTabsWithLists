import React, {useCallback, useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Dimensions,
  Animated,
  View,
} from 'react-native';
const {Value} = Animated;
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {
  TODOItemListScreen,
  UserListScreen,
  FormScreen,
  TabBar,
} from './src/components';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const Tab = createMaterialTopTabNavigator();
  const windowHeight = Dimensions.get('window').height;
  const [tabIndex, setTabIndex] = useState(0);
  const HEADER_HEIGHT = 150;
  const absoluteY = useRef(new Value(0)).current;
  const translationY = useRef(new Value(0)).current;
  let lastOffsetY = 0;

  const renderTabBar = props => {
    return (
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}>
        <Animated.View
          style={[
            styles.tabBarContainer,
            {transform: [{translateY: translationY}]},
          ]}>
          <TabBar onIndexChange={setTabIndex} {...props} />
        </Animated.View>
      </PanGestureHandler>
    );
  };

  const renderTODOListItemScreen = () => {
    return <TODOItemListScreen />;
  };

  const onGestureEvent = Animated.event(
    [{nativeEvent: {y: absoluteY, translationY: translationY}}],
    {
      useNativeDriver: true,
    },
  );

  const onHandlerStateChange = ({nativeEvent}) => {
    console.log('---- The Native Event ----');
    console.log(nativeEvent);
    if (nativeEvent.oldState === State.ACTIVE) {
      lastOffsetY += nativeEvent.translationY;
      translationY.setOffset(lastOffsetY);
      translationY.setValue(0);
    }
  };

  return (
    <>
      <SafeAreaProvider>
        <NavigationContainer>
          <View style={styles.container}>
            <PanGestureHandler
              onGestureEvent={onGestureEvent}
              onHandlerStateChange={onHandlerStateChange}>
              <Animated.View style={{transform: [{translateY: translationY}]}}>
                <Text>Sticky Tabs With Header & FlatLists</Text>
              </Animated.View>
            </PanGestureHandler>
            <Tab.Navigator tabBar={renderTabBar}>
              <Tab.Screen name="TODOScreen">
                {() => (
                  <Animated.View
                    style={{
                      backgroundColor: 'blue',
                      transform: [{translateY: translationY}],
                    }}>
                    <TODOItemListScreen />
                  </Animated.View>
                )}
              </Tab.Screen>
              <Tab.Screen name="UserScreen" component={UserListScreen} />
              <Tab.Screen name="FormScreen" component={FormScreen} />
            </Tab.Navigator>
          </View>
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  tabBarContainer: {
    top: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    zIndex: 1,
  },
  headerContainer: {
    top: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    zIndex: 1,
  },
});
