const { queryDb } = require("../repository/queryDatabase");

// check user information
const userLogin = async (userData) => {
  try {
    const dbResult = await queryDb(
      "select * from tblUser where email_address=$1",
      [userData.email_address]
    );
    return dbResult;
    // const resultRows = dbResult.rows ? dbResult.rows : [];
  } catch (error) {
    throw new Error(error.message);
  }
};

//Find user data from pet table
const findUserData = async () => {
  try {
    const dbResult = await queryDb("select * from tblUser");
    const resultRows = dbResult.rows ? dbResult.rows : [];
    return !resultRows ? [{}] : resultRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { userLogin, findUserData };
