import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Products = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    (async function () {
      setLoading(true);
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      if (data.length) {
        setData(data);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <>
      {isLoading ? (
        <p style={{ textAlign: "center", margin: "auto" }}>loading...</p>
      ) : (
        data?.map((product) => (
          <div
            className="card"
            key={product.id}
            style={{ width: "800px", textAlign: "center", margin: "auto" }}
          >
            <Link href={`/products/${product.id}`} className="link">
              <div className="card-body">
                <h2>{product.category}</h2>
                <Image
                  src={product.image}
                  alt={product.title}
                  width={200}
                  height={200}
                />
                <h5 className="card-title">{product.title}</h5>
                <p>{product.description}</p>
                <p className="card-price">{product.price} $</p>
                <div className="card-rating">
                  <span>{product.rating.count} user</span>
                  <span className="card-rating-rate">
                    {product.rating.rate} star
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))
      )}
    </>
  );
};

export default Products;
