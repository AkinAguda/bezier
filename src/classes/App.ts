export default class App {
    toggler: HTMLElement;
    canvasContainer: HTMLElement;
    controlPanel: HTMLElement;
    main: HTMLElement;
    constructor() {
        this.toggler = document.getElementById('toggler');
        this.canvasContainer = document.getElementById("canvas-container");
        this.controlPanel = document.getElementById("control-panel");
        this.main = document.getElementById('main');
    }

    toggle() {
        if (this.main.classList.contains('closed')) {
            this.main.classList.remove('closed')
        } else {
            this.main.classList.add('closed')
        }
    }

    instantiate() {
        this.toggler.addEventListener('click', this.toggle.bind(this))
    }
}