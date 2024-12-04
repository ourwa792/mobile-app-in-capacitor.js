import { JSXGraph } from "jsxgraph";
import renderMathInElement from "katex/contrib/auto-render/auto-render.js";

export const board1 = () => {
  const board = JSXGraph.initBoard("jxgbox", {
    boundingbox: [-1.5, 1.5, 1.5, -1.5],
    keepAspectRatio: true,
    axis: false,
  });

  let totalParts = 5; // المقام الابتدائي
  let coloredParts = 0; // عدد الأجزاء الملونة (البسط)
  const radius = 1;

  // إعداد النص لعرض قيمة الكسر داخل اللوح
  const fractionText = board.create(
    "text",
    [-1.7, -1.2, () => `الكسر: \\(\\frac{${coloredParts}}{${totalParts}}\\)`],
    {
      fontSize: 18,
      color: "black",
    }
  );

  // وظيفة لتحديث ترميز الكسر باستخدام Mathlive
  function updateFractionText() {
    fractionText.setText(
      `الكسر: \\(\\frac{${coloredParts}}{${totalParts}}\\) `
    );
    renderMathInElement(document.getElementById("jxgbox"), {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false },
        { left: "\\(", right: "\\)", display: false },
        { left: "\\[", right: "\\]", display: true },
      ],
    });
  }

  // وظيفة لتحديث عدد القطاعات في الدائرة بناءً على المقام
  function updateSectors() {
    // إعادة تعيين العدد الملون
    coloredParts = 0;
    board.removeObject(
      board.objectsList.filter((obj) => obj.elType === "sector")
    ); // إزالة القطاعات القديمة

    // إنشاء القطاعات الجديدة
    for (let i = 0; i < totalParts; i++) {
      createSector(i);
    }
    updateFractionText(); // تحديث النص
    board.update();
  }

  // وظيفة لإنشاء وتلوين القطاعات الدائرية
  function createSector(index) {
    const angle1 = (index * 2 * Math.PI) / totalParts;
    const angle2 = ((index + 1) * 2 * Math.PI) / totalParts;

    const center = board.create("point", [0, 0], { visible: false });
    const point1 = board.create(
      "point",
      [radius * Math.cos(angle1), radius * Math.sin(angle1)],
      { visible: false }
    );
    const point2 = board.create(
      "point",
      [radius * Math.cos(angle2), radius * Math.sin(angle2)],
      { visible: false }
    );

    const sector = board.create("sector", [center, point1, point2], {
      fillColor: "white",
      fillOpacity: 0.8,
      strokeColor: "black",
      highlightStrokeColor: "black",
      strokeWidth: 1,
    });

    sector.isColored = false;

    // حدث للنقر لتلوين أو إزالة تلوين القطاع
    sector.on("down", () => {
      if (!sector.isColored) {
        sector.setAttribute({ fillColor: "orange", fillOpacity: 0.8 });
        coloredParts++;
      } else {
        sector.setAttribute({ fillColor: "white", fillOpacity: 0.8 });
        coloredParts--;
      }
      sector.isColored = !sector.isColored;
      updateFractionText(); // تحديث النص
      board.update();
    });
  }

  updateSectors();

  const input = document.createElement("input");
  input.id = "totalPartsInput";
  const lb = document.createElement("label");
  lb.setAttribute("for", "totalPartsInput");
  lb.textContent = "ادخل المقام:";

  input.addEventListener("input", (event) => {
    totalParts = parseInt(event.target.value) || 1; // تجنب القيم غير الصالحة
    console.log("totalParts " + totalParts);
    updateSectors();
  });
  document.getElementById("info").appendChild(input);
};
