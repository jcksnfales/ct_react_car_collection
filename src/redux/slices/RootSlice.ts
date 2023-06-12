import {createSlice} from "@reduxjs/toolkit"

const rootSlice = createSlice({
    name: "root",
    initialState: {
        nickname: "Nickname",
        make: "Make",
        model: "Model",
        year: "Year",
        mileage: "Mileage"
    },
    reducers: {
        chooseNickname: (state, action) => {state.nickname = action.payload},
        chooseMake: (state, action) => {state.make = action.payload},
        chooseModel: (state, action) => {state.model = action.payload},
        chooseYear: (state, action) => {state.year = action.payload},
        chooseMileage: (state, action) => {state.mileage = action.payload},
    }
})

export const reducer = rootSlice.reducer;
export const {chooseNickname, chooseMake, chooseModel, chooseYear, chooseMileage} = rootSlice.actions;