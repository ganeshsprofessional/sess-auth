import User from "../models/user.js";

export async function seedDB() {
  await User.deleteMany({});
  const user1 = { username: "user1", password: "password" };
  const user2 = { username: "user2", password: "password" };

  let user = await User.create(user1);
  await user.save();
  console.log(user);

  user = await User.create(user2);
  await user.save();
  console.log(user);

  console.log("Seeded db");
}
