import Point from './Point'
import Graph from './Graph';
import Bezier from './Bezier';
import CoordBox from './CoordBox';
export default class App {
    toggler: HTMLElement;
    canvasContainer: HTMLElement;
    controlPanel: HTMLElement;
    main: HTMLElement;
    coordsContainer: HTMLElement;
    points: Point[] = [];
    graph: Graph;
    constructor() {
        this.toggler = document.getElementById('toggler');
        this.canvasContainer = document.getElementById("canvas-container");
        this.controlPanel = document.getElementById("control-panel");
        this.main = document.getElementById('main');
        this.coordsContainer = document.getElementById('coords-container');
        this.graph = new Graph({ id: "myCanvas" });
        this.points.push(this.graph.point(4, 2));
        this.points.push(this.graph.point(7, 4));
        this.points.push(this.graph.point(9, 1));
        this.points.push(this.graph.point(13, 3));

        this.toggler.addEventListener('click', this.toggle.bind(this))

        const bezier = new Bezier(this.graph);
        bezier.buildBezier(this.points);

        this.points.forEach(point => {
            this.coordsContainer.appendChild(new CoordBox(point).coordBox)
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