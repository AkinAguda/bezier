import Graph from './Graph';
import Point from './Point';

import { combination, returnAxi } from '../helpers';

export enum PointType {
    x,
    y
}

export default class Bezier {
    constructor(public graph: Graph) {}
    controlPoints: Array<Point>;
    // indicate() {
    //     this.graph.arm.forEach(point => point.drawCircle(this.graph.ctx))
    // }

    // showControlPoints() {
    //     this.controlPoints.forEach(point => point.drawCircle(this.graph.ctx))
    // }

    // genF(upperBoundary: number, lowerBoundary: number, iteration: number, axi: number) {
    //     return combination(upperBoundary, lowerBoundary) * Math.pow((1 - iteration), upperBoundary - lowerBoundary) * Math.pow(iteration, lowerBoundary) * axi
    // }

    // summation(upperBoundary: number, lowerBoundary: number, iteration: number, points: Array<Point>, pType: PointType): number {
    //     if (lowerBoundary === upperBoundary) {
    //         return this.genF(upperBoundary, lowerBoundary, iteration, returnAxi(pType, points[lowerBoundary - 1]))
    //     } else {
    //         return this.genF(upperBoundary, lowerBoundary, iteration, returnAxi(pType, points[lowerBoundary])) + this.summation(upperBoundary, lowerBoundary + 1, iteration, points, pType)
    //     }
    // }

    calculateValue(n: number, i: number, t: number, axi: number, ty: PointType) : number {
        if (t === 0 && ty == PointType.y) {
            // console.log(combination(n, i) * (Math.pow((i - t), n - 1)) * Math.pow(t, i) * axi, axi)
            console.log(t, n, i, axi, (Math.pow((1 - t), n - 1)), combination(n, i) * (Math.pow((i - t), n - 1)) * Math.pow(t, i) * axi)
        }
        // console.log(t)
        // console.log(n, i)
       return combination(n, i) * (Math.pow((1 - t), n - 1)) * Math.pow(t, i) * axi 
    }

    summation(upperBoundary: number, lowerBoundary: number, iteration: number, points: Array<Point>, pType: PointType) : number {
        // console.log()
        if (lowerBoundary === upperBoundary) {
            // console.log("finished");
            return this.calculateValue(upperBoundary, lowerBoundary, iteration, returnAxi(pType, points[lowerBoundary]), pType)
        } else {
            return this.calculateValue(upperBoundary, lowerBoundary, iteration, returnAxi(pType, points[lowerBoundary]), pType) + this.summation(upperBoundary, lowerBoundary + 1, iteration, points, pType)
        }
    }

    buildBezier(controlPoints: Array<Point>) {
        const x: Array<number> = [];
        const y: Array<number> = [];
        const pts: Array<Point> = [];
        // this.controlPoints = controlPoints;
        for (let i = 0; i < 1; i += 0.05) {
            // console.log(i);
            // x.push(this.summation(controlPoints.length - 1, 0, i, controlPoints, PointType.x ))
            // y.push(this.summation(controlPoints.length - 1, 0, i, controlPoints, PointType.y ))
            pts.push(this.graph.point(this.summation(controlPoints.length - 1, 0, i, controlPoints, PointType.x ), this.summation(controlPoints.length - 1, 0, i, controlPoints, PointType.y )))
        }

        // console.log(x)

        // x.forEach((_, i) => {
        //     console.log(x[i], y[i])
        //     this.graph.point(x[i]/50, y[i]/50)
        // })

        for (let i = 0; i < pts.length - 1; i++) {
            this.graph.line(pts[i], pts[i + 1])
            // pts[i].drawCircle(this.graph.ctx)
        }

        // console.log(pts[0])



    }

}

