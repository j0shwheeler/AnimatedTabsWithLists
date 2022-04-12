import React, {useCallback, useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Dimensions,
  Animated,
  View,
  NativeEventEmitter,
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
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

const App = () => {
  const Tab = createMaterialTopTabNavigator();
  const windowHeight = Dimensions.get('window').height;
  const [tabIndex, setTabIndex] = useState(0);
  const HEADER_HEIGHT = 150;
  const absoluteY = useRef(new Value(0)).current;
  let lastOffsetY = 0;
  let lastContentOffsetY = 0;

  let TODOListScrollValue = useRef(new Value(0)).current;
  const scrollEvents = {
    onScroll: event => {
      // console.log('onScroll');
      const offsetY = event.nativeEvent.contentOffset.y;
      TODOListScrollValue.setOffset(-offsetY);
      TODOListScrollValue.setValue(0);
    },
    onScrollBeginDrag: event => {
      // console.log('onScrollBeginDrag');
      const offsetY = event.nativeEvent.contentOffset.y;
      TODOListScrollValue.setOffset(-offsetY);
      TODOListScrollValue.setValue(0);
    },
    onScrollEndDrag: event => {
      // console.log('onScrollEndDrag');
      const offsetY = event.nativeEvent.contentOffset.y;
      TODOListScrollValue.setOffset(-offsetY);
      TODOListScrollValue.setValue(0);
    },
    onMomentumScrollBegin: event => {
      // console.log('onMomentumScrollBegin');
      const offsetY = event.nativeEvent.contentOffset.y;
      TODOListScrollValue.setOffset(-offsetY);
      TODOListScrollValue.setValue(0);
    },
    onMomentumScrollEnd: event => {
      // console.log('onMomentumScrollEnd');
      const offsetY = event.nativeEvent.contentOffset.y;
      TODOListScrollValue.setOffset(-offsetY);
      TODOListScrollValue.setValue(0);
    },
  };

  // const TODOListScrollHandler = event => {
  //   const listOffsetDifference =
  //     lastContentOffsetY - event.nativeEvent.contentOffset.y;
  //   lastContentOffsetY = event.nativeEvent.contentOffset.y;

  //   lastOffsetY += listOffsetDifference;
  //   translationY.setOffset(lastOffsetY);
  //   translationY.setValue(0);
  // };

  const translationY = TODOListScrollValue;

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
              <Animated.View
                style={[
                  styles.animatedHeaderContainer,
                  {transform: [{translateY: translationY}]},
                ]}>
                <View style={[styles.headerContainer]}>
                  <Text>Sticky Tabs With Header & FlatLists</Text>
                </View>
              </Animated.View>
            </PanGestureHandler>
            <Tab.Navigator tabBar={renderTabBar}>
              <Tab.Screen name="TODOScreen">
                {() => (
                  <TODOItemListScreen
                    contentContainerStyle={styles.TODOListItemScreen}
                    scrollEvents={scrollEvents}
                  />
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
    top: 200,
    left: 0,
    right: 0,
    position: 'absolute',
    zIndex: 1,
  },
  animatedHeaderContainer: {
    top: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    zIndex: 1,
  },
  headerContainer: {
    height: 200,
    backgroundColor: 'blue',
  },
  TODOListItemScreen: {
    paddingTop: 250, //rendered ? headerHeight + TAB_BAR_HEIGHT : 0,
    paddingBottom: 50,
    minHeight: 100, //screenHeight + headerDiff,
  },
});
