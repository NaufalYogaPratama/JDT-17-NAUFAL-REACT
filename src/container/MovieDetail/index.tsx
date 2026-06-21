import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { ACCESS_TOKEN, BASE_URL } from "../../constants";

interface Genre {
  id: number;
  name: string;
}

interface MovieDetail {
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  genres: Genre[];
}

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}movie/${id}?language=en-US`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
      .then((response) => {
        setMovie(response.data);
      })
      .catch((error) => console.error("Error fetching movie details:", error))
      .finally(() => {
        setLoading(false);
      });
    axios
      .get(`${BASE_URL}movie/${id}/videos?language=en-US`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
      .then((response) => {
        const videos = response.data.results;
        const trailer = videos.find(
          (vid: any) => vid.type === "Trailer" && vid.site === "YouTube",
        );

        if (trailer) {
          setTrailerKey(trailer.key);
        }
      })
      .catch((error) => console.error(error));
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Movie not found</h1>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex h-10 items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-slate-50 shadow transition-colors hover:bg-slate-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="mx-auto max-w-5xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex h-9 items-center justify-center rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-4 w-4"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back
        </button>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 lg:w-1/4">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-[400px] w-full items-center justify-center bg-slate-100 text-slate-400">
                  No Image Available
                </div>
              )}
            </div>

            <div className="flex flex-col p-6 md:w-2/3 lg:w-3/4 md:p-8">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {movie.title}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center rounded-full border border-slate-200 px-2.5 py-0.5 text-xs font-semibold text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
                  {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                </div>
                <div className="inline-flex items-center rounded-full border border-slate-200 px-2.5 py-0.5 text-xs font-semibold text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
                  {movie.release_date}
                </div>
                {movie.genres?.map((genre) => (
                  <div
                    key={genre.id}
                    className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
                  >
                    {genre.name}
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h2 className="text-lg font-semibold text-slate-900">
                  Overview
                </h2>
                <p className="mt-2 leading-7 text-slate-600">
                  {movie.overview || "No overview available."}
                </p>
              </div>
              <div>
                <h2>Trailer</h2>
                <div>
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${trailerKey}?autoplay=0`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
