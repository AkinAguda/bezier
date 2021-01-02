import { makeid } from '../helpers';
import Graph from './Graph';

export default class Point {
    id: string;
    radius: number = 8;
    constructor(
        private _xValue: number,
        private _yValue: number,
        private _rawXValue?: number,
        private _rawYValue?: number
        ) {
            this.id = makeid(5);
    }

    drawCircle (graph: Graph, redPoint?: true) {
        const { ctx, defaultStyles } = graph;
        ctx.beginPath();
        ctx.arc(this.rawX, this.rawY, this.radius, 0, 2 * Math.PI);
        defaultStyles.call(graph);
        const color = 'black';
        ctx.shadowBlur = redPoint? 15 : 5;
        ctx.strokeStyle = color;
        ctx.shadowColor = redPoint ? "red" : 'blue';
        ctx.fillStyle= color;
        ctx.fill();
        ctx.stroke();
    }
    get x () {
        return this._xValue
    }
    get y () {
        return this._yValue
    }
    get rawX () {
        return this._rawXValue
    }
    get rawY () {
        return this._rawYValue
    }
    setX(value: number) {
        this._xValue = value
    }
    setY(value: number) {
        this._yValue = value
    }
    setRawX(value: number) {
        this._rawXValue = value
    }
    setRawY(value: number) {
        this._rawYValue = value
    }
}