import React from 'react';
import {DATA} from './data';
import {View, StyleSheet, Text, Animated} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const TODOItemListScreen = () => {
  const y = new Animated.Value(0);
  return (
    <AnimatedFlatList
      scrollEventThrottle={16}
      data={DATA}
      renderItem={({index, item}) => <Item title={item.title} />}
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
