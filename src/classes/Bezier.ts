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

    calculateValue(n: number, i: number, t: number, axi: number, ty: PointType) : number {
       return combination(n, i) * (Math.pow((1 - t), n - i)) * Math.pow(t, i) * axi 
    }

    summation(upperBoundary: number, lowerBoundary: number, iteration: number, points: Array<Point>, pType: PointType) : number {
        if (lowerBoundary === upperBoundary) {
            return this.calculateValue(upperBoundary, lowerBoundary, iteration, returnAxi(pType, points[lowerBoundary]), pType)
        } else {
            return this.calculateValue(upperBoundary, lowerBoundary, iteration, returnAxi(pType, points[lowerBoundary]), pType) + this.summation(upperBoundary, lowerBoundary + 1, iteration, points, pType)
        }
    }

    buildBezier(controlPoints: Array<Point>) {
        const x: Array<number> = [];
        const y: Array<number> = [];
        const pts: Array<Point> = [];
        for (let i = 0; i <= 1; i = Math.round((i + 0.05 + Number.EPSILON) * 100) / 100) {
            pts.push(this.graph.point(this.summation(controlPoints.length - 1, 0, i, controlPoints, PointType.x ), this.summation(controlPoints.length - 1, 0, i, controlPoints, PointType.y )))
        }
        for (let i = 0; i < pts.length - 1; i++) {
            this.graph.line(pts[i], pts[i + 1])
        }
    }

}

