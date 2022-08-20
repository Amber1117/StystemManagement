import { ILoginState } from './login/types'
//store中state的类型
export interface IRootState {
  name: string
  age: number
}
export interface IRootWithModule {
  login: ILoginState
}

export type IStoreType = IRootState & IRootWithModule
