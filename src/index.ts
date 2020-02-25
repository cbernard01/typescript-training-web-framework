import {User} from "./models/User";


const collection = User.buildCollection();

collection.fetch();

collection.on("change", () => {
  console.log(collection);
});
