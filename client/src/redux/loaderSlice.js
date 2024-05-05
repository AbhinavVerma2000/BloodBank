import {createSlice} from '@reduxjs/toolkit'

const loaderSlice = createSlice({
    name: 'loaders',
    initialState:{
        loading: false,
    },
    reducers:{
        Setloading(state, action){
            state.loading = action.payload
        }
    }
})
export const {Setloading} = loaderSlice.actions;
export default loaderSlice.reducer;