import { GraphInterfaces } from '../interfaces';
import Point from './Point';

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
    }

    defaultStyles() {
        this._ctx.lineWidth = 0;
        this._ctx.strokeStyle = 'white';
        this._ctx.shadowColor='transparent';
        this._ctx.shadowOffsetX = 0;
        this._ctx.shadowOffsetY = 0;
        this._ctx.shadowBlur = 0;
        this._ctx.globalCompositeOperation='source-over';
    }

    line(p1: Point, p2: Point, color?: string) {
        this.defaultStyles();
        this._ctx.beginPath();
        this._ctx.moveTo(p1.rawX, p1.rawY);
        this._ctx.lineTo(p2.rawX, p2.rawY);
        this._ctx.shadowColor= color || 'red';
        this._ctx.shadowBlur = 5;
        this._ctx.lineWidth = 2;
        this._ctx.globalCompositeOperation='destination-over';
        this._ctx.stroke();
        this.defaultStyles();
    }
    point(x: number, y: number): Point {
        this.defaultStyles();
        const newPoint = new Point(x, y, (x * this._scale), this._height - (y * this._scale));
        return newPoint
    }
    pointRaw(x: number, y: number): Point {
        const newPoint = this.point(x / this._scale, (this.height - y) / this._scale);
        return newPoint
    }
    _printAxes() {
        for (let i = 0; i < this._canvas.width / this._scale; i++) {
            this._ctx.font = "12px Comic Sans MS";
            this.ctx.fillStyle = '#abadb3';
            const point = this.point(i, 0);
            this.ctx.fillText(point.x.toString(), i === 0 ? point.rawX : point.rawX - 6, point.rawY);
        }
        for (let i = 1; i < this._canvas.height / this._scale; i++) {
            const point = this.point(0, i);
            this.ctx.fillText(point.y.toString(), point.rawX, point.rawY + 6);
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
