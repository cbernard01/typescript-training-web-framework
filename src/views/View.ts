import {eventsObject} from "../utils/Types";
import {Model} from "../models/Model";

export abstract class View<T extends Model<K>, K> {
  parent: Element;
  model: T;

  constructor(parent: Element, model: T) {
    this.parent = parent;
    this.model = model;

    this.bindModel();
  }

  abstract eventsMap(): eventsObject;

  abstract template(): string;

  bindModel(): void {
    this.model.on("change", () => {
      this.render();
    })
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

  render(): void {
    this.parent.innerHTML = "";

    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();
    this.bindEvents(templateElement.content);
    this.parent.append(templateElement.content);
  }
}
