interface UserProps {
  name?: string;
  age?: number;
}

type Callback = () => void;

export class User {
  private data: UserProps;
  events: {[key: string]: Callback[]} = {};

  constructor(data: UserProps) {
    this.data = data;
  }

  get(propName: string): UserProps {
    return this.data[propName];
  }

  set(update: UserProps): void {
    if (this.data.name != update.name) {
      this.data.name = update.name;
    } else if (this.data.age != update.age) {
      this.data.age = update.age;
    }
  }

  on(eventName: string, callback: Callback): void {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  }
}
