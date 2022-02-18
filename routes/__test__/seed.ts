import User, { IUser } from "../../models/User";

const users: any[] = [];

// USERS
const generateJane = () => {
  const user = new User<IUser>({
    name: {
      firstName: "Jane",
      lastName: "Smith",
    },
    email: "jane@gmail.com",
    password: "password",
  });

  users.push(user);
};

// SEED DB
const seedDB = async () => {
  generateJane();

  for (let user of users) {
    try {
      await user.save();
    } catch (err) {
      err;
    }
  }

  // console.log(users);
  return;
};

export default seedDB;
