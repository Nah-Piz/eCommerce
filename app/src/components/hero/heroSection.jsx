import { useRef, useState } from 'react';
import './hero.css'
import { SearchPdts } from '../../api/products-req';

function HeroSection() {

    const [searchResults, setSearchResults] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [value, setValue] = useState("");

    const data = [
        {
            id: 1,
            name: "Super Bread Toaster",
            image: "public/images/black-2-slot-toaster.jpg",
            keywords: ["super","bread","toaster"],
            price: 300000
        },
        {
            id: 2,
            name: "TipTop Toaster",
            image: "public/images/black-2-slot-toaster.jpg",
            keywords: ["tiptop","toaster"],
            price: 120000
        },
        {
            id: 3,
            name: "McDonald Toaster slotter",
            image: "public/images/black-2-slot-toaster.jpg",
            keywords: ["mcdonald","slotter","toaster"],
            price: 5600000
        },
        {
            id: 4,
            name: "Cafe Javas Toaster",
            image: "public/images/black-2-slot-toaster.jpg",
            keywords: ["cafe","javas","toaster"],
            price: 500000
        },
        {
            id: 5,
            name: "Olive Toaster",
            image: "public/images/black-2-slot-toaster.jpg",
            keywords: ["olive","toaster"],
            price: 200000
        }
    ];

    const handleSearchTyping = async (event) => {
        const typed = event.target.value;
        setValue(typed);
        if (typed !== "") {
            try {
                const data = await SearchPdts(typed);
                console.log(data)
                setSearchResults(data.data);
            } catch (error) {
                console.error(error)
            }
        }
    }

    return (  
        <>
            <section className="innerWidth hero-stn">
                <div className="sch-stn" style={{borderColor: (value || isTyping)?"orange":"transparent"}}>
                    <div className="flexCenter primaryText lbl-ctn">
                        <span className="lbl">What's that product you can't find.  {isTyping} { value }</span>
                    </div>
                    <form action="" className='flexCenter'>
                        <div
                            className="sch-ctn"
                            onFocus={() => setIsTyping(true)}
                            onBlur={() => setIsTyping(false)}
                            style={{borderColor: (value || isTyping)?"orange":""}}
                        >
                            <input
                                type="text"
                                className='sch'
                                placeholder='Search for any product here...'
                                onKeyDown={(event)=>handleSearchTyping(event)}
                            />
                            <label htmlFor="" className="sch-lbl">
                                <button className="button">Search</button>
                            </label>
                        </div>
                    </form>
                    <div className="rlt-mdl">
                        <div
                            className="rlt-stn"
                            style={{transform: `translateY(${(value || isTyping)?"0":"-1000"}px)`,height: (value || isTyping)?"":"0"}}
                        >
                            {
                                (value) ? (
                                    <div className="rlt-ttl">
                                        <div className="primaryText">Search Results for { value }</div>
                                        <span className="secondaryText">{searchResults.length} results found.</span>
                                    </div>
                                ) : (
                                    <div className="rlt-ttl">
                                        <div className="primaryText">Try seaching for any product.</div>
                                    </div>
                                )
                            }
                            <div className="rlt-ctn">
                                {
                                    searchResults.map(result => (
                                        <Link to={result._id}>
                                            <div key={result._id} className="flexStart rlt-card">
                                                <div className="img-ctn">
                                                    <img src={result.image} alt={result.name} style={{width: "100%", height: "100%"}} />
                                                </div>
                                                <div className="rlt-dtl">
                                                    <div className="primaryText">{ result.name }</div>
                                                    <span className="secondaryText">{ result.price }</span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default HeroSection;