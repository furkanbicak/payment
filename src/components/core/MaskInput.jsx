import React        from 'react'
import { Input }    from 'antd'
import InputMask    from "react-input-mask";

export const MaskInput = ({ value, onChange, mask, type, placeholder, size }) => {
    return (
        <InputMask mask={mask} placeholder={placeholder} value={value} onChange={onChange}>
            <Input size={size} type={type} />
        </InputMask>
    )
}
