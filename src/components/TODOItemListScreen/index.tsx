import React from 'react';
import {DATA} from './data';
import {View, StyleSheet, Text, Animated} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

const Item = ({index, title, y}) => {
  return (
    <Animated.View style={[styles.item, {transform: [{translateY: y}]}]}>
      <Text style={styles.title}>{title}</Text>
    </Animated.View>
  );
};

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const TODOItemListScreen = ({scrollEvents}) => {
  const y = new Animated.Value(0);
  const translateY = y.interpolate({
    inputRange: [-100, 100, 120],
    outputRange: [-100, 100, 0],
  });

  const onFlatListScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: y}}}],
    {useNativeDriver: false},
  );

  return (
    <AnimatedFlatList
      scrollEventThrottle={16}
      data={DATA}
      {...scrollEvents}
      renderItem={({index, item}) => (
        <Item index={index} title={item.title} y={translateY} />
      )}
      keyExtractor={item => item.id}
    />
  );
};

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
