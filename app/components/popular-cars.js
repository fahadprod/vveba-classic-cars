const PopularCars = () => {
  // Array of popular cars data
  const popularCars = [
    {
      id: 1,
      name: "Ford Mustang GT",
      image: "/images/car-1.jpg",
      price: "$200,000",
    },
    {
      id: 2,
      name: "Chevrolet Camaro",
      image: "/images/car-2.jpg",
      price: "$100,000",
    },
    {
      id: 3,
      name: "Dodge Challenger",
      image: "/images/car-3.jpg",
      price: "$150,000",
    },
    // You can add more cars here as needed
  ];

  return (
    <div className="wrapper">
      <section className="section-2 target" id="popular-cars">
        <h1 className="section-heading">Popular Cars</h1>
        <div className="cards-wrapper center">
          {popularCars.map((car) => (
            <div key={car.id} className="card">
              <h2 className="car-name">{car.name}</h2>
              <img src={car.image} className="card-img" alt={car.name} />
              <h3 className="car-price">{car.price}</h3>
              <button type="button" className="card-btn">
                See More
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PopularCars;