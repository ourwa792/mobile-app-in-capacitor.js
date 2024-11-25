import { JSXGraph } from "jsxgraph";

export const board1 = () => {
/*   const brd = JSXGraph.initBoard("jxgbox", {
    boundingbox: [-5, 5, 5, -5],
    keepAspectRatio: true,
    axis: true,
  });

  brd.create("button", [
    3,
    2,
    "click",
    function () {
      brd.create("circle", [[-2, 0], 2]);
    },
  ]);
 */

  const board = JSXGraph.initBoard("jxgbox", {
    boundingBox: [-5,5,5,-5] ,
    keepAspectRatio: true,
    axis: true
  });

  
  var a = board.create('point', [0,3], {name: 'A', color: 'blue'});
  var o = board.create('point', [0, -1], {name: 'O', color: 'red'});
  
  var ellipse = board.create('ellipse', [[4,-1],[-4,-1] , [1,0]], {
      strokeColor: 'red',
      strokeWidth:3,
      fillColor: 'blue',     
      fillOpacity: 0.5
  });
  
  var b = board.create('glider', [4, 1, ellipse], {name: 'B', color: 'blue'});

  board.create('segment', [a,b], {
      trace: true,
      strokeColor: 'green',
      strokeWidth: 2
  });
  board.create('segment', [a,o], {
      strokeColor: 'black',
      strokeWidth: 1
  });

  board.create("button", [4,4,"start", ()=> {
      b.startAnimation(1, 140, 350)
  }])

  const view = board.create('view3d', [[-6, -3], [8, 8], [[-5, 5], [-5, 5], [-5, 5]]], {
    xPlaneRear: { visible: false },
    yPlaneRear: { visible: false }
});

view.create("")

};
