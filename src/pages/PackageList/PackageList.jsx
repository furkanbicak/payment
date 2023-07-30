import React, { useEffect }         from 'react'
import { Button }                   from 'antd';
import { Link }                     from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchPackages }            from "../../store/slices/packagesSlice"
import { Package }                  from '../../components/pages/PackageList/Package'

export const PackageList = () => {
    const dispatch = useDispatch();
    const packagesData = useSelector((store) => store.packages)
    const { totalPrice } = useSelector((store) => store.packages)

    useEffect(() => {
        dispatch(fetchPackages())
    }, [])

    return (
        <>
            <div className='package_list_container'>
                {
                    packagesData.packages.map((item) => (
                        <Package key={item.id} data={item} />
                    ))
                }
            </div>
            <hr />
            <div className='container_footer'>
                <div>
                    Seçilen Paket Tutarı: <span className='container_footer_totalprice'>{totalPrice}₺</span>
                </div>
                <Link to={"/payment"}>
                    <Button size='large' type="primary" block> Devam Et </Button>
                </Link>
            </div>
        </>
    )
}
