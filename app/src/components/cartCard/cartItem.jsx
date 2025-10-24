import '../../layouts/root-parts/root-parts.css'
import Controls from '../controls/controls';
import data from '../../assets/data.json'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RemoveCart } from '../../api/cart-req';
import { UpdateUiCartQuantity } from '../../store/slices/cartSlice';

function CartItem({ item, reload }) {

    const { cart } = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const [ItemQuantity, setItemQuantity] = useState(item.quantity);


    const handleRemoveCart = async (id) => {
        console.log("Its removing")
        try {
            const removed = await RemoveCart(id);
            dispatch(UpdateUiCartQuantity(removed.status));
            reload(removed.data)
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