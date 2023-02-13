/*
 * @Author: dgflash
 * @Date: 2021-07-03 16:13:17
 * @LastEditors: dgflash
 * @LastEditTime: 2022-10-27 18:23:06
 */
import { dynamicAtlasManager, macro, profiler, _decorator } from 'cc';
import { DEBUG} from 'cc/env';
import { oops } from '../libs/oops/core/Oops';
import { Root } from '../libs/oops/core/Root';
import { UIConfigData } from './GameUIConfig';

const { ccclass, property } = _decorator;

macro.CLEANUP_IMAGE_CACHE = false;
dynamicAtlasManager.enabled = true;
dynamicAtlasManager.maxFrameSize = 512;

@ccclass('Main')
export class Main extends Root {
    start() {
        if (DEBUG) profiler.showStats();
    }

    protected run() {
    }

    protected initGui() {
        oops.gui.init(UIConfigData);
    }

    protected async initEcsSystem() {
    }
}
