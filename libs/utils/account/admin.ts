const admins = [
  //rocketman
  "4c51defb-6d8f-46ec-8c3c-f233e691356f",
  //woj
  "261e1155-f73f-4c1c-808d-c3fc2abb1e8b",
  //christian
  "f3bca849-25bf-49e8-9d38-75ab5629f47e",
  //seth
  "8a8c4301-46b9-4b1e-8c1a-08e23c3b59a5",
  //brian
  "d133e521-f969-4360-b269-73ee3550d77b",
  //ashanti
  "647b4d07-9286-4428-bb0b-991eeb0ddb7b",
];

export const isAdmin = (userId?: string) => userId && admins.includes(userId);
