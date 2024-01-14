import { create } from 'zustand';

const useUserStore = create((set) => ({
  fullName: "",
  username: "",
  totalFollowers: 0,
  totalFollowing: 0,
  email: "",
  avatar: "",
  isLogin: false,
  setTotalFollowers: (number) => set({ totalFollowers:number }),
  setTotalFollowing: (number) => set({ totalFollowing:number }),
  setUsername: (newUsername) => set({ username:newUsername }),
  setFullname: (name) => set({ fullName:name }),
  setEmail: (newEmail) => set({ email:newEmail }),
  setIsLogin: (newLoginState) => set({ isLogin:newLoginState })
}))

export default useUserStore;