import {Collection} from "../models/Collection";

export abstract class CollectionView<T, K> {
  parent: Element;
  collection: Collection<T, K>;


  constructor(parent: Element, collection: Collection<T, K>) {
    this.parent = parent;
    this.collection = collection;
  }

  abstract renderItem(model: T, parent: Element): void;

  render(): void {
    this.parent.innerHTML = "";

    const templateElement = document.createElement("template");
    for (let model of this.collection.models) {
      const wrapperElement = document.createElement("div");
      this.renderItem(model, wrapperElement);
      templateElement.content.append(wrapperElement);
    }

    this.parent.append(templateElement.content);
  }
}
