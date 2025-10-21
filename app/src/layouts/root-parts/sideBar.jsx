import { useSelector } from 'react-redux';
import CartItem from '../../components/cartCard/cartItem';
import './root-parts.css'
import SectionHeading from '../../components/section-heading/sectionHeading';
import { selectItem } from '../../store/selectors';
import { useEffect } from 'react';
import { GetAllCart } from '../../api/cart-req';
import { useState } from 'react';

function SideBar() {
 
    // const { cart } = useSelector(selectItem);

    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const res = await GetAllCart();
                setCart(res.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchCartData();
    },[])

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
                            key={m._id}
                        />
                    ))
                }
            </div>
        </>
    );
}

export default SideBar;