import { useEffect, useState } from "react";
import ItemCard from '../../../components/cards/itemCard';
import SectionHeading from '../../../components/section-heading/sectionHeading';
import '../home.css'
import { GetAllPdts } from "../../../api/products-req.js";
import { useDispatch } from "react-redux";
import { UpdateUiCartQuantity } from "../../../store/slices/cartSlice.js";

function AllItems() {

    const [data, setData] = useState([]);

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataFetched = await GetAllPdts()
                setData(dataFetched.data);
                if (dataFetched.userStatus.isLogged) dispatch(UpdateUiCartQuantity(dataFetched.userStatus));
            } catch (error) {
                console.log(error.message,"error")
            }
        }
        fetchData()
    },[])

    return (
        <section id="all-items">
            <SectionHeading
                title={'All Products'}
                subTitle={'Uncategorized'}
                slug={'all'}
            />
            <div className="items-ctn">
                {
                    data.map(m => (
                        <ItemCard
                            key={m._id}
                            item={m}
                        />
                    ))
                }
            </div>
        </section>
    );
}

export default AllItems;