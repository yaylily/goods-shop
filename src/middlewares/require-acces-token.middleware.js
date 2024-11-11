export const requireAccessToken = async (req, res, next) => {
  try {
    next();
  } catch (err) {
    next(err);
  }
};
