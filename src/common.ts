import {Context, createContext, useContext} from 'react';
import {User} from './user';

export const UserContext: Context<User | null> = createContext<User | null>(null);

export function useUser(): User {
    const user: User | null = useContext(UserContext);
    if (user == null) {
        //redirect to log in page
        throw Error('User is not authenticated');
    }
    return user;
}