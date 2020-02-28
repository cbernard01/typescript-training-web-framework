import {UserForm} from "./views/Users/UserForm";
import {User} from "./models/User";
import {UserShow} from "./views/Users/UserShow";
import {UserEdit} from "./views/Users/UserEdit";

const root = document.getElementById("root");
const user = User.buildUser({name: "SeventhName", age: 70});

if (root && user) {
  const userEdit = new UserEdit(root, user);
  userEdit.render();
  console.log(userEdit);
} else {
  throw new Error("Root element not found");
}


