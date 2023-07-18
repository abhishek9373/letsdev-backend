import UserI from "../interfaces/User.Interface";

export { }

declare global {
  namespace Express {
    export interface Request {
      user: UserI;
    }
  }
}