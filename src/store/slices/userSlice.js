import services                             from "../../services";
import { toast }                            from "react-hot-toast";
import { createAsyncThunk, createSlice }    from "@reduxjs/toolkit";

const initialState = {
    error: "",
    loading: false,
    user: { fullName: "", email: "" },
    isLogin: false
}

export const fetchUser = createAsyncThunk("fetchUser", (loginData) => {
    services.userService.postSignup(loginData)
        .then(response => {
            return response;
        })
        .catch(error => {
            toast.error('Giriş yapılamadı!', error);
        });
})

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logoutUser: (state, action) => {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state, action) => {
            state.loading = true;
            state.error = "";
        });

        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = { email: action.meta.arg?.email, fullName: action.meta.arg?.fullName };
            state.isLogin = true;
        });

        builder.addCase(fetchUser.rejected, (state, action) => {
            state.loading = false;
            state.error = "Error fetching user data!";
        });
    }
})

export default userSlice.reducer;
export const { logoutUser } = userSlice.actions;