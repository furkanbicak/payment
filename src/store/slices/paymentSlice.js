import services                             from '../../services';
import { toast }                            from 'react-hot-toast';
import { createSlice, createAsyncThunk }    from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    isPaymentSuccessful: false
}

export const postPayment = createAsyncThunk("postPayment",  (data) => {
    services.paymentService.postPayment(data)
        .then(response => {
            return response;
        })
        .catch(error => {
            toast.error('Ödeme yapılamadı:', error);
        });
})

const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(postPayment.pending, (state, action) => {
            state.isLoading = true;
        });

        builder.addCase(postPayment.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isPaymentSuccessful = true;
        });

        builder.addCase(postPayment.rejected, (state, action) => {
            state.isLoading = false;
        });
    }
})

export default paymentSlice.reducer;
