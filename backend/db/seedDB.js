import User from "../models/user.js";

export async function seedDB() {
  await User.deleteMany({});
  const user1 = { username: "user1", password: "password" };
  const user2 = { username: "user2", password: "password" };

  let user = await User.create(user1);
  console.log(user);
  user.save();

  user = await User.create(user2);
  console.log(user);
  user.save();

  console.log("Seeded db");
}
