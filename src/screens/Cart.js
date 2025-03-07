import React from "react";
import { useNavigate } from "react-router-dom";
// import Delete from '@material-ui/icons/Delete'
import { useCart, useDispatchCart } from "../components/ContextReducer";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRadio,
  MDBRow,
} from "mdb-react-ui-kit";


export default function Cart({setView}) {
  // let [data,setData] = useState(useCart());
  let data = useCart();
  let dispatch = useDispatchCart();
  let navigate = useNavigate();
  if (data.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 text-white text-center fs-3">
          The Cart is Empty!
        </div>
      </div>
    );
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch("http://localhost:5000/api/auth/orderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    });
    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  };

  const cancelOrder = () => {
    dispatch({ type: "DROP" });
    setView(false);
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0);
  let deliveryCharges = totalPrice*0.05;
  let finalPrice = totalPrice + deliveryCharges;

  return (

    <MDBContainer fluid className="p-5" style={{ backgroundColor: "#eee" }}>
      <MDBCard>
        <MDBCardBody>
          <MDBRow className="d-flex justify-content-center pb-5">
            <MDBCol md="7" xl="5" className="mb-4 mb-md-0">
              <div className="py-4 d-flex flex-row">
                <h5>
                  <span className="far fa-check-square pe-2"></span>
                  <b>ELIGIBLE</b> |
                </h5>
                <span className="ps-2">Pay</span>
              </div>
              <hr />
              <div className="pt-2">
                <div className="d-flex pb-2">
                  <div>
                    <p>
                      <b>
                        Amount Payable{" "}
                        <h4 className="text-success">{finalPrice}</h4>
                      </b>
                    </p>
                  </div>
                  <div className="ms-auto">
                    <p className="text-primary">
                      <MDBIcon
                        fas
                        icon="plus-circle"
                        className="text-primary pe-1"
                      />
                      Add payment card
                    </p>
                  </div>
                </div>
                <br/>
                <br/>
                <div className="d-flex flex-row pb-3">
                  <div className="d-flex align-items-center pe-2">
                    <MDBRadio name="radioNoLabel" id="radioNoLabel1" checked />
                  </div>
                  <div className="rounded border d-flex w-100 p-3 align-items-center">
                    <p className="mb-0">
                      <MDBIcon
                        fab
                        icon="cc-visa"
                        size="lg"
                        className="text-primary pe-2"
                      />{" "}
                      Visa Debit Card
                    </p>
                    <div className="ms-auto">************3456</div>
                  </div>
                </div>
                <div className="d-flex flex-row pb-3">
                  <div className="d-flex align-items-center pe-2">
                    <MDBRadio name="radioNoLabel" id="radioNoLabel1" checked />
                  </div>
                  <div className="rounded border d-flex w-100 p-3 align-items-center">
                    <p className="mb-0">
                      <MDBIcon
                        fab
                        icon="cc-mastercard"
                        size="lg"
                        className="text-dark pe-2"
                      />{" "}
                      Mastercard Office
                    </p>
                    <div className="ms-auto">************1038</div>
                  </div>
                </div>
                <MDBBtn block size="lg">
                  Proceed to payment
                </MDBBtn>
              </div>
            </MDBCol>
            <MDBCol md="5" xl="4" offsetXl="1">
              {" "}
              <div className="py-4 d-flex justify-content-end">
                <p className="text-danger" style={{'cursor' : "pointer"}} onClick={() => cancelOrder()}>Cancel Order</p>
              </div>
              <div
                className="rounded d-flex flex-column p-2"
                style={{ backgroundColor: "#1F1294" }}
              >
                <div className="p-2 me-3">
                  <h4>Order Recap</h4>
                </div>
                {data.map((food, index) => (
                  <div className="p-2 d-flex">
                    <MDBCol size="8">{food.name} x{(food.qty)}</MDBCol>
                  <div className="ms-auto">{food.price}</div>
                </div>
                ))}
                <div className="border-top px-2 mx-2"></div>
                <div className="p-2 d-flex pt-3">
                  <MDBCol size="8">Delivery Charges</MDBCol>
                  <div className="ms-auto">
                    <b>{deliveryCharges}</b>
                  </div>
                </div>
                <div className="border-top px-2 mx-2"></div>
                <div className="p-2 d-flex pt-3">
                  <MDBCol size="8">
                    <b>Total</b>
                  </MDBCol>
                  <div className="ms-auto">
                    <b className="text-success">{finalPrice}</b>
                  </div>
                </div>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
  
}
