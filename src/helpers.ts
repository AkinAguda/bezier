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