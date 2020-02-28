import {User} from "../models/User";

type eventsObject = { [key: string]: () => void };

export class UserForm {
  parent: Element;
  model: User;

  constructor(parent: Element, model: User) {
    this.parent = parent;
    this.model = model;

    this.bindModel();
  }

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
        <div>User name: ${this.model.getAttr("name")}</div>
        <div>User age: ${this.model.getAttr("age")}</div>
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

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();

    for (let eventKey in eventsMap) {
      if (eventsMap.hasOwnProperty(eventKey)) {
        const [eventName, selector] = eventKey.split(":");
        fragment.querySelectorAll(selector).forEach(element => {
          element.addEventListener(eventName, eventsMap[eventKey]);
        })
      }
    }
  }

  bindModel(): void {
    this.model.on("change", () => {
      this.render();
    })
  }

  render(): void {
    this.parent.innerHTML = "";

    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();
    this.bindEvents(templateElement.content);
    this.parent.append(templateElement.content);
  }
}
