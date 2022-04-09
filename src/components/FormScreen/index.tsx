import React, {useState} from 'react';
import { FORM_DATA, FIELD_DATA } from './data';
import Animated, { useValue } from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';

const { cond, eq, add, call, set, Value, event, or } = Animated;

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const FormScreen = () => {
  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );
  return (
    <View style={{flex:1, flexDirection: "column"}}>
      <View style={{height: 275}}>
        <FlatList
          data={FORM_DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={{height: 275}}>
        <FlatList
          data={FIELD_DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        /> 
      </View>
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

export default FormScreen;