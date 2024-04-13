const { userLogin } = require("../services/userService.js");

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

module.exports = { onUserLogin };
