export {};

declare global {
    namespace NavBar {
      export interface User {
        _id: string;
        username: string;
        email: string;
        isAdmin: boolean;
        profilePictureBase64: string;
        locations: any[]
      }
    }
  }
