import { User } from "./user.model.js";

export async function checkUserExistByEmail(email) {
  return await User.findOne({ email });
}

export async function createUser(userData) {
  return await User.create(userData);
}

export async function updateUser(id, name, email, age) {
  return await User.updateOne({ _id: id }, { name, email, age });
}

export async function deleteUser(id) {
  return await User.findByIdAndDelete(id);
}

export async function getUserById(id) {
  return await User.findById(id);
}
