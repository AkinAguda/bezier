
import { StateInterface, handlerType } from '../interfaces';
import { makeid } from '../helpers';

export default class State<T> {
    private _state: StateInterface<T>;
    constructor(public stateValues: T){
        this._state = {
            value: stateValues,
            prev: stateValues,
            subscriptions: [],
        }
    }

    get state(): T {
        return this._state.value
    }

    setState(value: T) {
        this._state.prev = this._state.value;
        this._state.value = value;
        this._state.subscriptions.forEach(({ handler }: { handler: handlerType<T>}) => handler({
            value: this._state.value,
            prev: this._state.prev,
        }))
    }

    updateState(value: T) {
        if (value && typeof value === "object") {
            if (Array.isArray(value)) {
                if (Array.isArray(this._state.value)) {
                    this._state.prev = this._state.value;
                    this._state.value = [...this._state.value, ...value];
                }
            } else {
                if (typeof this._state.value === 'object' && !Array.isArray(this._state.value)) {
                    this._state.prev = this._state.value;
                    this._state.value = { ...this._state.value, ...value }
                }
            }
        } else {
            this._state.prev = this._state.value;
            this._state.value = value;
            this._state.subscriptions.forEach(({ handler }: { handler: handlerType<T>}) => handler({
                value: this._state.value,
                prev: this._state.prev,
            }))
        }
    }
    
    subscribe(handler: handlerType<T>) {
        const key = makeid(7);
        this._state.subscriptions.push({ key, handler });
        return { key: this._state.subscriptions[this._state.subscriptions.length - 1].key }
    }

    unSubscibe(key: string) {
        this._state.subscriptions = this._state.subscriptions.filter(subscription => subscription.key !== key)
    }
}