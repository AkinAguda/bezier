import Point from './Point'
import Graph from './Graph';
import Bezier from './Bezier';
import CoordBox from './CoordBox';
import State from './State';
export default class App {
    toggler: HTMLElement;
    canvasContainer: HTMLElement;
    controlPanel: HTMLElement;
    main: HTMLElement;
    coordsContainer: HTMLElement;
    points: State<Array<Point>> = new State([]);
    graph: Graph;
    constructor() {
        this.toggler = document.getElementById('toggler');
        this.canvasContainer = document.getElementById("canvas-container");
        this.controlPanel = document.getElementById("control-panel");
        this.main = document.getElementById('main');
        this.coordsContainer = document.getElementById('coords-container');
        this.graph = new Graph({ id: "myCanvas" });
        const defaultPoints = [this.graph.point(4, 2), this.graph.point(7, 4), this.graph.point(9, 1), this.graph.point(3, 3)]

        this.points.setState(defaultPoints);
        this.points.subscribe(this.renderInputs.bind(this))
        this.toggler.addEventListener('click', this.toggle.bind(this))
        const bezier = new Bezier(this.graph);
        bezier.buildBezier(this.points);

    }

    renderInputs() {
        while(this.coordsContainer.firstChild) {
            this.coordsContainer.removeChild(this.coordsContainer.lastChild)
        }
        this.points.state.forEach(point => {
            this.coordsContainer.appendChild(new CoordBox(point, this.points).coordBox)
        })
    }

    toggle() {
        if (this.main.classList.contains('closed')) {
            this.main.classList.remove('closed')
        } else {
            this.main.classList.add('closed')
        }
    }
}