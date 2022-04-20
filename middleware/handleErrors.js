const handleErrors = (err, req, res, next) => {
  console.log(err);

  return res
    .status(err.status ?? 500)
    .json({ message: err.status ? err.message : "something went wrong" });
};

module.exports = handleErrors;
