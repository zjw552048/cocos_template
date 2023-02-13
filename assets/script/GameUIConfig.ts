/*
 * @Date: 2021-08-12 09:33:37
 * @LastEditors: dgflash
 * @LastEditTime: 2022-11-11 17:41:53
 */

import { UIConfig, LayerType } from "../../extensions/oops-plugin-framework/assets/core/gui/layer/LayerManager";


/** 界面唯一标识（方便服务器通过编号数据触发界面打开） */
export enum UIID {

}

/** 打开界面方式的配置数据 */
export var UIConfigData: { [key: number]: UIConfig } = {
    // [UIID.Loading]: { layer: LayerType.UI, prefab: "loading/prefab/loading", bundle: "resources" },
}