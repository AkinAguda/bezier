import { makeid } from '../helpers';
import State from './State';
import Point from './Point';
import Graph from './Graph';
// import Bezier from './Bezier';
import App from './App';

export default class CoordBox {
    id: string;
    coordBox: HTMLDivElement;
    point: Point;
    xInputNode: HTMLInputElement;
    yInputNode: HTMLInputElement;
    constructor(point: Point, public app: App) {
        this.id = makeid(5);
        this.point = point;

        /*
        This is the html that is being generated

        <div class="coord-box">
            <div class="coord-section">
                <input type='number' id='x-coord'/>
                <input type='number' id='y-coord' />
            </div>
            <div class="add-red-container">
                <button class="add-coord-box"></button>
                <button class="remove-coord-box"></button>
            </div>
        </div> */

        const coordBox = document.createElement('div');
        coordBox.classList.add('coord-box');

        const coordSection = document.createElement('div');
        coordSection.classList.add('coord-section');

        const xInput = document.createElement('input');
        xInput.type = 'number';
        xInput.id = `x-coord-${this.id}`;
        xInput.onchange = this.xOnChange.bind(this);
        xInput.value = this.point.x.toString();
        this.xInputNode = xInput;
        
        const yInput = document.createElement('input');
        yInput.type = 'number';
        yInput.id = `y-coord-${this.id}`;
        yInput.onchange = this.yOnChange.bind(this);
        yInput.value = this.point.y.toString();
        this.yInputNode = yInput;

        coordSection.appendChild(xInput);
        coordSection.appendChild(yInput);

        coordBox.appendChild(coordSection); 

        const controlsContainer = document.createElement('div');

        controlsContainer.classList.add('add-red-container');
        const addButton = document.createElement('button');
        addButton.classList.add('add-coord-box');
        addButton.onclick = () => this.addNewPointAfterPoint.call(this, point)
        controlsContainer.appendChild(addButton);

        if(this.app.points.state.length > 1) {
            const removeButton = document.createElement('button');
            removeButton.classList.add('remove-coord-box');
            removeButton.onclick = () => this.removePoint.call(this, this.point);
            controlsContainer.appendChild(removeButton);
        }

        coordBox.appendChild(controlsContainer);
        this.coordBox = coordBox
    }
    setValues(point: Point) {
        this.xInputNode.value = point.x.toString();
        this.yInputNode.value = point.y.toString();
    }
    removePoint(point: Point) {
        this.app.points.setState(this.app.points.state.filter(controlPoint => controlPoint.id !== point.id));
        this.app.bezier.buildBezier(this.app.points)
    }
    addNewPointAfterPoint(point: Point) {
        const pointIndex = this.app.points.state.findIndex(controlPoint => controlPoint === point);
        const arr1 = this.app.points.state.slice(0, pointIndex + 1);
        const arr2 = this.app.points.state.slice(pointIndex + 1);
        arr1.push(this.app.graph.point(0.5, 0.5));
        this.app.points.setState([...arr1, ...arr2]);
        this.app.bezier.buildBezier(this.app.points)
    }
    xOnChange(event: KeyboardEvent) {
        const value = (event.target as HTMLInputElement).value;
        if (value && (value !== this.point.x.toString())) {
            this.app.points.setState(this.app.points.state.map(point => {
                if (point.id === this.point.id) {
                    return this.app.graph.point(Number(value), point.y)
                } else {
                    return point
                }
            }))
        }
        this.app.bezier.generateCurve(this.app.points.state);
    }
    yOnChange(event: KeyboardEvent) {
        const value = (event.target as HTMLInputElement).value;
        if (value && (value !== this.point.y.toString())) {
            this.app.points.setState(this.app.points.state.map(point => {
                if (point.id === this.point.id) {
                    return this.app.graph.point(point.x, Number(value))
                } else {
                    return point
                }
            }))
        }
        this.app.bezier.generateCurve(this.app.points.state);
    }
}