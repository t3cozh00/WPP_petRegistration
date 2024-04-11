const { queryDb } = require("../repository/queryDatabase");

// check user information
const userLogin = async (userData) => {
  try {
    const userResult = await queryDb(
      "select * from account where email_address=$1",
      [userData.email_address]
    );
    return userResult;
    // const resultRows = dbResult.rows ? dbResult.rows : [];
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { userLogin };
