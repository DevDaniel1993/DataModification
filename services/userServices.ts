import create from "./httpService";

export interface UserData {
  name: string;
  id: number;
}

export default create("/users");
