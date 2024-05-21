"use client";
import { produce } from "immer";
import React, { forwardRef, useCallback, useState } from "react";
import { VirtuosoGrid } from "react-virtuoso";
import MovieCard from "./movie-card";

function ItemContent(props: { index: number; movie: any }) {
  const { movie } = props;
  const { id, title, medium_cover_image, rating, runtime, year } = movie;
  return (
    <MovieCard
      id={id}
      key={id}
      title={title}
      medium_cover_image={medium_cover_image}
      rating={rating}
      runtime={runtime}
      year={year}
    />
  );
}
const ItemContentMemo = React.memo(ItemContent);

const ListItems = forwardRef<HTMLDivElement, any>(
  ({ style, children, ...props }, ref) => {
    //   console.log(props);
    return (
      <div
        ref={ref}
        {...props}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(256px, 256px))",
          minHeight: "384px",
          ...style,
        }}
      >
        {children}
      </div>
    );
  }
);
ListItems.displayName = "ListItems";

function Item({
  children,
  ...props
}: {
  children?: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <div
      {...props}
      style={{
        minWidth: "256px",
        minHeight: "384px",
      }}
    >
      {children}
    </div>
  );
}
const ItemMemo = React.memo(Item);

export default function MovieList({ initialData }: { initialData: any }) {
  const [movies, setMovies] = useState(initialData);
  const loadMore = useCallback(async (movies: any[]) => {
    console.log("need more");
    const url = `https://yts.mx/api/v2/list_movies.json?page=${
      movies.length / 20 + 1
    }`;
    const response = await fetch(url);
    const { data } = await response.json();
    return data;
  }, []);
  const handleNeedMore = useCallback(async () => {
    const data = await loadMore(movies);
    setMovies(
      produce(movies, (draft: any[]) => {
        draft.push(...data.movies);
        return draft;
      })
    );
  }, [loadMore, movies]);

  return (
    <VirtuosoGrid
      overscan={{
        main: 20,
        reverse: 20,
      }}
      style={{
        minHeight: "100vh",
        height: "100vh",
        width: "100%",
        minWidth: "100%",
      }}
      data={movies}
      endReached={handleNeedMore}
      components={{
        List: ListItems,
        Item: ItemMemo,
      }}
      itemContent={(index, movie) => (
        <ItemContentMemo index={index} movie={movie} />
      )}
    />
  );
}
