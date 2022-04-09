import 'react-native-get-random-values';
import { v4 as uuidv4 } from "uuid";

export const generateListItems = (withPrefix: string = "Item", numItems=0) => {
    const dataList = [];
    for(let i=1; i<=numItems; i++) {
        const dataItem = {
            "id": withPrefix+i,
            "title": withPrefix + " " + i
        }
        dataList.push(dataItem);
    }
    return dataList;
}