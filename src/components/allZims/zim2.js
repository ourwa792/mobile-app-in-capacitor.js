import { Tile, Scrambler, Poly, Frame, Label, Rectangle, Emitter, Circle } from "zimjs";

export const Zim2 = function (stage){ 
  zog("Zim2");
  new Circle(30,red).center().drag()
 /*  zimplify();
  const assets = [""];
  const path = "/assets/";

  const scaling = "zim2";

  var frame = new Frame({
    scaling: FULL,
    height: 640,
    width: 270,
    color: light,
    outerColor: dark,
    progress: new Waiter({
      backgroundColor: blue,
      corner: 10,
    }),
    allowDefault: true,
    assets: assets,
    path: path,
    ready,
  }); */

  //new Frame(FIT, 1024, 768, light, dark, ready);

    /*      
    new Label("اولويات العمليات", 50, null, light).pos(0,100,CENTER,TOP);

    const text = series("الأقواس", "القوى", "الضرب", "القسمة", "الجمع", "الطرح");

    STYLE = {borderWidth:1}
    const words = new Tile(new Label({
        text:text, 
        size:40, 
        color:darker,
        align:CENTER,
        valign:CENTER,
        backing:new Rectangle(400,60,green)
    }), 1, 6, 0, 5);

    const scrambler = new Scrambler({
        tile:words, 
        time:2,
        num:4
    }).center().mov(0,30);

    const emitter = new Emitter({
        obj:new Poly({min:50,max:100}, [5,6,7], .6, [purple,white,yellow]),
        startPaused:true
    }).center();

    scrambler.on("complete", ()=>{
        emitter.spurt(40);
        scrambler.scramble(2,3,4);
    });

    new Label("رتب العمليات الحسابية", 25, null, light).alp(.6).pos(0,70,CENTER,BOTTOM)


    frame.madeWith().pos(40,40,RIGHT,BOTTOM);
    
    //createGreet(50,50);

    stage.update();
 */
  
};
