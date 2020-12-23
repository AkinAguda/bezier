import App from './classes/App';

import './styles/index.scss';

const app = new App();

import Graph from './classes/Graph';
import Bezier from './classes/Bezier';

const graph = new Graph({ id: "myCanvas" });
const pnt1 = graph.point(1, 4);
const pnt2 = graph.point(5, 6);
const pnt3 = graph.point(5, 1);
const pnt4 = graph.point(8, 6);

const bezier = new Bezier(graph);
bezier.buildBezier([pnt1, pnt2, pnt3, pnt4]);
pnt1.drawCircle(graph.ctx);
pnt2.drawCircle(graph.ctx)
pnt3.drawCircle(graph.ctx)
pnt4.drawCircle(graph.ctx)