import User, { IUser } from "../../models/User";

const users: any[] = [];

// USERS
const generateJane = () => {
  const user = new User<IUser>({
    _id: "620f8197b39ee93778ce738b",
    name: {
      firstName: "Jane",
      lastName: "Smith",
    },
    email: "jane@gmail.com",
    password: "$2a$10$dexhl0xuphcSioluvPGFk.FsLMe3uhhy/AjKCYeeBnaXRDfXrumZ.", // "password" hashed
  });

  users.push(user);
};

const generateJohn = () => {
  const user = new User<IUser>({
    _id: "620f8197b39ee93778ce738c",
    name: {
      firstName: "John",
      lastName: "Doe",
    },
    email: "john@gmail.com",
    password: "$2a$10$dexhl0xuphcSioluvPGFk.FsLMe3uhhy/AjKCYeeBnaXRDfXrumZ.", // "password" hashed
  });

  users.push(user);
};

// SEED DB
const seedDB = async () => {
  generateJane();
  generateJohn();

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
