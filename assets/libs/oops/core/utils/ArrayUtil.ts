/*
 * @Author: dgflash
 * @Date: 2021-08-11 16:41:12
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-02 14:50:57
 */

/** 数组工具 */
export class ArrayUtil {
    /**
     * 数组去重，并创建一个新数组返回
     * @param arr  源数组
     */
    static noRepeated(arr: any[]) {
        var res = [arr[0]];
        for (var i = 1; i < arr.length; i++) {
            var repeat = false;
            for (var j = 0; j < res.length; j++) {
                if (arr[i] == res[j]) {
                    repeat = true;
                    break;
                }
            }

            if (!repeat) {
                res.push(arr[i]);
            }
        }
        return res;
    }

    /**
     * 复制二维数组
     * @param array 目标数组 
     */
    static copy2DArray(array: any[][]): any[][] {
        let newArray: any[][] = [];
        for (let i = 0; i < array.length; i++) {
            newArray.push(array[i].concat());
        }
        return newArray;
    }

    /**
     * Fisher-Yates Shuffle 随机置乱算法
     * @param array 目标数组
     */
    static fisherYatesShuffle(array: any[]): any[] {
        let count = array.length;
        while (count) {
            let index = Math.floor(Math.random() * count--);
            let temp = array[count];
            array[count] = array[index];
            array[index] = temp;
        }
        return array;
    }

    /**
     * 混淆数组
     * @param array 目标数组
     */
    static confound(array: []): any[] {
        let result = array.slice().sort(() => Math.random() - .5);
        return result;
    }

    /**
     * 数组扁平化
     * @param array 目标数组
     */
    static flattening(array: any[]) {
        for (; array.some(v => Array.isArray(v));) {    // 判断 array 中是否有数组
            array = [].concat.apply([], array); // 压扁数组
        }
        return array;
    }

    /** 删除数组中指定项 */
    static removeItem(array: any[], item: any) {
        var temp = array.concat();
        for (let i = 0; i < temp.length; i++) {
            const value = temp[i];
            if (item == value) {
                array.splice(i, 1);
                break;
            }
        }
    }

    /**
     * 合并数组
     * @param array1 目标数组1
     * @param array2 目标数组2
     */
    static combineArrays(array1: any[], array2: any[]): any[] {
        let newArray = [...array1, ...array2];
        return newArray;
    }

    /**
     * 获取随机数组成员
     * @param array 目标数组
     */
    static getRandomValueInArray(array: any[]): any {
        let newArray = array[Math.floor(Math.random() * array.length)];
        return newArray;
    }
}
