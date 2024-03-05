import { create } from 'zustand';

const useUserStore = create((set) => ({
  firstName: "",
  lastName: "",
  username: "",
  totalFollowers: 0,
  totalFollowing: 0,
  email: "",
  avatar: "",
  isLogin: false,
  setTotalFollowers: (number) => set({ totalFollowers:number }),
  setTotalFollowing: (number) => set({ totalFollowing:number }),
  setUsername: (newUsername) => set({ username:newUsername }),
  setFirstName: (name) => set({ firstName:name }),
  setLastName: (name) => set({ lastName:name }),
  setEmail: (newEmail) => set({ email:newEmail }),
  setIsLogin: (newLoginState) => set({ isLogin:newLoginState }),
  setAvatar: (newAvatar) => set({ avatar:newAvatar })
}))

export default useUserStore;