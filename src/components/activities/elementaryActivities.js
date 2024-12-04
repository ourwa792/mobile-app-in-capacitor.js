import { board1 } from "../boards/elementaryBoards/board1";

export const elementaryActivities = {
  title: "المرحلة الابتدائية",
  topics: [
    {
      id: 1,
      title: "الكسور البسيطة",
      description: ` <p>يمكنك هنا رسم و تلوين دوائر و أجزاء منها </p> <br>
       يتم تمثيل الكسر من خلال البسط و المقام يعبر البسط عن الجزء و المقام عن الكل 
      `,
      board: {
        equation: "$$\\frac{2}{3} مثال: و \\frac{1}{7}$$",
      },
      math: board1,
    },
  ],
};
