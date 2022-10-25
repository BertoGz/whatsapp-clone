import { QueryClient } from "react-query";
import {User} from 'firebase/auth'
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
    },
  },
});

export * from './Mutations/useMutationLoginUser'
export * from './Mutations/useMutationCreateUser'


export const clientData = {
  getUserData:()=> queryClient.getQueryData('userData') as User,
  getUserCreated:()=>queryClient.getQueryData('userCreated') as User,
}