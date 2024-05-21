"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import styles from "./movie-card.module.css";

function MovieCard(props: {
  id: string;
  title: string;
  medium_cover_image: string;
  rating: string;
  runtime: string;
  year: string;
}) {
  const { id, title, medium_cover_image, rating, runtime, year } = props;
  useEffect(() => {
    return () => {
      console.log(id + ": unmounting");
    };
  }, []);
  return (
    id && (
      <Link href={`/movie/${id}`} key={id}>
        <div className={`flex flex-col items-center ${styles.movieCard}`}>
          <div className={styles.movieCardImage}>
            <img
              src={medium_cover_image}
              alt={title}
              style={{
                width: "256px",
                height: "384px",
                minHeight: "384px",
                minWidth: "256px",
              }}
            />
          </div>
          <div
            className={
              styles.movieHolder +
              " flex flex-col gap-2 absolute pt-5 pb-5 pl-10 pr-10 min-h-full min-w-full"
            }
          >
            <h1 className="text-2xl font-bold ">{title}</h1>
            <h1 className="text-2xl font-bold">{year}</h1>
            <h1 className="text-2xl font-bold">{rating}</h1>
            <h1 className="text-2xl font-bold">{runtime}</h1>
          </div>
        </div>
      </Link>
    )
  );
}
export default React.memo(MovieCard);
