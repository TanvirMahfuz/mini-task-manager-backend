import User from "../model/userModel.js";
import {createToken, verifyToken} from "../utility/tokenUtility.js";
import {SendMail} from "../utility/mailUtility.js";
export const registration = async (req, res) => {
  const data = req.body;
  try {
    const user = await User.findOne({email: data.email});
    if (user) {
      return res.json({
        status: false,
        message: "User already exists",
      });
    }
    const userData = await User.create(data);
    if (!userData) {
      return res.json({
        status: false,
        message: "Registration Failed",
      });
    }
    return res.json({
      status: true,
      message: "Registration Successfully",
    });
  } catch (error) {
    console.error(error.message);
    return res.json({
      status: false,
      message: error.message,
    });
  }
};
export const login = async (req, res) => {
  try {
    const data = req.body;
    const user = await User.findOne({email: data.email});
    if (!user) {
      return res.json({
        status: false,
        message: "User not found",
      });
    }
    if (user.password !== data.password) {
      return res.json({
        status: false,
        message: "Password not match",
      });
    }
    const token = createToken(user.email, user._id);
    console.log(token);
    if (!token) {
      return res.json({
        status: false,
        message: "Token not created",
      });
    }
    return res.json({
      status: true,
      message: "logged in Successfully",
      data: user,
    });
  } catch (error) {
    console.error(error.message);
    return res.json({
      status: false,
      message: error.message,
    });
  }
};
export const profileDetails = async (req, res) => {
  const user = await User.findById(req.headers.id);
  return res.json({
    status: true,
    message: "Registration Successfully",
    user: user,
  });
};
export const updateProfile = async (req, res) => {
  const data = req.body;
  try {
    const user = await User.findOne({email: req.headers.email});
    if (!user) {
      return res.json({
        status: false,
        message: "User not registered",
      });
    }
    console.log(data);
    const userData = await User.updateOne({_id: user._id}, data);
    console.log(userData);
    if (!userData) {
      return res.json({
        status: false,
        message: "update Failed",
      });
    }
    return res.json({
      status: true,
      message: "updated Successfully",
    });
  } catch (error) {
    console.error(error.message);
    return res.json({
      status: false,
      message: error.message,
    });
  }
};
export const emailVerify = async (req, res) => {
  try {
    const email = req.headers.email;
    const otp = Math.floor(100000 + Math.random() * 900000);
    //checking if user exists and updating otp
    const user = await User.findOneAndUpdate(
      {email: email},
      {otp: otp},
      {new: true}
    );
    if (!user) {
      return res.json({
        status: false,
        message: "User not registered",
      });
    }
    console.log("user found", user);
    //sending email
    const con = await SendMail(
      email,
      "Email Verification",
      `your verification code is ${otp}`
    );
    return res.json({
      status: true,
      message: "verification code sent, check email",
    });
  } catch (error) {
    console.error(error.message);
    return res.json({
      status: false,
      message: error.message,
    });
  }
};
export const codeVerify = async (req, res) => {
  try {
    const email = req.headers.email;
    const otp = req.body.otp;
    const user = await User.findOne({email: email});
    if (!user) {
      return res.json({
        status: false,
        message: "User not registered",
      });
    }
    if (user.otp !== otp) {
      return res.json({
        status: false,
        message: "Invalid OTP",
      });
    }
    const token = createToken(user.email, user._id);
    if (!token) {
      return res.json({
        status: false,
        message: "Token not created",
      });
    }
    return res.json({
      status: true,
      message: "verification successful",
      token: token,
    });
  } catch (error) {
    console.error(error.message);
    return res.json({
      status: false,
      message: error.message,
    });
  }
};
export const resetPassword = async (req, res) => {
  try {
  } catch (error) {
    console.error(error.message);
    return res.json({
      status: false,
      message: error.message,
    });
  }
  return res.json({
    status: true,
    message: "Registration Successfully",
  });
};
export const tokenEncode = async (req, res) => {
  return res.json({
    status: true,
    message: "Registration Successfully",
  });
};
export const tokenDecode = async (req, res) => {
  return res.json({
    status: true,
    message: "Registration Successfully",
  });
};
