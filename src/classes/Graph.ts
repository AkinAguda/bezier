import { GraphInterfaces } from '../interfaces';
import Point from './Point';

export default class Graph {
    private _height = 768;
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;
    points: Array<Point> = [];
    arm: Array<Point> = [];
    constructor(proprties: GraphInterfaces) {
        this._canvas = document.getElementById(proprties.id) as HTMLCanvasElement;
        this._ctx = this._canvas.getContext("2d");
        this._height = proprties.height;
        this._canvas.height = proprties.height;
        this._canvas.width = proprties.width;
    }
    line(p1: Point, p2: Point) {
        this._ctx.moveTo(p1.x, this._height - p1.y);
        this._ctx.lineTo(p2.x, this._height - p2.y);
        this._ctx.stroke();
    }
    lineRaw(p1: Point, p2: Point) {
        this._ctx.moveTo(p1.rawX, p1.rawY);
        console.log(p2)
        this._ctx.lineTo(p2.rawX, p2.rawY);
        this._ctx.stroke();
    }
    point(x: number, y: number): Point {
        this._ctx.moveTo(x, this._height - y);
        const newPoint = new Point(x, y, x, this._height - y);
        this.points.push(newPoint);
        return newPoint
    }
    pointRaw(x: number, y: number): Point {
        this._ctx.moveTo(x, y);
        const newPoint = new Point(x, y, x, y);
        this.arm.push(newPoint);
        return newPoint
    }
    get ctx () {
        return this._ctx
    }

}
