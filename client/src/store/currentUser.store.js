import { create } from "zustand";

const userDetailsStore = create((set) => ({
    user:{},
    setUser: (passedObject) => set({
        user: passedObject
    })
}))


export default userDetailsStore;