"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
];
const Item = ({ title }) => (<react_native_1.View style={styles.item}>
    <react_native_1.Text style={styles.title}>{title}</react_native_1.Text>
  </react_native_1.View>);
const App = () => {
    const renderItem = ({ item }) => (<Item title={item.title}/>);
    return (<react_native_1.SafeAreaView style={styles.container}>
      <react_native_1.FlatList data={DATA} renderItem={renderItem} keyExtractor={item => item.id}/>
    </react_native_1.SafeAreaView>);
};
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        marginTop: react_native_1.StatusBar.currentHeight || 0,
    },
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
exports.default = App;
//# sourceMappingURL=TODOItemListScreen.js.map