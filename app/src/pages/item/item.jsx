import { useParams } from 'react-router-dom';
import Controls from '../../components/controls/controls';
import './itme.css';
import { useEffect, useState } from 'react';
import data from '../../assets/data.json';
import { useSelector } from 'react-redux';
import { GetAPdt } from '../../api/products-req';

function Item() {

    const { id } = useParams();
    const [item, setItem] = useState();

    const [itemQuantity, setItemQuantity] = useState(1);
    
    useEffect(() => {
        
        const fetchItem = async () => {
            try {
                const res = await GetAPdt(id);
                setItem(res.data)
                if (res.data.exists) setItemQuantity(res.data.quantity)
            } catch (error) {
                console.log(error)
            }
        }
        fetchItem()
    }, [id]);

    const handleIncreseQuantity = () => {
        setItemQuantity(q=>q+1)
    }
    
    const handleDecreseQuantity = () => {
        setItemQuantity(q=>(q>1) ? q-1 : 1)
    }

    return (
        <section className="flexSpaceBtn indv-ctn">
            {
                (!item) ? (
                    <div className="not-found">
                        <h1>404 || Page or Item Not Found!!!</h1>
                    </div>
                ) : (<>
                        
                        <div className="l-ctn">
                            <div className="img-ctn">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    style={{width:"100%",height:"100%",borderRadius:20}}
                                />
                            </div>
                        </div>
                        <div className="flexColStart r-ctn">
                            <div className="title heading">{ item.name }</div>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora non quaerat doloremque corrupti assumenda suscipit ipsum recusandae facere hic debitis cumque dignissimos nemo totam ipsa optio natus reiciendis, deleniti perferendis?</p>
                            <div className="flexCenter ctr-ctn">
                                <Controls
                                    id={id}
                                    quantity={itemQuantity}
                                    notYet={(item.exists) ? false : true}
                                    increaseQuantity={ handleIncreseQuantity }
                                    decreaseQuantity={ handleDecreseQuantity }
                                />
                            </div>
                        </div>
                    </>)
            }
        </section>
    );
}

export default Item;