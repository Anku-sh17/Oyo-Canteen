import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatchCart, useCart } from "./ContextReducer";
export default function Card(props) {
  let data = useCart();

  let navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const priceRef = useRef();
  const [isAdded, setIsAdded] = useState(false)

  let options = props.options;
  let priceOptions = Object.keys(options);
  let foodItem = props.item;
  const dispatch = useDispatchCart();
  const handleClick = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  };
  const handleQty = (e) => {
    setQty(e.target.value);
    setIsAdded(false);
  };
  const handleOptions = (e) => {
    setSize(e.target.value);
    setIsAdded(false);
  };
  const handleAddToCart = async () => {
    setIsAdded(true);
    let food = [];
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;

        break;
      }
    }
    if (food !== []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: foodItem._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: foodItem._id,
          name: foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
          img: props.ImgSrc,
        });
        console.log("Size different so simply ADD one more to the list");
        return;
      }
      return;
    }

    await dispatch({
      type: "ADD",
      id: foodItem._id,
      name: foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });

    // setBtnEnable(true)
  };

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  // useEffect(()=>{
  // checkBtn();
  //   },[data])

  let finalPrice = qty * parseInt(options[size]);

  return (
    <div className="d-flex justify-content-center">
      <div
        className="card mt-4 shadow-sm border-0"
        style={{ width: "18rem", maxHeight: "380px", borderRadius: "1rem", overflow: "hidden" }}
      >
        <img
          src={props.ImgSrc}
          className="card-img-top"
          alt={props.foodName}
          style={{
            height: "130px",
            objectFit: "cover",
          }}
        />
        <div className="card-body">
          <h5 className="card-title fw-bold">{props.foodName}</h5>
  
          <div className="container w-100 p-0 my-3 d-flex align-items-center justify-content-between">
            <select
              className="form-select form-select-sm w-50 me-2 bg-white text-black border-0"
              onClick={handleClick}
              onChange={handleQty}
              style={{ borderRadius: "0.5rem" }}
            >
              {Array.from(Array(6), (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
  
            <select
              className="form-select form-select-sm w-50 ms-2 bg-white text-black border-0"
              ref={priceRef}
              onClick={handleClick}
              onChange={handleOptions}
              style={{ borderRadius: "0.5rem" }}
            >
              {priceOptions.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>
  
          <div className="text-danger fw-bold fs-5 text-center my-2">
            ₹{finalPrice}/-
          </div>
  
          <button
            className={`btn w-100 ${isAdded ? "btn-danger" : "btn-success"} fw-bold`}
            onClick={handleAddToCart}
            disabled={isAdded}
            style={{ borderRadius: "0.5rem" }}
          >
            {!isAdded ? "Add to Cart" : "Added"}
          </button>
        </div>
      </div>
    </div>
  );
  

}
//
