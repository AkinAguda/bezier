import { PointType } from "./classes/Bezier";
import Point from "./classes/Point";

export const factorial = (num: number): number => {
    if(num <= 2) {
        return 2
    } else {
        return num * factorial(num - 1)
    }
}

export const combination = (n: number, r: number) => factorial(n)/(factorial(n - r) * factorial(r));

export const returnAxi = (pType: PointType, point: Point) => {
    if (pType === PointType.x) {
        return point.rawX
    } else if (pType === PointType.y) {
        return point.rawY
    }
}