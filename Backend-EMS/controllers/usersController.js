const User = require("../model/User");

const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(204).json({ message: "No users found" });
  res.json(users);
};

const createNewUser = async (req, res) => {
  const { user, pwd, firstname, lastname, phone } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  // check for duplicate usernames in the db
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict

  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    //create and store the new user
    const result = await User.create({
      username: user,
      password: hashedPwd,
      firstname: firstname,
      lastname: lastname,
      phone: phone,
    });

    res.status(201).json({ success: `New user ${user} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  const { id, editUsername, editFirstname, editLastname, editPhone } =
    req?.body;
  if (!id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }
  const user = await User.findOne({ _id: req.body.id }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `No employee matches ID ${req.body.id}.` });
  }
  if (editUsername) user.firstname = editUsername;
  if (editFirstname) user.lastname = editFirstname;
  if (editLastname) user.lastname = editLastname;
  if (editPhone) user.phone = editPhone;
  const result = await user.save();
  res.json(result);
};

//   const updateEmployee = async (req, res) => {
//     if (!req?.body?.id) {
//       return res.status(400).json({ message: "ID parameter is required." });
//     }
//     const employee = await Employee.findOne({ _id: req.body.id }).exec();
//     if (!employee) {
//       return res
//         .status(204)
//         .json({ message: `No employee matches ID ${req.body.id}.` });
//     }
//     if (req.body?.firstname) employee.firstname = req.body.firstname;
//     if (req.body?.lastname) employee.lastname = req.body.lastname;
//     const result = await employee.save();
//     res.json(result);
//   };

const deleteUser = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "User ID required" });
  }
  const user = await User.findOne({ _id: req.body.id }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `User ID ${req.body.id} not found` });
  }
  user.remove();
  res.send({ data: true });
  // const result = await user.deleteOne({ _id: req.body.id });
  res.json(result);
};

const getUser = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "User ID required" });
  const user = await User.findOne({ _id: req.params.id }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `User ID ${req.params.id} not found` });
  }
  res.json(user);
};

module.exports = {
  getAllUsers,
  createNewUser,
  deleteUser,
  updateUser,
  getUser,
};
