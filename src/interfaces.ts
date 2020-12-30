export interface GraphInterfaces {
    id: string,
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