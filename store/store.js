import { create } from 'zustand';

const useUserStore = create((set) => ({
  firstName: "",
  lastName: "",
  username: "",
  userId: "",
  totalFollowers: 0,
  totalFollowing: 0,
  totalBookmarks: 0,
  email: "",
  avatar: "",
  isLogin: false,
  isSingleVerse: false,
  poetId: "",
  setPoetId: (id) => set({ poetId:id }),
  setUserId: (id) => set({ userId:id }),
  setTotalFollowers: (number) => set({ totalFollowers:number }),
  setTotalBookmarks: (number) => set({ totalBookmarks:number }),
  setTotalFollowing: (number) => set({ totalFollowing:number }),
  setUsername: (newUsername) => set({ username:newUsername }),
  setFirstName: (name) => set({ firstName:name }),
  setLastName: (name) => set({ lastName:name }),
  setEmail: (newEmail) => set({ email:newEmail }),
  setIsLogin: (newLoginState) => set({ isLogin:newLoginState }),
  setIsSingleVerse: (newState) => set({ isSingleVerse:newState }),
  setAvatar: (newAvatar) => set({ avatar:newAvatar })
}))

export default useUserStore;