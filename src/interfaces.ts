import State from './classes/State';
import Point from './classes/Point';

export interface GraphInterfaces {
    id: string,
    points?: State<Array<Point>>
}
export interface HandlerParameters<T> {
    value: T;
    prev: T
}

export type handlerType<T> = (params: HandlerParameters<T>) => void;
export interface StateInterface<T> {
    value: T | any,
    prev: T | any,
    subscriptions: Array<{key: string, handler: handlerType<T>}>
}