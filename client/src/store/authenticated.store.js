import {create} from 'zustand';

const authenticatedStore = create((set) => ({
    isAuthenticated:null,
    setIsAuthenticated: (passedArgument) => set({
        isAuthenticated: passedArgument
    })
}))

export default authenticatedStore;