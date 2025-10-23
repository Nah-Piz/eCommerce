import menuIcon from '../../assets/icons/hamburger-menu.png';
import cartIcon from '../../assets/icons/cart-icon.png';
import './root-parts.css'
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

function NavBar() {

    const { cart } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.user);

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
                                <Link to="cart">
                                    <span className="flexCenter cart">
                                        <i className='fa fa-cart-shopping' />
                                        <span className="quantity">{cart.length} item{ cart.length>1||cart.length===0?"s":""}</span>
                                    </span>
                                </Link>
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