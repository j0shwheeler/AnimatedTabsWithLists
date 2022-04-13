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
import {State} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useScrollEvents} from './hooks';

const headerHeight = 150;
const tabBarHeight = 50;
const HomeScreen = () => {
  const Tab = createMaterialTopTabNavigator();
  const [tabIndex, setTabIndex] = useState(0);
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
      <Animated.View
        style={[
          styles.tabBarContainer,
          {transform: [{translateY: translationY}]},
        ]}>
        <TabBar onIndexChange={setTabIndex} {...props} />
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.animatedHeaderContainer,
          {transform: [{translateY: translationY}]},
        ]}>
        <View style={[styles.headerContainer, {paddingTop: safeAreaTop}]}>
          <Text>Sticky Tabs With Header & FlatLists</Text>
        </View>
      </Animated.View>
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
        <Tab.Screen name="UserScreen">
          {() => (
            <UserListScreen
              contentContainerStyle={[
                styles.TODOListItemScreen,
                {paddingBottom: safeAreaBottom},
              ]}
              scrollEvents={scrollEvents}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="FormScreen">
          {() => (
            <FormScreen
              contentContainerStyle={[
                styles.TODOListItemScreen,
                {paddingBottom: safeAreaBottom},
              ]}
              scrollEvents={scrollEvents}
            />
          )}
        </Tab.Screen>
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
    paddingTop: headerHeight + tabBarHeight, //rendered ? headerHeight + TAB_BAR_HEIGHT : 0,
  },
});
