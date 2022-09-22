export {};

declare global {
    namespace Express {
      export interface Request {
        _id?: string;
        //TODO, add proper type
        user?: NavBar.User;
      }
    }
  }
