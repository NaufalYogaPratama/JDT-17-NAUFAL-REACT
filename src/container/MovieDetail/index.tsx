import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { ACCESS_TOKEN, BASE_URL } from "../../constants";
import { Badge } from "../../components/ui/badge";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

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
      <div className="flex h-screen w-full items-center justify-center bg-[#000000]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#CB2957]/20 border-t-[#CB2957]"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-[#000000] text-[#EEEEEE]">
        <h1 className="text-2xl font-bold">Movie not found</h1>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex h-10 items-center justify-center rounded-lg bg-[#CB2957] px-5 py-2 text-sm font-semibold text-white shadow-md hover:bg-[#CB2957]/90 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        >
          Go Back
        </button>
      </div>
    );
  }

  const backdropUrl = movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` 
    : null;

  return (
    <div className="movie-detail-container min-h-screen bg-[#000000] text-[#EEEEEE] font-sans relative overflow-x-hidden flex flex-col w-full">
      
      <div className="flex-1 w-full relative">
        {/* Absolute Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 z-30 flex items-center gap-2 px-4 py-2 bg-black/60 hover:bg-[#CB2957] text-[#EEEEEE] hover:border-[#CB2957] border border-neutral-800 rounded-lg hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer text-sm font-semibold shadow-md"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        {/* Cinematic Hero Banner */}
        <section className="relative w-full h-[45vh] sm:h-[55vh] md:h-[60vh] bg-black">
        {backdropUrl ? (
          <img
            src={backdropUrl}
            alt={movie.title}
            className="w-full h-full object-cover object-top opacity-50"
          />
        ) : (
          <div className="w-full h-full bg-neutral-900 flex items-center justify-center text-neutral-600">
            No backdrop available
          </div>
        )}
        {/* Cinematic Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#000000]/50 to-transparent" />
      </section>

      {/* Main Container (overlapping the hero banner) */}
      <div className="max-w-5xl mx-auto px-6 sm:px-12 -mt-24 sm:-mt-36 md:-mt-48 relative z-20 pb-20">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* Overlapping Poster */}
          <div className="w-40 sm:w-48 md:w-56 aspect-[2/3] rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.8)] border border-neutral-900/60 shrink-0 bg-[#0B0B0B] mx-auto md:mx-0">
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-neutral-900 text-neutral-500">
                No Poster
              </div>
            )}
          </div>

          {/* Info Details */}
          <div className="flex flex-col text-left gap-4 flex-1 w-full">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#EEEEEE] leading-tight text-center md:text-left drop-shadow-md">
              {movie.title}
            </h1>

            {/* Badges / Meta Info */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-1">
              {/* Rating Badge */}
              <Badge variant="secondary" className="bg-amber-500/10 border-amber-500/30 text-amber-400 font-bold px-3 py-1 rounded-full text-xs flex items-center gap-1">
                ★ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
              </Badge>

              {/* Release Date Badge */}
              {movie.release_date && (
                <Badge variant="outline" className="bg-neutral-900 border-neutral-800 text-[#DDDDDD] px-3 py-1 rounded-full text-xs flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-neutral-400" />
                  {movie.release_date}
                </Badge>
              )}

              {/* Runtime Badge (if available in API data) */}
              {(movie as any).runtime && (
                <Badge variant="outline" className="bg-neutral-900 border-neutral-800 text-[#DDDDDD] px-3 py-1 rounded-full text-xs flex items-center gap-1">
                  <Clock className="w-3 h-3 text-neutral-400" />
                  {(movie as any).runtime} min
                </Badge>
              )}

              {/* Genres Badges */}
              {movie.genres?.map((genre) => (
                <Badge
                  key={genre.id}
                  variant="outline"
                  className="bg-[#CB2957]/10 border-[#CB2957]/20 text-[#CB2957] px-3 py-1 rounded-full text-xs font-semibold"
                >
                  {genre.name}
                </Badge>
              ))}
            </div>

            {/* Movie Overview Section */}
            <div className="mt-4 bg-[#0B0B0B] border border-neutral-900/60 p-6 rounded-xl shadow-lg">
              <h2 className="text-base sm:text-lg font-bold text-[#EEEEEE] mb-2 tracking-wide">
                Overview
              </h2>
              <p className="leading-relaxed text-[#DDDDDD] font-light text-sm sm:text-base">
                {movie.overview || "No overview available."}
              </p>
            </div>

            {/* Video Trailer Section */}
            {trailerKey && (
              <div className="mt-6">
                <h2 className="text-base sm:text-lg font-bold text-[#EEEEEE] mb-3 tracking-wide flex items-center gap-2">
                  <span className="w-1.5 h-5 bg-[#CB2957] rounded-full inline-block"></span>
                  Official Trailer
                </h2>
                <div className="w-full aspect-video rounded-xl overflow-hidden border border-neutral-900 bg-[#0B0B0B] shadow-2xl">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${trailerKey}?autoplay=0`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full border-none"
                  ></iframe>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

      </div>
    </div>
  );
};

export default MovieDetail;

