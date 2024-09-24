import UsersModel from "../model/UsersModel.js";

export const Registration = async (req, res) => {
  try {
    let reqBody = req.body;
    await UsersModel.create(reqBody);
    return res.json({
      status: "Success",
      Message: "User Successfully Registered",
    });
  } catch (e) {
    return res.json({ status: "Fail", Message: e.toString() });
  }
};

export const Login = async (req, res) => {
  try {
    let reqBody = req.body;
    let data = await UsersModel.findOne(reqBody);
    if (data === null) {
      return res.json({ status: "Fail", Message: "User Not Found" });
    } else {
      return res.json({
        status: "Success",
        Message: "User Successfully Registered",
      });
    }
    await UsersModel.create(reqBody);
  } catch (e) {
    return res.json({ status: "Fail", Message: e.toString() });
  }
};

export const ProfileDetails = async (req, res) => {
  return res.json({ status: "Success" });
};

export const ProfileUpdate = async (req, res) => {
  return res.json({ status: "Success" });
};

export const EmailVerify = async (req, res) => {
  return res.json({ status: "Success" });
};

export const CodeVerify = async (req, res) => {
  return res.json({ status: "Success" });
};

export const ResetPassword = async (req, res) => {
  return res.json({ status: "Success" });
};
