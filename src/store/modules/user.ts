import { createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface IUserState {
  loginState:boolean
  adminname:string
  role:number
  checkedkeys:string[]
  token:string
}

const initialState:IUserState = {
  loginState:localStorage.getItem('loginState') === 'true',
  adminname:localStorage.getItem('adminname') ||'',
  role:Number(localStorage.getItem('role')),
  checkedkeys:JSON.parse(localStorage.getItem('checkedkeys')!),
  token:localStorage.getItem('token')||''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeLoginState(state,action:PayloadAction<boolean>){
      state.loginState = action.payload
    },
    changeAdminname(state,action:PayloadAction<string>){
      state.adminname = action.payload
    },
    changeRole(state,action:PayloadAction<number>){
      state.role = action.payload
    },
    changeCheckedkeys(state,action:PayloadAction<string[]>){
      state.checkedkeys = action.payload
    },
    changeToken(state,action:PayloadAction<string>){
      state.token = action.payload
    }
  }
})

export const {
  changeLoginState,
  changeAdminname,
  changeRole,
  changeCheckedkeys,
  changeToken
} = userSlice.actions

export default userSlice.reducer