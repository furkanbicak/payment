import React, { useEffect, useState }   from 'react'
import { useSelector }                  from 'react-redux';
import { useNavigate }                  from 'react-router-dom';
import toast                            from "react-hot-toast";
import { PaymentContainer }             from '../../components/pages/Payment/PaymentContainer';

export const Payment = () => {
    const navigate = useNavigate();
    const { packages, selectedPackage } = useSelector((store) => store.packages);
    const [paymentItems, setPaymentItems] = useState([])

    useEffect(() => {
        if (selectedPackage.length === 0) {
            toast.error("Lütfen bir kart seç!");
            navigate('/package-list');
        } else {
            const filteredItems = packages.filter(item => selectedPackage.includes(item.id));
            setPaymentItems(filteredItems);
        }
    }, []);

    return (
        <>
            <PaymentContainer payment={ paymentItems }  />
        </>
    )
}
