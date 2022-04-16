const handleErrors = (req, res, next, err) => {
  console.log(err);
  // return res.status(err.statusCode ?? 500).json({ message: err.message });
  return res.status(500).json({ message: "something went wrong" });
};

module.exports = handleErrors;
