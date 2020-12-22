import App from './classes/App';

import './styles/index.scss';

const app = new App();

import Graph from './classes/Graph';
import Bezier from './classes/Bezier';
import Point from './classes/Point';

// const graph = new Graph({id: "myCanvas", height: 768, width: 1366});

// const draw = (p1: Point, p2: Point, p3: Point, p4: Point) => {
    const graph = new Graph({ id: "myCanvas" });
    // const bezier = new Bezier(graph);
    // bezier.buildBezier([graph.point(2, 1)]);
    // // , new Point(450, 200), new Point(500, 250)]
    // bezier.showControlPoints();
    // console.log(bezier.controlPoints, graph.arm)
    // bezier.indicate();
    // bezier.buildBezier([p1, p2, p3, p4]);

    // bezier.showControlPoints();
    const pnt = graph.point(0, 0);
    const pnt2 = graph.point(2, 4);
    const pnt3 = graph.point(6, 6);
    const pnt4 = graph.point(4, 2);
    const bezier = new Bezier(graph);
    bezier.buildBezier([pnt, pnt2, pnt3, pnt4]);
    pnt.drawCircle(graph.ctx);
    pnt2.drawCircle(graph.ctx)
    pnt3.drawCircle(graph.ctx)
    pnt4.drawCircle(graph.ctx)
// }

    // draw(p1, p2, p3, p4)

// const a = document.getElementById("a") as HTMLInputElement;
// const b = document.getElementById("b") as HTMLInputElement;
// const c = document.getElementById("c") as HTMLInputElement;
// const d = document.getElementById("d") as HTMLInputElement;
// const e = document.getElementById("e") as HTMLInputElement;
// const f = document.getElementById("f") as HTMLInputElement;
// const g = document.getElementById("g") as HTMLInputElement;
// const h = document.getElementById("h") as HTMLInputElement;

// const fromInputs = () => {
//     const p1 = graph.point(Number(a.value), Number(b.value))
//     const p2 = graph.point(Number(c.value), Number(d.value))
//     const p3 = graph.point(Number(e.value), Number(f.value))
//     const p4 = graph.point(Number(g.value), Number(h.value))

//     draw(p1, p2, p3, p4)
// }

// [a, b, c, d, e, f, g, h].forEach(i => {
//     i.addEventListener('input', fromInputs)
// })

// fromInputs();


