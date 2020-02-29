import {User} from "./models/User";
import {UserEdit} from "./views/Users/UserEdit";
import {UserList} from "./views/Users/UserList";

const root = document.getElementById("root");
const list = document.getElementById("list");
const user = User.buildUser({name: "", age: 0});
const userCollection = User.buildCollection();
userCollection.fetch();

if (root && list) {
  const userEdit = new UserEdit(root, user);
  userEdit.render();

  userCollection.on("change", ()=>{
    new UserList(list, userCollection).render();
  });
} else {
  throw new Error("Root element not found");
}


