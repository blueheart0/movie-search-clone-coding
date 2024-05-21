"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { Badge } from "./badge";
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
  const [imageSrc, setImageSrc] = React.useState("/error_ryan.png");
  useEffect(() => {
    setImageSrc(medium_cover_image);
  }, [medium_cover_image]);
  return (
    id && (
      <Link href={`/movie/${id}`} key={id}>
        <div className={`flex flex-col items-center ${styles.movieCard}`}>
          <div
            className={styles.movieCardImag}
            style={{ width: 256, height: 384 }}
          >
            <Image
              src={imageSrc}
              alt={title}
              className="rounded-md object-cover"
              width={256}
              height={384}
              onError={(e) => {
                setImageSrc("/error_ryan.png");
              }}
            />
          </div>
          <div
            className={
              styles.movieHolder +
              " flex flex-col gap-2 absolute justify-between pt-5 pb-5 pl-10 pr-10 min-h-full min-w-full"
            }
          >
            <h1 className="text-2xl font-bold ">{`${title}\n(${year})`}</h1>
            <div className="flex justify-end gap-2">
              <Badge>{`⭐ ${rating}`}</Badge>
              <Badge className="min-w-fit">{`${runtime} min`}</Badge>
            </div>
          </div>
        </div>
      </Link>
    )
  );
}
export default React.memo(MovieCard);
