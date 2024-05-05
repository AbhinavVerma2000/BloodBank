import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'users',
    initialState:{
        currentUser: null,
    },
    reducers:{
        SetCurrUser(state, action){
            state.currentUser = action.payload
        }
    }
})
export const {SetCurrUser} = userSlice.actions;
export default userSlice.reducer;