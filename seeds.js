const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User");
const Note = require("./models/Note");

const salt = bcrypt.genSaltSync(10);

require("./dbConfig");

let users = [
  {
    _id: "6169c4efe34685f6885eb312",
    username: "Mario",
    password: "12345678",
    notes: [
      "6169c4efe34685f6885eb712",
      "6169c4efe34685f6885eb726",
      "6169c4efe34685f6885eb727",
      "6169c4efe34685f6885eb728",
    ],
  },
  {
    _id: "6169c4efe34685f6885eb412",
    username: "Manolo",
    password: "12345677",
  },
];

let notes = [
  {
    _id: "6169c4efe34685f6885eb712",
    title: "Cooking",
    content: "Do the cooking.",
    date: "2021-12-27T19:06:00",
		user: "6169c4efe34685f6885eb312", 
  },
  {
    _id: "6169c4efe34685f6885eb726",
    title: "Deploy back-end",
    content: "Deploy the back-end of my project.",
    date: "2021-12-27T19:15:00",
		user: "6169c4efe34685f6885eb312", 
  },
  {
    _id: "6169c4efe34685f6885eb727",
    title: "Finish my project",
    content: "Finish my proyect and push it to Github.",
    date: "2021-12-27T19:50:00",
		user: "6169c4efe34685f6885eb312", 
  },
  {
    _id: "6169c4efe34685f6885eb728",
    title: "Finish front-end",
    content: "Finish the front end of my project.",
    date: "2021-11-27T07:50:00",
		user: "6169c4efe34685f6885eb312", 
  },
];

users.forEach((user) => {
  user.password = bcrypt.hashSync(user.password, salt);
});

const createInfo = async () => {
  try {
    await User.deleteMany();
  } catch (error) {
    console.log(
      `Users have not been deleted. There is the following error: ${error}`
    );
    return;
  }
  console.log("Users deleted");
  let createdUsers;
  try {
    createdUsers = await User.create(users);
  } catch (error) {
    console.log(
      `Users have not been created. There is the following error: ${error}`
    );
    return;
  }
  console.log(
    `${createdUsers.length} users have been created with the following names:`
  );
  createdUsers.forEach((createdUser) => {
    console.log(createdUser.username);
  });
  try {
    await Note.deleteMany();
  } catch (error) {
    console.log(
      `Notes have not been deleted. There is the following error: ${error}`
    );
    return;
  }
  let createdNotes;
  console.log("Notes deleted");
  try {
    createdNotes = await Note.create(notes);
  } catch (error) {
    console.log(
      `Notes have not been created. There is the following error: ${error}`
    );
    return;
  }
  console.log(
    `${createdNotes.length} notes have been created with the following titles:`
  );
  createdNotes.forEach((createdNote) => {
    console.log(createdNote.title);
  });
  mongoose.disconnect();
  console.log("We are disconnected from our database");
};

createInfo();
