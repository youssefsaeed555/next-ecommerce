import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

function Product({ product, comments }) {
  const [comment, setComment] = useState("");
  const [email, setEmail] = useState("");
  const [commentsData, setComments] = useState(comments.data);
  console.log(commentsData);
  const params = useRouter();
  const handleComment = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/comments/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment,
        email,
        productId: params.query.slug,
      }),
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <>
      <div
        className="card"
        style={{ width: "800px", textAlign: "center", margin: "auto" }}
      >
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
              {product.rating.rate} start
            </span>
          </div>
          <Link
            href="/products"
            style={{
              margin: "auto",
              backgroundColor: "blue",
              padding: "10px",
              color: "white",
            }}
          >
            home
          </Link>
          <form
            className="comment-body"
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "40px",
              gap: "10px",
              padding: "10px",
              border: "1px solid black",
              borderRadius: "10px",
            }}
          >
            <textarea
              className="comment-content"
              placeholder="write your comment"
              style={{ padding: "40px" }}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <input
              type="email"
              placeholder="input your mail"
              style={{ padding: "10px" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <button
              onClick={handleComment}
              style={{
                padding: "10px",
                backgroundColor: "blue",
                color: "white",
              }}
            >
              send your comment
            </button>
          </form>
          {commentsData.map((comment) => (
            <div
              style={{
                display: "flex",
                padding: "10px",
                border: "1px solid black",
                borderRadius: "10px",
                justifyContent: "space-between",
              }}
            >
              <p>Email: {comment.email}</p>
              <p>Comment: {comment.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.params;

  const res = await fetch(`https://fakestoreapi.com/products/${slug}`);
  const product = await res.json();
  if (!product) {
    return {
      notFound: true,
    };
  }
  const commentRes = await fetch(`http://localhost:3000/api/comments/${slug}`);
  const comments = await commentRes.json();

  return {
    props: {
      product,
      comments,
    },
  };
}

export default Product;
