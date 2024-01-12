import {createSlice} from '@reduxjs/toolkit';
import applicationApi from '../services/applicationApi';

export const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    // To implement notifications later
    addNotifications: (state, {payload}) => {},
    resetNotifications: (state, {payload}) => {}
  },
  extraReducers: (builder) => {
    //save user after signup
    builder.addMatcher(applicationApi.endpoints.signupUser.matchFulfilled, (state, {payload}) => {return payload});

    //save user after login
    builder.addMatcher(applicationApi.endpoints.loginUser.matchFulfilled, (state, {payload}) => { return payload});

    //logout: destroy user session
    builder.addMatcher(applicationApi.endpoints.loginUser.matchFulfilled, () => null);
  }
})
//changed
export const {addNotifications, resetNotifications} = userSlice.actions;
export default userSlice.reducer;