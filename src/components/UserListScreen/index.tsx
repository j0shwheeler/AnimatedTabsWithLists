import React from 'react';
import { DATA } from './data';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const UserListScreen = () => {
  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );

  return (
    <View>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
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

export default UserListScreen;