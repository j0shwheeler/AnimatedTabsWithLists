import React, {useRef, useState} from 'react';
import {StyleSheet, Text, Dimensions, Animated, View} from 'react-native';
const {Value} = Animated;
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  TODOItemListScreen,
  UserListScreen,
  FormScreen,
  TabBar,
} from './components';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useScrollEvents} from './hooks';

const headerHeight = 150;
const HomeScreen = () => {
  const Tab = createMaterialTopTabNavigator();
  const [tabIndex, setTabIndex] = useState(0);
  const absoluteY = useRef(new Value(0)).current;
  let lastOffsetY = 0;
  const {top: safeAreaTop, bottom: safeAreaBottom} = useSafeAreaInsets();
  const CLAMP_VALUE = headerHeight - safeAreaTop;
  let TODOListScrollValue = useRef(new Value(0)).current;

  const setTODOListScrollValue = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    console.log(offsetY);
    if (offsetY < CLAMP_VALUE && offsetY >= 0) {
      TODOListScrollValue.setOffset(-offsetY);
    }
    TODOListScrollValue.setValue(0);
  };
  const scrollEvents = useScrollEvents(setTODOListScrollValue);
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
    <View style={styles.container}>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}>
        <Animated.View
          style={[
            styles.animatedHeaderContainer,
            {transform: [{translateY: translationY}]},
          ]}>
          <View style={[styles.headerContainer, {paddingTop: safeAreaTop}]}>
            <Text>Sticky Tabs With Header & FlatLists</Text>
          </View>
        </Animated.View>
      </PanGestureHandler>
      <Tab.Navigator tabBar={renderTabBar}>
        <Tab.Screen name="TODOScreen">
          {() => (
            <TODOItemListScreen
              contentContainerStyle={[
                styles.TODOListItemScreen,
                {paddingBottom: safeAreaBottom},
              ]}
              scrollEvents={scrollEvents}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="UserScreen" component={UserListScreen} />
        <Tab.Screen name="FormScreen" component={FormScreen} />
      </Tab.Navigator>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  tabBarContainer: {
    top: headerHeight,
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
    height: headerHeight,
    backgroundColor: 'blue',
  },
  TODOListItemScreen: {
    paddingTop: 250, //rendered ? headerHeight + TAB_BAR_HEIGHT : 0,
    minHeight: 100, //screenHeight + headerDiff,
  },
});
