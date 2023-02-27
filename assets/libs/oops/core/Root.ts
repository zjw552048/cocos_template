/*
 * @Author: dgflash
 * @Date: 2021-07-03 16:13:17
 * @LastEditors: dgflash
 * @LastEditTime: 2023-01-19 11:48:04
 */
import { Component, Game, JsonAsset, Node, _decorator, director, game, log, sys, view } from "cc";
import { LanguageManager } from "../libs/gui/language/Language";
import { BuildTimeConstants } from "../module/config/BuildTimeConstants";
import { GameConfig } from "../module/config/GameConfig";
import { GameQueryConfig } from "../module/config/GameQueryConfig";
import { oops, version } from "./Oops";
import { AudioManager } from "./common/audio/AudioManager";
import { EventMessage } from "./common/event/EventMessage";
import { GameManager } from "./game/GameManager";
import { GUI } from "./gui/GUI";
import { LayerManager } from "./gui/layer/LayerManager";
import { TimerManager } from "./common/timer/TimerManager";
import { UserDataManager } from "../../../script/game/UserDataManager";

const { ccclass, property } = _decorator;

/** 框架显示层根节点 */
export class Root extends Component {
    /** 游戏层节点 */
    @property({
        type: Node,
        tooltip: "游戏层"
    })
    game: Node = null!;

    /** 界面层节点 */
    @property({
        type: Node,
        tooltip: "界面层"
    })
    gui: Node = null!;

    /** 持久根节点 */
    persistRootNode: Node = null!

    onLoad() {
        console.log(`Oops Framework v${version}`);
        this.enabled = false;

        let config_name = "config/config";
        oops.res.load(config_name, JsonAsset, () => {
            var config = oops.res.get(config_name);
            oops.config.btc = new BuildTimeConstants();
            oops.config.query = new GameQueryConfig();
            oops.config.game = new GameConfig(config);
            oops.storage.init();      // 初始化本地存储加密
            game.frameRate = oops.config.game.frameRate;                                         // 初始化每秒传输帧数

            this.enabled = true;
            this.init();
            this.run();
        });
    }

    protected init() {
        // 创建持久根节点
        this.persistRootNode = new Node("PersistRootNode");
        director.addPersistRootNode(this.persistRootNode);

        // 创建音频模块
        oops.audio = this.persistRootNode.addComponent(AudioManager);
        oops.audio.load();

        // 创建时间模块
        oops.timer = this.persistRootNode.addComponent(TimerManager)!;

        oops.userDataManager = new UserDataManager();
        oops.language = new LanguageManager();
        oops.game = new GameManager(this.game);
        oops.gui = new LayerManager(this.gui);
        this.initGui();

        // 游戏显示事件
        game.on(Game.EVENT_SHOW, () => {
            log("Game.EVENT_SHOW");
            oops.timer.load();     // 平台不需要在退出时精准计算时间，直接暂时游戏时间
            oops.audio.resumeAll();
            director.resume();
            game.resume();
            oops.message.dispatchEvent(EventMessage.GAME_ENTER);
        });

        // 游戏隐藏事件
        game.on(Game.EVENT_HIDE, () => {
            log("Game.EVENT_HIDE");
            oops.timer.save();     // 平台不需要在退出时精准计算时间，直接暂时游戏时间
            oops.audio.pauseAll();
            director.pause();
            game.pause();
            oops.message.dispatchEvent(EventMessage.GAME_EXIT);
        });

        // 游戏尺寸修改事件
        var c_gui = this.gui.addComponent(GUI)!;
        if (sys.isMobile == false) {
            view.setResizeCallback(() => {
                c_gui.resize();
                oops.message.dispatchEvent(EventMessage.GAME_RESIZE);
            });
        }
    }

    /** 初始化游戏界面 */
    protected initGui() {

    }

    /** 加载完引擎配置文件后执行 */
    protected run() {

    }

    update(dt: number) {
    }
}