import {User, UserProps} from "../../models/User";
import {View} from "../View";
import {eventsObject} from "../../utils/Types";

export class UserForm extends View<User, UserProps> {

  eventsMap(): eventsObject {
    return {
      "click:.set-age": this.onSetAgeClick,
      "click:.set-name": this.onSetNameClick,
      "click:.save-model": this.onSaveClick
    };
  }

  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  };

  onSetNameClick = (): void => {
    const input = this.parent.querySelector("input");
    if (input) this.model.set({name: input.value});
  };

  onSaveClick = (): void => {
    this.model.save();
  };

  template(): string {
    return `
      <div>
        <div>
          <input placeholder="${this.model.getAttribute("name")}" />
          <button class="set-name">Update Name</button>
        </div>
        <div>
          <button class="set-age">Set Random Age</button>
        </div>
        <div>
          <button class="save-model">Save User</button>
        </div>
      </div>
    `;
  }
}
