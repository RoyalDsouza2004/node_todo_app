import { User } from "../models/user.js";
import bcryptjs from "bcryptjs";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const registers = async (req, res , next) => {
      try {
            const { name, email, password } = req.body;
            let user = await User.findOne({ email });

            if (user) return next(new ErrorHandler("user already exist", 400))

            const hashedPassword = await bcryptjs.hash(password, 10);

            user = await User.create({ name, email, password: hashedPassword });

            sendCookie(user, res, "registered successfully", 201)
      } catch (error) {
            next(error);
      }
};

export const getMyProfile = (req, res) => {
      res.status(200).json({
            success: true,
            user: req.user,
      })
};

export const login = async (req, res, next) => {
      try {
            const { email, password } = req.body;
            const user = await User.findOne({ email }).select("+password");

            if (!user) return next(new ErrorHandler("invalid email and password", 400));

            const isMatch = await bcryptjs.compare(password, user.password);

            if (!isMatch) return next(new ErrorHandler("invalid email and password", 400))

            sendCookie(user, res, `welcome back, ${user.name}`, 200);
      } catch (error) {
            next(error);
      }
};

export const logout = (req, res) => {
      res.status(200).cookie("token", "", { 
            expires: new Date(Date.now()),
		secure: process.env.NODE_ENV === "Developement" ? false : true,
            sameSite: process.env.NODE_ENV === "Developement" ? "lax" : "none",
      }).json({
            success: true,
            user: req.user,
      })
}