
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

    get state() {
        return this._state
    }

    setState(value: T) {
        this.state.prev = this.state.value;
        this.state.value = value;
        this.state.subscriptions.forEach(({ handler }: { handler: handlerType<T>}) => handler({
            value: this.state.value,
            prev: this.state.prev,
        }))
    }

    updateState(value: T) {
        if (value && typeof value === "object") {
            if (Array.isArray(value)) {
                if (Array.isArray(this.state.value)) {
                    this.state.prev = this.state.value;
                    this.state.value = [...this.state.value, ...value]
                }
            } else {
                if (typeof this.state.value === 'object' && !Array.isArray(this.state.value)) {
                    this.state.prev = this.state.value;
                    this.state.value = { ...this.state.value, ...value }
                }
            }
        } else {
            this.state.prev = this.state.value;
            this.state.value = value;
            this.state.subscriptions.forEach(({ handler }: { handler: handlerType<T>}) => handler({
                value: this.state.value,
                prev: this.state.prev,
            }))
        }
    }
    
    subscribe(handler: handlerType<T>) {
        const key = makeid(7);
        this.state.subscriptions.push({ key, handler });
        return { key: this.state.subscriptions[this.state.subscriptions.length - 1].key }
    }

    unSubscibe(key: string) {
        this.state.subscriptions = this.state.subscriptions.filter(subscription => subscription.key !== key)
    }
}