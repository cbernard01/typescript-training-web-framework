import axios, {AxiosPromise} from "axios";

interface HasId {
  id?: number
}

export class APISync<T extends HasId> {
  public rootUrl: string;

  constructor(rootUrl: string) {
    this.rootUrl = rootUrl;
  }

  fetch(id: number): AxiosPromise<T>{
    return axios.get(`${this.rootUrl}/${id}`);
  }

  save(data: T): AxiosPromise<T> {
    const {id} = data;

    // If record exists update the record.
    if (id) return axios.put(`${this.rootUrl}/${id}`, data);
    // Create record if record does not exist
    return axios.post(`${this.rootUrl}`, data);
  }
}
