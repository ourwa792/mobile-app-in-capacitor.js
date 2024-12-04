import { Tile, Scrambler, Bitmap, Pic, Button, loop } from "zimjs";

export const Zim1 = function (stage) {
  zog("Zim1");

  var thumbs = [];
  var cols = 3;
  var rows = 3;

  var image = new Pic({ file: "scramble.png"});

  var w = image.width / cols;
  var h = image.height / rows;

  loop(rows, function (r) {
    loop(cols, function (c) {
      thumbs.push(new Bitmap(image, w, h, c * w, r * h));
    });
  }); 

  var tile = new Tile(thumbs, cols, rows, 0, 0, true);

  var picture = new Scrambler(tile).center();
  picture.on("complete", function () {
    image.centerReg().animate({
      props: { rotation: 720 },
      time: 2,
      ease: "backInOut",
      call: function () {
        image.bot().drag({ boundary: stage, onTop: false });
      },
    });
    picture.removeFrom();
    image.removeFrom();
    stage.update();
  });

  const back = new Button({
    width: 50,
    height: 25,
    label: "العودة",
    backgroundColor: orange,
  }).pos(90, 150);

  back.on("click", () => zgo("/"));
};
