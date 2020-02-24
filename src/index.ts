import {User} from "./models/User";


const user = new User({id: 5, name: "FifthName", age: 50});

console.log(user.get("id"));

user.on("change", ()=> {
  console.log("change", user);
});

user.on("save", ()=> {
  console.log("save", user);
});

user.on("error", ()=> {
  console.log("error", user);
});

user.save();
