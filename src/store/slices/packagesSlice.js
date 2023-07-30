import { toast }                            from "react-hot-toast";
import services                             from "../../services";
import { createAsyncThunk, createSlice }    from "@reduxjs/toolkit";

const initialState = {
    totalPrice: 0,
    packages: [],
    selectedPackage: [],
    loading: false,
};

export const fetchPackages = createAsyncThunk("fetchPackages", () =>
    services.packageService.getPackages()
        .then((response) => response.data)
        .catch((err) => toast.error(err))
);

const packagesSlice = createSlice({
    name: "packages",
    initialState,
    reducers: {
        togglePackage: (state, { payload }) => {
            if (state.selectedPackage.find((item) => item === payload.selectedId)) {
                state.selectedPackage = state.selectedPackage.filter((item) => item !== payload.selectedId);
                state.totalPrice -= payload.selectedAmount;
            } else {
                state.selectedPackage.push(payload.selectedId);
                state.totalPrice += payload.selectedAmount;
            }
        },
        totalPrice: (state, { payload }) => {
            state.totalPrice = payload;
        },
        packagesStateToInitial: (state, { payload }) => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPackages.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(fetchPackages.fulfilled, (state, action) => {
            state.loading = false;
            state.packages = action.payload;
        });

        builder.addCase(fetchPackages.rejected, (state, action) => {
            state.loading = false;
        });
    },
});

export default packagesSlice.reducer;
export const { togglePackage, totalPrice, packagesStateToInitial } = packagesSlice.actions;
