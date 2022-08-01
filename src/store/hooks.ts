// 创建 useDispatch 和 useSelector  的 hooks 的类型化版本
// useDispatch 一般可以触发改变状态
// useSelector 在组件中可以获取状态管理器中的数据
import { useDispatch, useSelector,TypedUseSelectorHook} from 'react-redux'

import type { RootState,Appdispatch } from './index'

// 如果使用js
// export const useAppDispatch = useDispatch
// export const useAppSelector = useSelector

// 如果使用ts
// () => AppDispatch 代表  useAppDispatch 这个函数的类型注解
export const useAppDispatch: ()=> Appdispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector