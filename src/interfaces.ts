export interface GraphInterfaces {
    id: string,
}
export interface HandlerParameters<T> {
    value: T | Array<any> | {};
    prev: T | Array<any> | {}
}

export type handlerType<T> = (params: HandlerParameters<T>) => void;
export interface StateInterface<T> {
    value: T | Array<any>,
    prev: T | Array<any>,
    subscriptions: Array<{key: string, handler: handlerType<T>}>
}