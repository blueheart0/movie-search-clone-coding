import MovieList from "@/components/ui/movie-list";
import styles from "./home.module.css";
async function getMovies() {
  const url = "https://yts.mx/api/v2/list_movies.json";
  const response = await fetch(url, { next: { revalidate: 10 } });
  const data = await response.json();
  return data;
}
export default async function Home() {
  const { data } = await getMovies();
  return (
    <main className={`flex min-h-screen ${styles.homeMain}`}>
      <MovieList initialData={data.movies} />
    </main>
  );
}
