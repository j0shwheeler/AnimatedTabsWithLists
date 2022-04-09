import React, { useEffect, useRef } from 'react';
import { DATA } from './data';
import { SafeAreaView, View, StyleSheet, Text, StatusBar, Animated } from 'react-native';
import { FlatList, PanGestureHandler } from "react-native-gesture-handler";
import ReAnimated, { useValue } from 'react-native-reanimated';

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);


interface AnimatedItemProps {
  y: Animated.Value;
  index: number;
  item: any;
}

const AnimatedItem = ({ index, item, y }: AnimatedItemProps) => { 
  const translateY = y;
  return (
    <Animated.View
      style={[{height: 100}, {transform: [{ translateY: translateY } ] } ]}
      key={index}
    >
      <Item title={item.title} />
    </Animated.View>
  )
};

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

const TODOItemListScreen = ({onScrollEvent}) => {
const y = new Animated.Value(0);
  const onScroll = 
    Animated.event([{ nativeEvent: { contentOffset: { y } } }], {useNativeDriver: true});
  return (
        <AnimatedFlatList
          scrollEventThrottle={16}
          data={DATA}
          nestedScrollEnabled={true}
          renderItem={({ index, item}) => (
            <AnimatedItem index={index} item={item} y={y} />
          )}
          keyExtractor={item => item.id}
          {...{onScroll}} 
        />
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