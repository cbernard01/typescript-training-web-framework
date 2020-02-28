import {eventsObject, regionObject, regionString} from "../utils/Types";
import {Model} from "../models/Model";

export abstract class View<T extends Model<K>, K> {
  parent: Element;
  model: T;
  regions: regionObject = {};

  constructor(parent: Element, model: T) {
    this.parent = parent;
    this.model = model;

    this.bindModel();
  }

  abstract template(): string;

  regionsMap(): regionString {
    return {};
  }

  eventsMap(): eventsObject {
    return {};
  };

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

  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap();

    for (let regionsKey in regionsMap) {
      if (regionsMap.hasOwnProperty(regionsKey)) {
        const selector = regionsMap[regionsKey];
        const element = fragment.querySelector(selector);

        if (element) this.regions[regionsKey] = element;
      }
    }
  }

  onRender(): void {
  }

  render(): void {
    this.parent.innerHTML = "";

    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content);
    this.mapRegions(templateElement.content);

    this.onRender();

    this.parent.append(templateElement.content);
  }
}
