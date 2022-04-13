import 'react-native-get-random-values';
import { v4 as uuidv4 } from "uuid";

export interface ListItem {
    id: string,
    title: string,
}

export const generateListItems = (withPrefix: string = "Item", numItems=0): ListItem[] => {
    const dataList: ListItem[] = [];
    for(let i=1; i<=numItems; i++) {
        const dataItem: ListItem = {
            "id": withPrefix+i,
            "title": withPrefix + " " + i
        }
        dataList.push(dataItem);
    }
    return dataList;
}