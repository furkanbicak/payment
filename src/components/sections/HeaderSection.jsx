import React                        from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Link }                     from 'react-router-dom';
import Logo                         from '../../assets/paramTechLogo.svg'
import User                         from '../../assets/user.svg'
import { useNavigate }              from 'react-router-dom';
import { Button }                   from 'antd';
import { logoutUser }               from '../../store/slices/userSlice';
import { packagesStateToInitial }   from '../../store/slices/packagesSlice';

const HeaderSection = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((store) => store.user)

    const logoutHandle = () => {
        dispatch(packagesStateToInitial());
        dispatch(logoutUser())
        navigate("/");
    }

    return (
        <nav className='navbar'>
            <Link to="/package-list">
                <figure>
                    <img src={Logo} alt="logo" />
                </figure>
            </Link>

            <div className="navbar_info">
                <figure>
                    <img src={User} alt="user avatar" />
                </figure>
                <span>{user.fullName}</span>
                <Button type="primary" danger onClick={() => logoutHandle()}>
                    Çıkış
                </Button>
            </div>
        </nav>
    )
}
export default HeaderSection;