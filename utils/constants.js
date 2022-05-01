const constants = {
  passwordErrors: {
    length: "be min. 6 characters long",
    number: "contain 1 number",
    lowercase: "contain 1 lowercase letter",
    uppercase: "contain 1 uppercase letter",
    specialCharacter: "contain 1 special character",
  },

  errorsMessages: {
    duplicateUser: "account with this user name or email already exists",
    somethingWentWrong: "something went wrong, try again later",
    invalid: "username, email or password invalid",
    invalidToken: "invalid token",
    notFound: "resource not found",
    thisUserDoesNotExist: "this user does not exist",
  },
};

module.exports = constants;
