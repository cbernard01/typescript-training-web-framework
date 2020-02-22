import axios, {AxiosResponse} from "axios";

interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

type Callback = () => void;

export class User {
  events: { [key: string]: Callback[] } = {};
  private data: UserProps;

  constructor(data: UserProps) {
    this.data = data;
  }

  get(propName: string): UserProps {
    return this.data[propName];
  }

  set(update: UserProps): void {
    const {id, name, age} = update;

    if (id && this.data.id != id) this.data.id = id;
    if (name && this.data.name != name) this.data.name = name;
    if (age && this.data.age != age) this.data.age = age;
  }

  on(eventName: string, callback: Callback): void {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  }

  trigger(eventName: string): void {
    const handlers = this.events[eventName];
    if (!handlers || handlers.length == 0) return;

    handlers.forEach(callback => {
      callback();
    })
  }

  fetch(): void {
    axios.get(`http://localhost:3000/users/${this.get("id")}`)
      .then((response: AxiosResponse): void => {
        this.set(response.data);
      })
  }

  save(): void {
    const id = this.get("id");

    if (id) { // Put if record exists
      axios.put(`http://localhost:3000/users/${id}`, this.data)
        .then((response: AxiosResponse) => {});
    } else { // Post if record does not exist
      axios.post(`http://localhost:3000/users`, this.data)
        .then((response: AxiosResponse) => {});
    }
  }
}
