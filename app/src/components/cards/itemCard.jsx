import { useDispatch, useSelector } from 'react-redux';
import './card.css'
import { UpdateUiCartQuantity } from '../../store/slices/cartSlice';
import { Link } from 'react-router-dom';
import { AddCartItem } from '../../api/cart-req';

function ItemCard({ item }) {
    const { name, price, slug, image, _id } = item;

    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch()

    const handleAddCart = async (id) => {
        try {
            const res = await AddCartItem(id)
            if (!res.success) return alert(res.msg)
            if (res.userStatus.isLogged) dispatch(UpdateUiCartQuantity(res.userStatus))
            console.log(res)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className="flexColStart card">
            <div className="image-ctn">
                <img
                    src={image}
                    alt={name}
                    style={{height:200}}
                />
            </div>
            <div className="flexColStart dtl-ctn">
                <span
                    className="secondaryText textCenter item-price"
                >UGX - {price}</span>
                <span
                    className="primaryText spanBtn textCenter item-name"
                >
                    <Link to={_id}>{name}</Link>
                </span>
            </div>
            <button
                className="button addItem"
                onClick={()=>handleAddCart(_id)}
            >Add to Cart</button>
        </div>
    );
}

export default ItemCard;