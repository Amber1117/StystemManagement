import { ILoginState } from './login/types'
import { ISystemState } from './main/system/types'
//store中state的类型
export interface IRootState {
  name: string
  age: number
}
export interface IRootWithModule {
  login: ILoginState,
  system: ISystemState
}

export type IStoreType = IRootState & IRootWithModule
