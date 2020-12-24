import App from './classes/App';

import './styles/index.scss';

const app = new App();

import Graph from './classes/Graph';
import Bezier from './classes/Bezier';

const graph = new Graph({ id: "myCanvas" });
const pnt1 = graph.point(4, 2);
const pnt2 = graph.point(7, 6);
const pnt3 = graph.point(9, 1);
const pnt4 = graph.point(13, 6);
// const pnt5 = graph.point(16, 3);

const bezier = new Bezier(graph);
bezier.buildBezier([pnt1, pnt2, pnt3, pnt4]);
pnt1.drawCircle(graph.ctx);
pnt2.drawCircle(graph.ctx)
pnt3.drawCircle(graph.ctx)
pnt4.drawCircle(graph.ctx)