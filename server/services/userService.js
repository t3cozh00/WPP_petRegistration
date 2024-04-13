const { queryDb } = require("../repository/queryDatabase");

// check user information
const userLogin = async (userData) => {
  try {
<<<<<<< HEAD
    const dbResult = await queryDb(
=======
    const userResult = await queryDb(
>>>>>>> 5140d737f7c6083756b1f42894339d3f0620c3c1
      "select * from account where email_address=$1",
      [userData.email_address]
    );
    return userResult;
    // const resultRows = dbResult.rows ? dbResult.rows : [];
  } catch (error) {
    throw new Error(error.message);
  }
};

<<<<<<< HEAD
//Find user data from pet table
const findUserData = async () => {
  try {
    const dbResult = await queryDb("select * from account");
    const resultRows = dbResult.rows ? dbResult.rows : [];
    return !resultRows ? [{}] : resultRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { userLogin, findUserData };
=======
module.exports = { userLogin };
>>>>>>> 5140d737f7c6083756b1f42894339d3f0620c3c1
