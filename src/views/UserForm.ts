import {User, UserProps} from "../models/User";
import {View} from "./View";
import {eventsObject} from "../utils/Types";

export class UserForm extends View<User, UserProps> {

  eventsMap(): eventsObject {
    return {
      "click:.set-age": this.onSetAgeClick,
      "click:.set-name": this.onSetNameClick
    };
  }

  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  };

  onSetNameClick = (): void => {
    const input = this.parent.querySelector("input");
    if (input) this.model.set({name: input.value});
  };

  template(): string {
    return `
      <div>
        <h1>User Form</h1>
        <div>User name: ${this.model.getAttribute("name")}</div>
        <div>User age: ${this.model.getAttribute("age")}</div>
        <div>
          <input />
          <button class="set-name">Update Name</button>
        </div>
        <div>
          <button class="set-age">Set Random Age</button>
        </div>
        <div>
          <button class="save">Save</button>
        </div>
      </div>
    `;
  }
}
