import * as userRepository from "./user.repository.js";
import bcrypt from "bcrypt";
import { Types } from "mongoose";
import { validateUser } from "../../common/validation/validate.js";

export async function signup(userData) {
  const userExist = await userRepository.checkUserExistByEmail(userData.email);
  if (userExist) throw new Error("User Already Exists.");

  userData.password = await bcrypt.hash(userData.password, 10);

  const createdUser = await userRepository.createUser(userData);

  return createdUser;
}

export async function login(userData) {
  const userExist = await userRepository.checkUserExistByEmail(userData.email);
  if (!userExist) throw new Error("Invalid email or password.");

  const match = await bcrypt.compare(userData.password, userExist.password);
  if (!match) throw new Error("Invalid email or password.");

  // return true;
}

export async function updateUserInfo(id, name, email, age) {
  await validateUser(id);

  const userExist = await userRepository.checkUserExistByEmail(email);
  if (userExist) throw new Error("User Already Exists.");

  return await userRepository.updateUser(id, name, email, age);
}

export async function deleteUser(id) {
  if (!Types.ObjectId.isValid(id)) throw new Error("User id not valid.");

  const deletedUser = await userRepository.deleteUser(id);
  if (!deletedUser) throw new Error("User not found.");

  return deletedUser;
}

export async function getUserById(id) {
  const user = await validateUser(id);

  return user;
}
