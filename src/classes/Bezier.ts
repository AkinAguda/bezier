import Graph from './Graph';
import Point from './Point';
import State from './State';

import { combination, returnAxi, distBetweenPoints } from '../helpers';

export enum PointType {
    x,
    y
}
export default class Bezier {
    constructor(public graph: Graph) {}
    controlPoints: State<Array<Point>>;
    selectedControlPointIndex: number | null = null;

    calculateValue(n: number, i: number, t: number, axi: number) : number {
       return combination(n, i) * (Math.pow((1 - t), n - i)) * Math.pow(t, i) * axi 
    }

    summation(upperBoundary: number, lowerBoundary: number, iteration: number, points: Array<Point>, pType: PointType) : number {
        if (lowerBoundary === upperBoundary) {
            return this.calculateValue(upperBoundary, lowerBoundary, iteration, returnAxi(pType, points[lowerBoundary]))
        } else {
            return this.calculateValue(upperBoundary, lowerBoundary, iteration, returnAxi(pType, points[lowerBoundary])) + this.summation(upperBoundary, lowerBoundary + 1, iteration, points, pType)
        }
    }

    getBezierPoints(points: Array<Point>): Array<Point> {
        const pts: Array<Point> = [];
        this.controlPoints.setState([...points])
        for (let i = 0; i <= 1; i = Math.round((i + 0.05 + Number.EPSILON) * 100) / 100) {
            pts.push(this.graph.point(this.summation(points.length - 1, 0, i, points, PointType.x ), this.summation(points.length - 1, 0, i, points, PointType.y )))
        }
        return pts
    }

    drawLine(points: Array<Point>, controlPoints: Array<Point>, iter = -1) {
        requestAnimationFrame(() => this.drawLine(points, controlPoints, iter));
        if (!this.graph.drag.isDragging && (this.selectedControlPointIndex !== null)) {
            this.selectedControlPointIndex = null
        }
        if ((iter >= 0) && (iter < points.length - 1)) {
            this.graph.line(points[iter], points[iter + 1])
        } else {
            this.controlPoints.state.forEach((controlPoint, index) => {
                if (this.graph.drag.isDragging && (this.selectedControlPointIndex === null)) {
                    if (distBetweenPoints(controlPoint, this.graph.drag.point) <= 5) {
                        this.selectedControlPointIndex = index
                    }
                }
                if (this.selectedControlPointIndex !== null) {
                    controlPoints[this.selectedControlPointIndex].setX(this.graph.drag.point.x);
                    controlPoints[this.selectedControlPointIndex].setRawX(this.graph.drag.point.rawX);
                    controlPoints[this.selectedControlPointIndex].setY(this.graph.drag.point.y);
                    controlPoints[this.selectedControlPointIndex].setRawY(this.graph.drag.point.rawY);
                    this.generateCurve(controlPoints)
                }
            })
        }
        iter ++
    }

    generateCurve(points: Array<Point>) {
        const computedPoints = this.getBezierPoints(points);
        this.graph.clear();
        points.forEach(cp => {
            cp.drawCircle(this.graph.ctx)
        })
        for (let i = 0; i < computedPoints.length - 1; i++) {
            this.graph.line(computedPoints[i], computedPoints[i + 1])
        }
    }

    buildBezier(controlPoints: State<Array<Point>>) {
        this.graph.clear();
        this.controlPoints = controlPoints;
        this.controlPoints.state.forEach(cp => {
            cp.drawCircle(this.graph.ctx)
        })
        const points = this.getBezierPoints(controlPoints.state)
        this.drawLine(points, controlPoints.state)
    }

}

