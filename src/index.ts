import {User} from "./models/User";

const user = new User({name: "testName", age: 20});

user.set({name: "anotherNewName"});
user.on("test", ()=> {});
user.on("test", ()=> {});
user.on("test", ()=> {});
user.on("change", ()=> {});

console.log(user);
