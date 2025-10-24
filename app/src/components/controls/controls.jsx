import { useEffect, useState } from 'react';
import './controls.css'
import { useDispatch } from 'react-redux';
import { UpdateUiCartQuantity } from '../../store/slices/cartSlice';
import { AddCartItem } from '../../api/cart-req';
import { displayModal } from '../../store/slices/userSlice';

function Controls({ id, quantity, notYet, increaseQuantity, decreaseQuantity }) {

    const dispatch = useDispatch(); 

    const handleCartBtn = async () => {
        try {
            const res = await AddCartItem(id,quantity)
            if (!res.success) return dispatch(displayModal(true))
            if (res.userStatus.isLogged) dispatch(UpdateUiCartQuantity(res.userStatus))
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
        
            <div className="ctr-ctn">
                <span
                    className="white-text"
                    onClick={decreaseQuantity}
                >-</span>
                <span>{ quantity }</span>
                <span
                    className="white-text"
                    onClick={increaseQuantity}
                >+</span>
                <button
                    className="button"
                    onClick={handleCartBtn}
                >{ (notYet)?'Add to Cart':'Update Cart' }</button>
            </div>
            
        </>
    );
}

export default Controls;