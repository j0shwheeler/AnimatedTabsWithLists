import React from 'react';
import { DATA } from './data';
import { SafeAreaView, View, StyleSheet, Text, StatusBar, Animated } from 'react-native';
import { FlatList, PanGestureHandler } from "react-native-gesture-handler";
import ReAnimated from 'react-native-reanimated';

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const AnimatedItem = ({ index, item, y }) => { 



  return (
    <Animated.View
    style={[{}]}
      key={index}
    >
      <Item title={item.title} />
    </Animated.View>
  )
};

const TODOItemListScreen = ({onScrollEvent}) => {
  let count = 0;
  const y = new Animated.Value(0);
  const onFlatListScroll =  ({nativeEvent}) => { 
    const {contentOffset: { y }} = nativeEvent
    onScrollEvent(y);

};

  return (
    <View
    >
        <AnimatedFlatList
          data={DATA}
          nestedScrollEnabled={true}
          renderItem={({ index, item }) => (
            <AnimatedItem {...{ index, y, item }} />
          )}
          keyExtractor={item => item.id}
          onScroll={onFlatListScroll}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default TODOItemListScreen;