import { GraphInterfaces } from '../interfaces';
import Point from './Point';
import State from './State';

type Drag = {
    isDragging: boolean,
    mouseDown: boolean,
    point: Point | null
}
export default class Graph {
    private _height: number;
    private _width: number;
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;
    private _scale: number = 50;
    drag: Drag = { isDragging: false, mouseDown: false, point: null };
    points: Array<Point> = [];
    constructor(proprties: GraphInterfaces) {
        this._canvas = document.getElementById(proprties.id) as HTMLCanvasElement;
        this._ctx = this._canvas.getContext("2d");
        this._height = this._canvas.offsetHeight;
        this._width = this._canvas.offsetWidth;
        this._canvas.height = this._height;
        this._canvas.width = this._width;
        this._canvas.addEventListener('mousedown', (event) => {
            this.drag.mouseDown = true
            const rect = this._canvas.getBoundingClientRect();
            this.drag.point = this.pointRaw(event.clientX - rect.left, event.clientY - rect.top)
        })
        this._canvas.addEventListener('mouseup', () => {
            this.drag.mouseDown = false
        })
        this._canvas.addEventListener('mousemove', (event) => {
            if (this.drag.mouseDown) {
                this.drag.isDragging = true;
            } else {
                this.drag.isDragging = false
            }
            if (this.drag.isDragging) {
                const rect = this._canvas.getBoundingClientRect();
                this.drag.point = this.pointRaw(event.clientX - rect.left, event.clientY - rect.top);
            }
        })
        this._printAxes();
        this.initialStyles()
    }

    initialStyles() {
        this._ctx.strokeStyle = 'white';
        this._ctx.shadowColor='blue';
        this._ctx.shadowOffsetX = 0;
        this._ctx.shadowOffsetY = 0;
        this._ctx.shadowBlur = 3;
        this._ctx.lineWidth = 2;
    }

    line(p1: Point, p2: Point) {
        this._ctx.moveTo(p1.rawX, p1.rawY);
        this._ctx.lineTo(p2.rawX, p2.rawY);
        this._ctx.strokeStyle = 'white';
        this._ctx.shadowOffsetX = 0;
        this._ctx.shadowOffsetY = 0;
        this._ctx.lineWidth = 2;
        this._ctx.stroke();
    }
    point(x: number, y: number, noPush?: boolean): Point {
        const newPoint = new Point(x, y, (x * this._scale), this._height - (y * this._scale));
        this._ctx.moveTo(newPoint.rawX, newPoint.rawY);
        !noPush && this.points.push(newPoint);
        return newPoint
    }
    pointRaw(x: number, y: number): Point {
        const newPoint = this.point(x / this._scale, (this.height - y) / this._scale, true);
        return newPoint
    }
    _printAxes() {
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
    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height)
        this._printAxes();
    }

    get ctx () {
        return this._ctx
    }
    get width() {
        return this._width
    }
    get height() {
        return this._height
    }

}
