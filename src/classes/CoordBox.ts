import { makeid } from '../helpers';
import State from './State';
import Point from './Point';

export default class CoordBox {
    id: string;
    coordBox: HTMLDivElement;
    point: Point;
    xInputNode: HTMLInputElement;
    yInputNode: HTMLInputElement;
    constructor(point: Point, public controlPoints: State<Array<Point>>) {
        this.id = makeid(5);
        this.point = point;

        // <div class="coord-box">
        //     <div class="coord-section">
        //         <input type='number' id='x-coord'/>
        //         <input type='number' id='y-coord' />
        //     </div>
        //     <div class="add-red-container">
        //         <button class="add-coord-box"></button>
        //         <button class="remove-coord-box"></button>
        //     </div>
        // </div>

        const coordBox = document.createElement('div');
        coordBox.classList.add('coord-box');

        const coordSection = document.createElement('div');
        coordSection.classList.add('coord-section');

        const xInput = document.createElement('input');
        xInput.type = 'number';
        xInput.id = `x-coord-${this.id}`;
        xInput.onchange = this.xOnChange;
        xInput.value = this.point.x.toString();
        this.xInputNode = xInput;
        
        const yInput = document.createElement('input');
        yInput.type = 'number';
        yInput.id = `y-coord-${this.id}`;
        yInput.onchange = this.yOnChange;
        yInput.value = this.point.y.toString();
        this.yInputNode = yInput;

        coordSection.appendChild(xInput);
        coordSection.appendChild(yInput);

        coordBox.appendChild(coordSection); 

        const controlsContainer = document.createElement('div');

        controlsContainer.classList.add('add-red-container');

        const addButton = document.createElement('button');
        addButton.classList.add('add-coord-box');

        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-coord-box');
        removeButton.onclick = () => this.removePoint.call(this, this.point);

        controlsContainer.appendChild(addButton);
        controlsContainer.appendChild(removeButton);

        coordBox.appendChild(controlsContainer);
        coordBox.onclick
        this.coordBox = coordBox
    }
    setValues(point: Point) {
        this.xInputNode.value = point.x.toString();
        this.yInputNode.value = point.y.toString();
    }
    removePoint(point: Point) {
        this.controlPoints.setState(this.controlPoints.state.filter(controlPoint => controlPoint.id !== point.id))
    }
    xOnChange(event: Event) {
    }
    yOnChange(event: MouseEvent) {
    }
}