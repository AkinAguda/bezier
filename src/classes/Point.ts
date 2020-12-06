export default class Point {
    constructor(
        private _xValue: number,
        private _yValue: number,
        private _rawXValue?: number,
        private _rawYValue?: number
        ) {
    }

    drawCircle (ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.rawX, this.rawY, 5, 0, 2 * Math.PI);
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
}