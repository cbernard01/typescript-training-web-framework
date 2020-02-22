import {User} from "./models/User";


const user1 = new User({id: 1});

user1.set({name: "HorseName", age: 70});
user1.save();

const user2 = new User ({name: "AnotherName", age: 50});
user2.save();
