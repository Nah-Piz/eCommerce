import '../../layouts/root-parts/root-parts.css'
import Controls from '../controls/controls';
import data from '../../assets/data.json'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RemoveCart } from '../../api/cart-req';

function CartItem({ item }) {

    const { cart } = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const [ItemQuantity, setItemQuantity] = useState(item.quantity);

    // useEffect(() => {
    //     const it = cart.find(f => f.id === item.id);
    //     settem(it.quantity)
    // },[cart])

    // const cartItem = data.find(f => f.id === item.id);

    const handleIncreaseQuantity = () => {
        setItemQuantity(q => q + 1)
        console.log("I was called and cart is", ItemQuantity)
    }

    const handleDecreaseQuantity = () => {
        setItemQuantity(q=>(q>1) ? q-1 : 1)
    }

    const handleRemoveCart = async (id) => {
        try {
            const removed = await RemoveCart(id);
            console.log(removed);
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <article className="card">
            <div className="flexStart top-ctn">
                <div className="img-ctn">
                    <img
                        src={item.product.image}
                        alt={item.product.name}
                        style={{width:100,height:100}}
                    />
                </div>
                <div className="flexColStart dtl-ctn">
                    <span className="primaryText spanBtn">
                        <Link to={`/${item.product._id}`}>{item.product.name}</Link>
                    </span>
                    <div className="flexStart pXs price-ctn">
                        <div className="flexColStart price-cat">
                            <span className="ttl">Unit Price</span>
                            <span className="secondaryText price">UGX - { item.product.price }</span>
                        </div>
                        <div className="flexColStart price-cat">
                            <span className="ttl">Total</span>
                            <span className="secondaryText price">UGX - { item.product.price * ItemQuantity }</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flexStart bot-ctn">
                <Controls
                    id={item.product._id}
                    quantity={ItemQuantity}
                    increaseQuantity={handleIncreaseQuantity}
                    decreaseQuantity={handleDecreaseQuantity}
                />
                <button
                    className="button remove"
                    onClick={()=>handleRemoveCart(item._id)}
                >Remove</button>
            </div>
        </article>
    );
}

export default CartItem;