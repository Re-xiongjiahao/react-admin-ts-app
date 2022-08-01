import { createSlice,PayloadAction } from '@reduxjs/toolkit'

export interface IAppState {
  collapsed: boolean
}

const initialState: IAppState = {
  // 存入本地原因是为了 保留用户的使用习惯
  collapsed: localStorage.getItem('collapsed') === 'true'
}

export const appSlice = createSlice({
  name:'app', // 模块名称
  initialState,
  reducers:{
    changeCollapsed(state,action:PayloadAction<boolean>){
      state.collapsed =action.payload
    }
  }
})

export const { changeCollapsed } = appSlice.actions

export default appSlice.reducer