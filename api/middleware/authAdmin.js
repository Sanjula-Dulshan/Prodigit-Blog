import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

const authAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.id });

    if (!user.isAdmin)
      return next(errorHandler(500, "Admin resources access denied."));

    next();
  } catch (error) {
    next(error);
  }
};
export default authAdmin;
