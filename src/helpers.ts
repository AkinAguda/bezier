import { PointType } from "./classes/Bezier";
import Point from "./classes/Point";

export const factorial = (num: number): number => {
    if(num <= 1) {
        return 1
    } else {
        return num * factorial(num - 1)
    }
}

export const combination = (n: number, r: number) => factorial(n)/(factorial(n - r) * factorial(r));

export const returnAxi = (pType: PointType, point: Point) => {
    if (pType === PointType.x) {
        return point.x
    } else if (pType === PointType.y) {
        return point.y
    }
}

export const distBetweenPoints = (point1: Point, point2: Point): number => {
    const opposite = Math.abs(point1.rawY - point2.rawY);
    const adjacent = Math.abs(point1.rawX - point2.rawX);
    const hypotenuse = Math.sqrt(Math.pow(opposite, 2) + Math.pow(adjacent, 2));
    return hypotenuse
}