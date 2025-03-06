import React from 'react'
import "./datalist.css";

const DataList = ({ products }) => {
    console.log(products)
    return (
        
         <div id="parent-div">
            {
                products.map((p) =>(

                    <div id="child-div">
                        <img src={p.imageUrl} alt="" className='img' />
                        
                        <h2>{p.name}</h2>
                        <p>{p.description}</p>
                        <p><b>price:{p.price}</b></p>
                       
                    </div>
                

                ))

            }
            <br />
</div>
    
    )
}

export default DataList