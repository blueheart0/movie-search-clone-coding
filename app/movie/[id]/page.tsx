import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import YoutubePlayer from "@/components/ui/youtube-player";
import Image from "next/image";
import Link from "next/link";

async function getMovieDetail(id: string) {
  const url = `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`;
  const response = await fetch(url, { next: { revalidate: 10 } });
  const data = await response.json();
  return data;
}

export default async function Page({ params }: any) {
  const { id } = params;
  const { data } = await getMovieDetail(id);
  const { movie } = data;
  const {
    title,
    large_cover_image,
    rating,
    runtime,
    year,
    genres,
    description_full,
    yt_trailer_code,
    background_image_original,
  } = movie;
  console.log(data);

  return (
    <div
      className="flex min-h-svh"
      style={{
        backgroundImage: `url(${background_image_original})`,
        backgroundSize: "cover",
      }}
    >
      <div className="flex-1 relative">
        <Image src={large_cover_image} alt={title} fill />
        <Button asChild className="absolute top-4 left-4">
          <Link href="/" className="text-2xl">
            {"⬅️"}
          </Link>
        </Button>
      </div>
      <div className="flex-1 p-5 flex flex-col gap-3">
        <h1 className={"text-7xl font-bold text-center"}>{title}</h1>
        <h2 className={"text-4xl font-bold text-right"}>{year}</h2>
        <div className="flex gap-2 justify-between">
          <h2 className="text-4xl">{`⭐ ${rating}`}</h2>
          <h2 className="text-4xl">{`${runtime} min`}</h2>
        </div>
        <div className="flex gap-2">
          {genres.map((genre: string) => (
            <Badge key={genre}>{genre}</Badge>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl font-bold">Synopsis</h2>
          <p>{description_full}</p>
        </div>
        <div>
          <YoutubePlayer videoId={yt_trailer_code} />
        </div>
      </div>
    </div>
  );
}
