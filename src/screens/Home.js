import React, { useEffect, useState } from "react";
import Card from "../components/Card";
// import Carousel from '../components/Carousel'
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Brightness1 } from "@mui/icons-material";

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState("");
  const loadFoodItems = async () => {
    let response = await fetch("http://localhost:5000/api/auth/foodData", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    // console.log(response[1][0].CategoryName)
    setFoodItems(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadFoodItems();
  }, []);

  return (
    <div style={{
      backgroundImage:
        'url("https://images.template.net/108153/food-banner-background-g4msl.png")',
      backgroundSize: "cover"
    }}>
      <div>
        <Navbar />
      </div>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade "
          data-bs-ride="carousel"
        >
          <div className="carousel-inner " id="carousel">
            <div class=" carousel-caption  " style={{ zIndex: "9" }}>
              <div className=" d-flex justify-content-center">
                {" "}
                <input
                  className="form-control me-2 w-75 bg-white text-dark"
                  type="search"
                  placeholder="Search in here..."
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <button
                  className="btn text-white bg-danger"
                  onClick={() => {
                    setSearch("");
                  }}
                >
                  X
                </button>
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://images.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg?cs=srgb&dl=close-up-cooking-dinner-46239.jpg&fm=jpg"
                className="d-block w-100  "
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://images7.alphacoders.com/368/368875.jpg"
                className="d-block w-100 "
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://www.safehealthcenter.com/wp-content/uploads/2020/07/organic-food-for-healthy-nutrition-and-superfoods-EPFYH7J.jpg"
                className="d-block w-100 "
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container" >
        {" "}
        {foodCat !== []
          ? foodCat.map((data) => {
              return (
                <div className="row mb-3">
                  <div key={data.id} className="fs-3 m-3 text-black">
                    {data.CategoryName}
                  </div>
                  <hr
                    id="hr-success"
                    style={{
                      height: "4px",
                      backgroundImage:
                        "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))",
                    }}
                  />
                  {foodItems !== [] ? (
                    foodItems
                      .filter(
                        (items) =>
                          items.CategoryName === data.CategoryName &&
                          items.name
                            .toLowerCase()
                            .includes(search.toLowerCase())
                      )
                      .map((filterItems) => {
                        return (
                          <div
                            key={filterItems.id}
                            className="col-12 col-md-6 col-lg-3"
                          >
                            <Card
                              foodName={filterItems.name}
                              item={filterItems}
                              options={filterItems.options[0]}
                              ImgSrc={filterItems.img}
                            ></Card>
                          </div>
                        );
                      })
                  ) : (
                    <div> No Such Data </div>
                  )}
                </div>
              );
            })
          : ""}
      </div>
      <Footer />
    </div>
  );
}
