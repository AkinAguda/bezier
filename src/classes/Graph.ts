import { GraphInterfaces } from '../interfaces';
import Point from './Point';

export default class Graph {
    private _height: number;
    private _width: number;
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;
    private _scale: number = 50;
    points: Array<Point> = [];
    arm: Array<Point> = [];
    constructor(proprties: GraphInterfaces) {
        this._canvas = document.getElementById(proprties.id) as HTMLCanvasElement;
        this._ctx = this._canvas.getContext("2d");
        this._height = this._canvas.offsetHeight;
        this._width = this._canvas.offsetWidth;
        this._canvas.height = this._height;
        this._canvas.width = this._width;
    }

    line(p1: Point, p2: Point) {
        this._ctx.moveTo(p1.rawX, p1.rawY);
        this._ctx.lineTo(p2.rawX, p2.rawY);
        this._ctx.strokeStyle = '#8EB0F5';
        this._ctx.stroke();
    }
    point(x: number, y: number): Point {
        const newPoint = new Point(x, y, (x * this._scale), this._height - (y * this._scale));
        this._ctx.moveTo(newPoint.rawX, newPoint.rawY);
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
