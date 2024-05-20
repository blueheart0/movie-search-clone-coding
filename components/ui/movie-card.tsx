import Link from "next/link";
import styles from "./movie-card.module.css";

export default function MovieCard({ movie }: { movie: any }) {
  return (
    <Link href={`/movie/${movie.id}`} key={movie.id}>
      <div className={`flex flex-col items-center ${styles.movieCard}`}>
        <div className={styles.movieCardImage}>
          <img
            src={movie.medium_cover_image}
            alt={movie.title}
            style={{ width: "256px", height: "384px" }}
          />
        </div>
        <div
          className={
            styles.movieHolder +
            " flex flex-col gap-2 absolute pt-5 pb-5 pl-10 pr-10 min-h-full min-w-full"
          }
        >
          <h1 className="text-2xl font-bold ">{movie.title}</h1>
          <h1 className="text-2xl font-bold">{movie.year}</h1>
          <h1 className="text-2xl font-bold">{movie.rating}</h1>
          <h1 className="text-2xl font-bold">{movie.runtime}</h1>
        </div>
      </div>
    </Link>
  );
}
