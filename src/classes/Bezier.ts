import Graph from './Graph';
import Point from './Point';
import State from './State';

import { combination, returnAxis, distBetweenPoints } from '../helpers';

export enum PointType {
    x,
    y
}

export default class Bezier {
    constructor(public graph: Graph) {
        this.graph.canvas.addEventListener('mouseout', () => {
            this.selectedControlPointIndex = null;
            this.graph.drag.isDragging = false;
        })
    }
    controlPoints: State<Array<Point>>;
    selectedControlPointIndex: number | null = null;

    calculateValue(n: number, i: number, t: number, axi: number) : number {
       return combination(n, i) * (Math.pow((1 - t), n - i)) * Math.pow(t, i) * axi 
    }

    summation(upperBoundary: number, lowerBoundary: number, iteration: number, points: Array<Point>, pType: PointType) : number {
        if (lowerBoundary === upperBoundary) {
            return this.calculateValue(upperBoundary, lowerBoundary, iteration, returnAxis(pType, points[lowerBoundary]))
        } else {
            return (
            this.calculateValue(upperBoundary, lowerBoundary, iteration, returnAxis(pType, points[lowerBoundary]))
            + this.summation(upperBoundary, lowerBoundary + 1, iteration, points, pType)
            )
        }
    }

    getBezierPoints(points: Array<Point>): Array<Point> {
        const pts: Array<Point> = [];
        this.controlPoints.setState([...points])
        for (let i = 0; i <= 1; i = Math.round((i + 0.02 + Number.EPSILON) * 100) / 100) {
            pts.push(this.graph.point(this.summation(points.length - 1, 0, i, points, PointType.x ), this.summation(points.length - 1, 0, i, points, PointType.y )))
        }
        return pts
    }

    drawLine(points: Array<Point>, iter = -1) {
        requestAnimationFrame(() => this.drawLine(points, iter));
        if (!this.graph.drag.isDragging && (this.selectedControlPointIndex !== null)) {
            this.selectedControlPointIndex = null
        }
        if ((iter >= 0) && (iter < points.length - 1)) {
            this.graph.line(points[iter], points[iter + 1]);
        } else {
            this.controlPoints.state.forEach((controlPoint, index) => {
                if (this.graph.drag.isDragging && (this.selectedControlPointIndex === null)) {
                    if (distBetweenPoints(controlPoint, this.graph.drag.point) <= controlPoint.radius) {
                        this.selectedControlPointIndex = index
                    }
                }
                if (this.selectedControlPointIndex !== null) {
                    const newState = [...this.controlPoints.state]
                    newState[this.selectedControlPointIndex].setX(Number(this.graph.drag.point.x.toFixed(2)));
                    newState[this.selectedControlPointIndex].setRawX(Number(this.graph.drag.point.rawX.toFixed(2)));
                    newState[this.selectedControlPointIndex].setY(Number(this.graph.drag.point.y.toFixed(2)));
                    newState[this.selectedControlPointIndex].setRawY(Number(this.graph.drag.point.rawY.toFixed(2)));
                    this.controlPoints.setState(newState);
                    this.generateCurve(this.controlPoints.state)
                }
            })
        }
        iter ++
    }

    generateCurve(points: Array<Point>) {
        const computedPoints = this.getBezierPoints(points);
        this.graph.clear();
        this.graph.defaultStyles();
        this.indicatePoints();
        for (let i = 0; i < computedPoints.length - 1; i++) {
            this.graph.line(computedPoints[i], computedPoints[i + 1])
        }
    }

    indicatePoints() {
        this.controlPoints.state.forEach((controlPoint, index, arr) => {
            if (index === 0 || index === this.controlPoints.state.length - 1) {
                controlPoint.drawCircle(this.graph, true)
            }
            controlPoint.drawCircle(this.graph)
        })
    }

    buildBezier(controlPoints: State<Array<Point>>) {
        this.graph.clear();
        this.controlPoints = controlPoints;
        const points = this.getBezierPoints(controlPoints.state)
        this.drawLine(points);
        this.indicatePoints();
    }

}

