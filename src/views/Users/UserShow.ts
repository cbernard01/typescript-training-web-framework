import {View} from "../View";
import {User, UserProps} from "../../models/User";

export class UserShow extends View<User, UserProps> {
  template(): string {
    return `
      <div>
        <h1>User Detail</h1>
        <div>User Name: ${this.model.getAttribute("name")}</div>
        <div>User Age: ${this.model.getAttribute("age")}</div>
      </div>
    `;
  }
}
