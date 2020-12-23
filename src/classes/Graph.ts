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
        for (let i = 0; i < this._canvas.width / this._scale; i++) {
            this._ctx.font = "12px Comic Sans MS";
            this.ctx.fillStyle = '#abadb3';
            const point = this.point(i, 0);
            this.ctx.fillText(point.x.toString(), point.rawX, point.rawY);
        }
        for (let i = 1; i < this._canvas.height / this._scale; i++) {
            const point = this.point(0, i);
            this.ctx.fillText(point.y.toString(), point.rawX, point.rawY);
        }
    }

    line(p1: Point, p2: Point) {
        this._ctx.moveTo(p1.rawX, p1.rawY);
        this._ctx.lineTo(p2.rawX, p2.rawY);
        this._ctx.strokeStyle = 'white';
        this._ctx.shadowColor='blue';
        this._ctx.shadowOffsetX = 0;
        this._ctx.shadowOffsetY = 0;
        this._ctx.shadowBlur = 3;
        this._ctx.lineWidth = 2;
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
    drawLine(points: Array<Point>, iter = -1) {
        requestAnimationFrame(() => this.drawLine(points, iter))
        if ((iter >= 0) && (iter < points.length - 1)) {
            this.line(points[iter], points[iter + 1])
        }
        iter ++
    }
    get ctx () {
        return this._ctx
    }

}
