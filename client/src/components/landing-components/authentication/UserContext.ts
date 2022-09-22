import  { createContext }  from   'react' ;


interface User {
    user: {
        username: string;
        email: string;
        profileImg: string;
    } | null;
    setUser: (user: {
        username: string;
        email: string;
        profileImg: string;
    } | null) => void;
}

export const UserContext = createContext<Partial<User>>({ user: null, setUser: () => {} });