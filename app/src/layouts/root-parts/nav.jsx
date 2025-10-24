import menuIcon from '../../assets/icons/hamburger-menu.png';
import cartIcon from '../../assets/icons/cart-icon.png';
import './root-parts.css'
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../api/auth-req';
import { remove } from '../../store/slices/cartSlice';
import { logoutAction } from '../../store/slices/userSlice';

function NavBar() {

    const { cart } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.user);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const res = await logout();
            if (res === 200) {
                dispatch(remove());
                dispatch(logoutAction());
                navigate("/")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="nav-section">
                <section className="innerWidth flexSpaceBtn">
                    <div className="logo-ctn">
                        <NavLink to="/">
                            <span className="primaryText logo">iShoppy</span>
                        </NavLink>
                    </div>
                    <nav className="nav-container"></nav>
                    
                    <div
                        className="more"
                    >
                        {
                            (user.isLogged) ? (
                                <span className='flexCenter auth-ctn'>
                                    <Link to="cart">
                                        <span className="flexCenter cart">
                                            <i className='fa fa-cart-shopping' />
                                            <span className="quantity">{cart.length} item{ cart.length>1||cart.length===0?"s":""}</span>
                                        </span>
                                    </Link>
                                    <span
                                        onClick={handleLogout}
                                        className='primaryText logout'>Logout</span>
                                </span>
                            ) : (
                                <span className="flexCenter auth-ctn">
                                    <Link to="/auth/login">
                                        <span className="button loginl">Login</span>
                                    </Link>
                                    <Link to={"/auth/signup"}>
                                        <span className="button signupl">Sign Up</span>
                                    </Link>
                                </span>
                            )
                        }
                        
                    </div>
                </section>
            </div>
            <div className="nav-section">
                <section className="innerWidth flexSpaceBtn"></section>
            </div>
        </>
    );
}

export default NavBar;