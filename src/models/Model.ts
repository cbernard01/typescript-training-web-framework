import {AxiosPromise, AxiosResponse} from "axios";
import {Callback} from "../utils/Types";

interface ModelAttributes<T> {
  getAttribute<K extends keyof T>(key: K): T[K];
  getAllAttributes(): T;
  set(update: T): void;
}

interface Sync<T> {
  fetch(id: number): AxiosPromise<T>;
  save(data: T): AxiosPromise<T>;
}

interface Events {
  on(eventName: string, callback: Callback): void;
  trigger(eventName: string): void;
}

interface HasId {
  id?: number;
}

export class Model<T extends HasId> {
  private events: Events;
  private sync: Sync<T>;
  private attributes: ModelAttributes<T>;

  constructor(attributes: ModelAttributes<T>, sync: Sync<T>, events: Events) {
    this.events = events;
    this.sync = sync;
    this.attributes = attributes;
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get getAttribute() {
    return this.attributes.getAttribute;
  }

  get getAllAttributes() {
    return this.attributes.getAllAttributes;
  }

  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger("change");
  }

  fetch(): void {
    const id = this.getAttribute("id");

    if (typeof id !== "number") {
      throw new Error("Cannot fetch without an id");
    }

    this.sync.fetch(id).then((response: AxiosResponse): void => {
      this.set(response.data);
    })
  }

  save(): void {
    this.sync.save(this.getAllAttributes()).then((response: AxiosResponse): void => {
      this.set(response.data);
      this.trigger("save");
    }).catch((error)=> {
      console.log(error);
      this.trigger("error");
    });
  }
}
