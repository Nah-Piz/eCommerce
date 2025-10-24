import './sec.css'

function SectionHeading({title,subTitle}) { 
    return (
        <>
            <div className="pXl flexSpaceBtn shctn">
                <div className="flexColStart sh-title-ctn">
                    <span className="heading sh-title">{ title }</span>
                    <span className="primaryText sh-sub-title">
                        {subTitle}
                    </span>
                </div>
                <span className="secondaryText spanBtn view-all">View All</span>
            </div>
            
        </>
    );
}

export default SectionHeading;