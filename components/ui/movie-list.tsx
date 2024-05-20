"use client";
import { forwardRef, useState } from "react";
import { VirtuosoGrid } from "react-virtuoso";
import MovieCard from "./movie-card";

// async function getMovies() {
//   const url = "https://yts.mx/api/v2/list_movies.json";
//   const response = await fetch(url, { next: { revalidate: 10 } });
//   const data = await response.json();
//   return data;
// }

// async function getMoreMovie(page: number) {
//   const url = `https://yts.mx/api/v2/list_movies.json?page=${page}`;
//   const response = await fetch(url, { next: { revalidate: 10 } });
//   const data = await response.json();
//   return data;
// }

export default function MovieList({ initialData }: { initialData: any }) {
  const [movies, setMovies] = useState(initialData);

  const handleNeedMore = async () => {
    console.log("need more");
    const url = `https://yts.mx/api/v2/list_movies.json?page=${
      movies.length / 20 + 1
    }`;
    const response = await fetch(url);
    const { data } = await response.json();
    console.log(data);
    setMovies((prev: any) => {
      return [...prev, ...data.movies];
    });
  };
  return (
    <VirtuosoGrid
      style={{
        height: "100vh",
        width: "100%",
      }}
      data={movies}
      endReached={handleNeedMore}
      components={{
        // eslint-disable-next-line react/display-name
        List: forwardRef(({ style, children, ...props }, ref) => {
          //   console.log(props);
          return (
            <div
              ref={ref}
              {...props}
              style={{
                display: "flex",
                flexWrap: "wrap",
                ...style,
              }}
            >
              {children}
            </div>
          );
        }),
        Item: ({ children, ...props }) => {
          console.log(props);
          return (
            <div
              {...props}
              style={{
                // padding: "0.5rem",
                // width: "33%",
                display: "flex",
                flex: "none",
                alignContent: "stretch",
                boxSizing: "border-box",
              }}
            >
              {children}
            </div>
          );
        },
      }}
      itemContent={(index, movie) => {
        return <MovieCard key={movie.id + index} movie={movie} />;
      }}
    />
  );
}
