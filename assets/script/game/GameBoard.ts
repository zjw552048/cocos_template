import { _decorator, Component, Node } from 'cc';
import { GameState } from '../enum/GameState';
const { ccclass, property } = _decorator;

@ccclass('GameBoard')
export class GameBoard extends Component {
    start() {

    }

    update(deltaTime: number) {

    }

    public init(rows: number, cols: number) {

    }

    private create2DArray<Cell>(rows, cols);
}


