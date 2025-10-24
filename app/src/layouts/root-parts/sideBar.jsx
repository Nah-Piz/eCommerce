import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../../components/cartCard/cartItem';
import './root-parts.css'
import SectionHeading from '../../components/section-heading/sectionHeading';
import { selectItem } from '../../store/selectors';
import { useEffect } from 'react';
import { GetAllCart } from '../../api/cart-req';
import { useState } from 'react';
import { UpdateUiCartQuantity } from '../../store/slices/cartSlice';

function SideBar() {
 
    const { user } = useSelector(state => state.user);
    
    const dispatch = useDispatch();

    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const res = await GetAllCart();
                setCart(res.data);
                console.log(res.data)
                dispatch(UpdateUiCartQuantity({ isLogged: true, length: res.data.length }))
            } catch (error) {
                console.error(error);
            }
        }
        fetchCartData();
    }, []);
    
    const reloadCart = (newCart) => {
        console.log(newCart)
        setCart(newCart);
    }

    return (
        <>
            <div className="h-ctn">
                <SectionHeading
                title={'Cart Items'}
            />
            </div>
            <div className="cart-ctn">
                {
                    (cart.length === 0) ? 'Cart is empty' : cart.map(m => (
                        <CartItem
                            item={m}
                            reload={reloadCart}
                            key={m._id}
                        />
                    ))
                }
            </div>
        </>
    );
}

export default SideBar;