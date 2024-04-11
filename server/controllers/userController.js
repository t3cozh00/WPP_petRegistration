const { userLogin, findUserData } = require("../services/userService.js");

const onUserLogin = async (req, res) => {
  try {
    //console.log("Request body:", req.body);
    const { email_address, password } = req.body;

    const result = await userLogin({
      email_address,
      password,
    });
    if (result.rowCount === 1) {
      const user = result.rows[0];
      if (user.password === password) {
        res.status(200).json(user);
      } else {
        res.statusMessage = "Invalid login";
        res.status(401).json({ error: "Invalid login" });
      }
    } else {
      res.statusMessage = "Invalid login";
      res.status(401).json({ error: "Invalid login" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
  return;
};

const onGetUserData = async (req, res) => {
  try {
    //get details of all the pet data
    const result = await findUserData();
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
  return;
};

module.exports = { onUserLogin, onGetUserData };
