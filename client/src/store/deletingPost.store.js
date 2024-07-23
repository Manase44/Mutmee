import { create } from "zustand";

const useDeletingPost = create((set) => ({
    isDeleting:null,
    setIsDeleting: (passedBoolean) => set({
        isDeleting: passedBoolean
    })
}))

export default useDeletingPost;