export class Attributes<T> {
  private data: T;

  constructor(data: T) {
    this.data = data;
  }

  getAttr = <K extends keyof T>(key: K): T[K] => {
    return this.data[key];
  };

  getAllAttrs = (): T => {
    return this.data;
  };

  set(update: T): void {
    Object.assign(this.data, update);
  }
}
