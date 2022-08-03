// 状态管理器 定义根状态和调度类型
import { configureStore } from '@reduxjs/toolkit'
import appSlice from './modules/app'
import userSlice from './modules/user'

export const store  = configureStore({
  reducer:{
    app:appSlice,
    user:userSlice
  }
})

// 提取RootState类型和Dispatch类型，以便可以根据需要引用它们
export type RootState = ReturnType<typeof store.getState>
export type Appdispatch = typeof store.dispatch