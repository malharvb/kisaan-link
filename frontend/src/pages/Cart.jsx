import useCartContext from "../hooks/useCartContext"
import imageList from "../assets/individualItemImageList";
import useUserContext from "../hooks/useUserContext";
import StripeCheckout from "react-stripe-checkout";

function Cart() {
    const { cart } = useCartContext()
    const { user } = useUserContext()
    let publishableKey = 'pk_test_51MiaJ7SJJiuoYq54vLzcQiWRn4mGWOunUZfvQhiQagVgkyfdPR0zyjXdYpHowhHLmc1OaDJI1cIqr488WcaM1g2M00QgmClwCw'
    let total = 0;
    
    console.log(cart)
    cart.forEach((item) => {
        total += parseInt(item.quantity) * parseInt(item.cost)
    })
    
    let taxedTotal = total+ Math.round(total / 10);
    let stripeAmt = taxedTotal*100;
    
    async function payNow(token) {
        const res = await fetch('/buyers/order', {
            method: 'POST',
            body: JSON.stringify({ userType: user.type, orderItems: cart, orderTotalPrice: total, token: token, stripeAmt: stripeAmt }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.accessToken}`
            }
        })

        const json = await res.json()

        console.log(json.mess)
    }

    return (
        <>
            <h2 class="cart-title">Your Cart</h2>
            <div class="small-container cart-page">
                <table>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                    </tr>

                    {cart.map((item) => {
                        imageList.forEach((imageL) => {
                            if (imageL[1] === item.name.toLowerCase()) {
                                item.image = imageL[0]
                            }
                        })
                        return (
                            <tr>
                                <td>
                                    <div class="cart-info">
                                        <img src={item.image} alt="prod cards" class="img1" />
                                        <div>
                                            <p>{item.name}</p>
                                            <small>Price : ???{item.cost}</small>
                                            {/* <a href="">Remove</a> */}
                                        </div>
                                    </div>
                                </td>
                                <td>{item.quantity}</td>
                                <td>???{parseInt(item.quantity) * parseInt(item.cost)}</td>
                            </tr>
                        );
                    })
                    }
                </table>

                <div class="total-price">
                    <table>
                        <tr>
                            <td>Subtotal</td>
                            <td>???{total}</td>
                        </tr>
                        <tr>
                            <td>Tax</td>
                            <td>???{Math.round(total / 10)}</td>
                        </tr>
                        <tr>
                            <td>Total</td>
                            <td>???{total + Math.round(total / 10)}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <StripeCheckout 
                                label='Pay Now'
                                billingAddress
                                shippingAddress 
                                // onClick={(e)=>{handleClick(e);}}
                                stripeKey= {publishableKey}
                                name= 'Pay with Credit or Debit Card'
                                currency="INR"
                                amount={stripeAmt}
                                // description= {"Your total Order value is Rs. "+ taxedTotal}
                                token={payNow}
                                />
                            </td>
                        </tr>
                    </table>
                </div>

            </div>
        </>
    )
}

export default Cart