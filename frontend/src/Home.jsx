import React, { useState } from 'react'


const Home = () => {

    const itemName = "FIREIMG";
    const itemPrice = 500;
    const [quality, setQuality] = useState(1);
    const [finalAmount, setFinalAmount] = useState(itemPrice);

    const decrement = () => {
        if (quality <= 1) {
            setQuality(1)
            setFinalAmount(itemPrice)
        }
        else if (quality >= 1) {
            setQuality(quality - 1)
            setFinalAmount(finalAmount - itemPrice)
        }
    }

    const Increment = () => {
        setQuality(quality + 1)
        setFinalAmount(finalAmount + itemPrice)
    }

    // const checkout = async () => {
    //     try {
    //         const res = await fetch("http://localhost:8200/checkout", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             mode: "cors",
    //             body: JSON.stringify({
    //                 items: [
    //                     {
    //                         id: 1,
    //                         quantity: quality,
    //                         price: itemPrice,
    //                         name: itemName,
    //                     },
    //                 ]
    //             })
    //         })

    //         const data = await res.json();
    //         window.location =data.url

    //     } catch (error) {
    //        console.log(error)
    //     }
    // }


    const checkout = async () => {
        try {
            
            const res = await fetch("http://localhost:8200/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: "cors",
                body: JSON.stringify({
                    items: [
                        {
                            id: 1,
                            quantity: quality,
                            price: itemPrice,
                            name: itemName,
                        },
                    ]
                })
            });

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const data = await res.json();
            console.log("Redirect URL:", data.url);
            window.location = data.url;


        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div>
            <button className='bg-black text-cyan-100' onClick={checkout}>ClickMe</button>
        </div>
    )
}

export default Home