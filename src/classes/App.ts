import ResizeObserver from "resize-observer-polyfill";
import Point from "./Point";
import Graph from "./Graph";
import Bezier from "./Bezier";
import CoordBox from "./CoordBox";
import State from "./State";

export default class App {
  toggler: HTMLElement;
  canvasContainer: HTMLElement;
  controlPanel: HTMLElement;
  main: HTMLElement;
  coordsContainer: HTMLElement;
  points: State<Array<Point>> = new State([]);
  graph: Graph;
  bezier: Bezier;
  hamburger: HTMLButtonElement;

  constructor() {
    this.toggler = document.getElementById("toggler");
    this.canvasContainer = document.getElementById("canvas-container");
    this.controlPanel = document.getElementById("control-panel");
    this.main = document.getElementById("main");
    this.coordsContainer = document.getElementById("coords-container");
    this.graph = new Graph({ id: "myCanvas", points: this.points });
    this.hamburger = document.getElementById("hamburger") as HTMLButtonElement;
    const defaultPoints = this._getInitialCoords();

    this.points.setState(defaultPoints);
    this.points.subscribe(this.renderInputs.bind(this));
    this.hamburger.addEventListener("click", this.toggle.bind(this));
    this.toggler.addEventListener("click", this.toggle.bind(this));
    this.bezier = new Bezier(this.graph);
    this.bezier.buildBezier(this.points);
  }

  private _getInitialCoords(): Point[] {
    const coordConstants = [
      this.graph.point(3, 4),
      this.graph.point(6, 6),
      this.graph.point(8, 2),
      this.graph.point(12, 5),
    ];
    return coordConstants.map((point) =>
      this.graph.point(
        Math.floor((point.x / 751) * this.canvasContainer.clientWidth),
        Math.floor((point.y / 485) * this.canvasContainer.clientHeight)
      )
    );
  }

  renderInputs() {
    while (this.coordsContainer.firstChild) {
      this.coordsContainer.removeChild(this.coordsContainer.lastChild);
    }
    this.points.state.forEach((point) => {
      this.coordsContainer.appendChild(new CoordBox(point, this).coordBox);
    });
  }

  toggle() {
    if (this.main.classList.contains("closed")) {
      this.main.classList.remove("closed");
    } else {
      this.main.classList.add("closed");
    }
  }
}
