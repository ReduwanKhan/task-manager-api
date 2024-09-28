import UsersModel from "../model/UsersModel.js";
import { TokenEncode } from "../utility/tokenUtility.js";
import SendEmail from "../utility/emailUtility.js";

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
      let token = TokenEncode(data["email"], data["_id"]);

      return res.json({
        status: "Success",
        Message: "User Successfully Registered",
        data: { token: token },
      });
    }
  } catch (e) {
    return res.json({ status: "Fail", Message: e.toString() });
  }
};

export const ProfileDetails = async (req, res) => {
  try {
    let user_id = req.headers["user_id"];

    let data = await UsersModel.findOne({ _id: user_id });

    return res.json({
      status: "Success",
      message: "User Profile Successfully Found",
      data: data,
    });
  } catch (e) {
    return res.json({ status: "Fail", Message: e.toString() });
  }
};

export const ProfileUpdate = async (req, res) => {
  try {
    let reqBody = req.body;
    let user_id = req.headers["user_id"];
    await UsersModel.updateOne({ _id: user_id }, reqBody);
    return res.json({
      status: "Success",
      Message: "User Updated Profile",
    });
  } catch (e) {
    return res.json({ status: "Fail", Message: e.toString() });
  }
};

export const EmailVerify = async (req, res) => {
  try {
    let email = req.params.email;

    let data = await UsersModel.findOne({ email: email });
    if (data === null) {
      return res.json({ status: "Fail", Message: "User Email doesn't exists" });
    } else {
      //Send OTP to Email
      let code = Math.floor(100000 + Math.random() * 900000);
      let EmailTo = data["email"];
      let EmailText = "Your Code is " + code;
      let EmailSubject = "Task Manager Verification Code";
      await SendEmail(EmailTo, EmailText, EmailSubject);

      //Update OTP in User
      await UsersModel.updateOne({ email: email }, { otp: code });
      return res.json({
        status: "Success",
        Message: "Verification Code Sent Successfully ",
      });
    }
  } catch (e) {
    return res.json({ status: "Fail", Message: e.toString() });
  }
};

export const CodeVerify = async (req, res) => {
  try {
    let reqBody = req.body;
    let data = await UsersModel.findOne({
      email: reqBody["email"],
      otp: reqBody["otp"],
    });
    if (data === null) {
      return res.json({ status: "Fail", Message: "Wrong Verification Code" });
    } else {
      return res.json({
        status: "Success",
        Message: "Verification Successfull",
      });
    }
  } catch (e) {
    return res.json({ status: "Fail", Message: e.toString() });
  }
};

export const ResetPassword = async (req, res) => {
  try {
    let reqBody = req.body;
    let data = await UsersModel.findOne({
      email: reqBody["email"],
      otp: reqBody["otp"],
    });
    if (data === null) {
      return res.json({ status: "Fail", Message: "Wrong Verification Code" });
    } else {
      await UsersModel.updateOne(
        {
          email: reqBody["email"],
        },
        {
          otp: "0",
          password: reqBody["password"],
        }
      );
      return res.json({
        status: "Success",
        Message: "Password reset successfully",
      });
    }
  } catch (e) {
    return res.json({ status: "Fail", Message: e.toString() });
  }
};
