import {Model} from "./Model";
import {Attributes} from "./Attributes";
import {Eventing} from "./Eventing";
import {APISync} from "./APISync";

interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = "http://localhost:3000/users";

export class User extends  Model<UserProps>{
  static buildUser(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new APISync<UserProps>(rootUrl),
      new Eventing()
    );
  }
}


