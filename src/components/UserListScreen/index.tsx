import React from 'react';
import {DATA} from './data';
import {StyleSheet, Text, Animated} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {ListItem} from '../../common';

const Item = ({title}) => {
  return (
    <Animated.View style={[styles.item]}>
      <Text style={styles.title}>{title}</Text>
    </Animated.View>
  );
};

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const UserListScreen = ({scrollEvents, contentContainerStyle}) => {
  return (
    <AnimatedFlatList
      scrollEventThrottle={16}
      data={DATA}
      {...scrollEvents}
      renderItem={({item}: {item: ListItem}) => <Item title={item.title} />}
      contentContainerStyle={contentContainerStyle}
      keyExtractor={(item: ListItem) => item.id}
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

export default UserListScreen;
