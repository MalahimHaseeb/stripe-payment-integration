import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import stripePackage from "stripe";

dotenv.config()
const app = express()



const stripe = stripePackage(process.env.SECRET_STRIPE_KEY);


app.use(express.json())
app.use(cors({origin:"http://localhost:8200/checkout"}));

const port = process.env.PORT || 5000


app.post("/checkout", async(req,res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types : ["card"],
            "mode":"payment",
            line_items : req.body.items.map(item => {
               return{ 
                price_data:{
                    currency: "inr",
                    product_data : {
                        name: item.name,
                    },
                    unit_amount : (item.price)*100,
                },
                quantity:item.quantity
            }
            }),
            success_url : `http://localhost:${port}/success`,
            cancel_url : `http://localhost:${port}/cancel`,
        })

          res.json({url:session.url})

    } catch (error) {
       res.status(500).json({error:error.message})
    }
})



app.listen(port,()=>{
    console.log(`app is listening on port ${port}`)
})
