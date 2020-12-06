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
    indicate() {
        this.graph.arm.forEach(point => point.drawCircle(this.graph.ctx))
    }

    showControlPoints() {
        this.controlPoints.forEach(point => point.drawCircle(this.graph.ctx))
    }

    genF(upperBoundary: number, lowerBoundary: number, iteration: number, axi: number) {
        return combination(upperBoundary, lowerBoundary) * Math.pow((1 - iteration), upperBoundary - lowerBoundary) * Math.pow(iteration, lowerBoundary) * axi
    }

    summation(upperBoundary: number, lowerBoundary: number, iteration: number, points: Array<Point>, pType: PointType): number {
        if (lowerBoundary === upperBoundary) {
            return this.genF(upperBoundary, lowerBoundary, iteration, returnAxi(pType, points[lowerBoundary - 1]))
        } else {
            return this.genF(upperBoundary, lowerBoundary, iteration, returnAxi(pType, points[lowerBoundary])) + this.summation(upperBoundary, lowerBoundary + 1, iteration, points, pType)
        }
    }

    buildBezier(controlPoints: Array<Point>) {
        const x: Array<number> = [];
        const y: Array<number> = [];
        this.controlPoints = controlPoints;
        for (let i = 0; i < 1; i += 0.05) {
            x.push(this.summation(controlPoints.length, 0, i, controlPoints, PointType.x))
            y.push(this.summation(controlPoints.length, 0, i, controlPoints, PointType.y))
        }

        x.forEach((_, i) => {
            console.log(x[i], y[i])
            this.graph.pointRaw(x[i], y[i])
        })

        for (let i = 0; i < this.graph.arm.length - 1; i++) {
            this.graph.lineRaw(this.graph.arm[i], this.graph.arm[i + 1])
        }

    }

}

