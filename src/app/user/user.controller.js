import * as userService from "./user.service.js";

export async function signup(req, res, next) {
  try {
    await userService.signup(req.body);
    res.json({
      message: "User created successfully",
      success: true,
    });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    await userService.login(req.body);
    res.json({
      message: "Logged in successfully",
      success: true,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateUserInfo(req, res, next) {
  try {
    const id = req.params.id;
    const { name, email, age } = req.body;
    await userService.updateUserInfo(id, name, email, age);

    res.json({
      message: "User updated successfully",
      success: true,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(req, res, next) {
  try {
    const id = req.params.id;
    await userService.deleteUser(id);

    res.json({
      message: "User deleted successfully",
      success: true,
    });
  } catch (err) {
    next(err);
  }
}

export async function getUserById(req, res, next) {
  try {
    const id = req.params.id;
    const user = await userService.getUserById(id);

    res.json({
      message: "User found successfully",
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
}
