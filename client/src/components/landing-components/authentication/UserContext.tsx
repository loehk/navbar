import  { createContext, Dispatch, SetStateAction, useEffect, useState }  from   'react' ;

export type authUser = {
    username: string;
    email: string;
    profilePictureBase64: string;
    token: string;
}

type UserContextProviderProps = {
    children: React.ReactNode;
}

type UserContextType = {
    user: authUser | null;
    setUser: Dispatch<SetStateAction<authUser | null>>;
}


export const UserContext = createContext<UserContextType | null>(null);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
    const [user, setUser] = useState<authUser | null>(null);
    const authUser = localStorage.getItem("authUser");  
    
    useEffect(() => {
        if(authUser){
            setUser(JSON.parse(authUser));
            console.log("UserContextProvider: ", user);
        }
    }, [localStorage.getItem("authUser")]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    ) 
}