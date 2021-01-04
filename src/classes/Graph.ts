import { GraphInterfaces } from '../interfaces';
import { distBetweenPoints } from '../helpers';
import Point from './Point';

type Drag = {
    isDragging: boolean,
    mouseDown: boolean,
    point: Point | null,
    hover: boolean
}
export default class Graph {
    private _height: number;
    private _width: number;
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;
    private _scale: number = 50;
    drag: Drag = { isDragging: false, mouseDown: false, point: null, hover: false };
    cursor: Point = new Point(0, 0, -50, -50);
    
    constructor(proprties: GraphInterfaces) {
        this._canvas = document.getElementById(proprties.id) as HTMLCanvasElement;
        this._ctx = this._canvas.getContext("2d");
        this._height = this._canvas.offsetHeight;
        this._width = this._canvas.offsetWidth;
        this._canvas.height = this._height;
        this._canvas.width = this._width;
        this._canvas.addEventListener('mousedown', (event) => {
            event.preventDefault();
            this.drag.mouseDown = true
            const rect = this._canvas.getBoundingClientRect();
            this.drag.point = this.pointRaw(event.clientX - rect.left, event.clientY - rect.top)
        })
        this._canvas.addEventListener('mouseup', (event) => {
            event.preventDefault();
            this.drag.mouseDown = false;
            this.drag.isDragging = false;
        })
        this._canvas.addEventListener('touchend', (event) => {
            event.preventDefault();
            this.drag.mouseDown = false;
            this.drag.isDragging = false;
        })
        this._canvas.addEventListener('mousemove', (event) => this.moveEventHandler(event, proprties));

        this._canvas.addEventListener('touchmove', (event) => this.handleTouchMove(event, proprties));

        this._canvas.addEventListener('dblclick', (event) => {
            event.preventDefault();
            proprties.points.state.forEach(controlPoint => {
                if (distBetweenPoints(controlPoint, this.cursor) <= controlPoint.radius) {
                    this.drag.isDragging = true
                }
            })
        })
        this._printAxes();
    }

    handleTouchMove(event: TouchEvent, proprties: GraphInterfaces) {
        event.preventDefault();
        this.drag.mouseDown = true;
        const rect = this._canvas.getBoundingClientRect();
        this.drag.point = this.pointRaw(event.changedTouches[(event as TouchEvent).changedTouches.length - 1].clientX - rect.left, event.touches[0].clientY - rect.top);
        this.moveEventHandler(event, proprties);
    }

    moveEventHandler(event: MouseEvent | TouchEvent, proprties: GraphInterfaces) {
        event.preventDefault();
        const rect = this._canvas.getBoundingClientRect();
        const clientX = event.type === 'mousemove' ? (event as MouseEvent).clientX : (event as TouchEvent).changedTouches[(event as TouchEvent).changedTouches.length - 1].clientX;
        const clientY = event.type === 'mousemove' ? (event as MouseEvent).clientY : (event as TouchEvent).changedTouches[(event as TouchEvent).changedTouches.length - 1].clientY;
        this.cursor = this.pointRaw(clientX - rect.left, clientY - rect.top);
        if (this.drag.mouseDown) {
            this.drag.isDragging = true;
        } else {
            this.drag.isDragging = false
        }
        if (this.drag.isDragging) {
            this.drag.point = this.pointRaw(clientX - rect.left, clientY - rect.top);
        }
        this.drag.hover = false;
        proprties.points.state.forEach(controlPoint => {
            if (distBetweenPoints(controlPoint, this.cursor) <= controlPoint.radius) {
                this.drag.hover = true;
            }
        })
        if (this.drag.hover) {
            this._canvas.style.cursor = "pointer"
        } else {
            this.canvas.style.cursor = 'auto'
        }
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
    get canvas() {
        return this._canvas
    }

}
