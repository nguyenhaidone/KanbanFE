export const initialData = {
  boards: [
    {
      id: "board-1",
      columnOrder: [
        "column-1",
        "column-2",
        "column-3",
        "column-4",
        "column-5",
        "column-6",
      ],
      columns: [],
    },
  ],
};
// export const initialData = {
//   boards: [
//     {
//       id: "board-1",
//       columnOrder: [
//         "column-1",
//         "column-2",
//         "column-3",
//         "column-4",
//         "column-5",
//         "column-6",
//       ],
//       columns: [
//         {
//           id: "column-1",
//           boardId: "board-1",
//           title: "Backlog 🤖",
//           cardOrder: ["card-1", "card-2", "card-3"],
//           cards: [
//             {
//               id: "card-1",
//               boardId: "board-1",
//               columnId: "column-1",
//               title: "To do card 1",
//               cover: null,
//             },
//             {
//               id: "card-2",
//               boardId: "board-1",
//               columnId: "column-1",
//               title: "To do card 2",
//               cover: null,
//             },
//             {
//               id: "card-3",
//               boardId: "board-1",
//               columnId: "column-1",
//               title: "To do card 3",
//               cover: null,
//             },
//           ],
//         },
//         {
//           id: "column-2",
//           boardId: "board-1",
//           title: "Design 🎨",
//           cardOrder: ["card-8", "card-9", "card-10"],
//           cards: [
//             {
//               id: "card-8",
//               boardId: "board-1",
//               columnId: "column-1",
//               title: "To do card 1",
//               cover: null,
//             },
//             {
//               id: "card-9",
//               boardId: "board-1",
//               columnId: "column-2",
//               title: "To do card 2",
//               cover: null,
//             },
//             {
//               id: "card-10",
//               boardId: "board-1",
//               columnId: "column-3",
//               title: "To do card 3",
//               cover: null,
//             },
//           ],
//         },
//         {
//           id: "column-3",
//           boardId: "board-1",
//           title: "To do 💻",
//           cardOrder: ["card-11", "card-12", "card-13 "],
//           cards: [
//             {
//               id: "card-11",
//               boardId: "board-1",
//               columnId: "column-3",
//               title: "To do card 1",
//               cover:
//                 "https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg?auto=compress&cs=tinysrgb&w=800",
//             },
//             {
//               id: "card-12",
//               boardId: "board-1",
//               columnId: "column-3",
//               title: "To do card 2",
//               cover: null,
//             },
//             {
//               id: "card-13",
//               boardId: "board-1",
//               columnId: "column-3",
//               title: "To do card 3",
//               cover: null,
//             },
//           ],
//         },
//         {
//           id: "column-4",
//           boardId: "board-1",
//           title: "Doing 🏋️",
//           cardOrder: ["card-44", "card-45", "card-46"],
//           cards: [
//             {
//               id: "card-44",
//               boardId: "board-1",
//               columnId: "column-4",
//               title: "To do card 1",
//               cover:
//                 "https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg?auto=compress&cs=tinysrgb&w=800",
//             },
//             {
//               id: "card-45",
//               boardId: "board-1",
//               columnId: "column-4",
//               title: "To do card 2",
//               cover: null,
//             },
//             {
//               id: "card-46",
//               boardId: "board-1",
//               columnId: "column-4",
//               title: "To do card 3",
//               cover: null,
//             },
//           ],
//         },
//         {
//           id: "column-5",
//           boardId: "board-1",
//           title: "Code review ☕",
//           cardOrder: ["card-55", "card-56", "card-57", "card-58", "card-59"],
//           cards: [
//             {
//               id: "card-55",
//               boardId: "board-1",
//               columnId: "column-5",
//               title: "To do card 1",
//               cover:
//                 "https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg?auto=compress&cs=tinysrgb&w=800",
//             },
//             {
//               id: "card-56",
//               boardId: "board-1",
//               columnId: "column-5",
//               title: "To do card 2",
//               cover: null,
//             },
//             {
//               id: "card-57",
//               boardId: "board-1",
//               columnId: "column-5",
//               title: "To do card 3",
//               cover: null,
//             },
//             {
//               id: "card-58",
//               boardId: "board-1",
//               columnId: "column-5",
//               title: "To do card 3",
//               cover: null,
//             },
//             {
//               id: "card-59",
//               boardId: "board-1",
//               columnId: "column-5",
//               title: "To do card 3",
//               cover:
//                 "https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg?auto=compress&cs=tinysrgb&w=800",
//             },
//           ],
//         },
//         {
//           id: "column-6",
//           boardId: "board-1",
//           title: "Done 💯",
//           cardOrder: ["card-66", "card-67", "card-68"],
//           cards: [
//             {
//               id: "card-66",
//               boardId: "board-1",
//               columnId: "column-6",
//               title: "To do card 1",
//               cover:
//                 "https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg?auto=compress&cs=tinysrgb&w=800",
//             },
//             {
//               id: "card-67",
//               boardId: "board-1",
//               columnId: "column-6",
//               title: "To do card 2",
//               cover: null,
//             },
//             {
//               id: "card-68",
//               boardId: "board-1",
//               columnId: "column-6",
//               title: "To do card 3",
//               cover: null,
//             },
//           ],
//         },
//       ],
//     },
//   ],
// };
