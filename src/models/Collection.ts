import axios, {AxiosResponse} from "axios";
import {Eventing} from "./Eventing";

export class Collection<T, K> {
  models: T[] = [];
  events: Eventing = new Eventing();
  rootUrl: string;
  deserialize: (json: K) => T;

  constructor(rootUrl: string, deserialize: (json: K) => T) {
    this.rootUrl = rootUrl;
    this.deserialize = deserialize;
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    axios.get(this.rootUrl)
      .then((response: AxiosResponse) => {
        response.data.forEach((value: K) => {
          this.models.push(this.deserialize(value));
        });
        this.trigger("change");
      });
  }
}
