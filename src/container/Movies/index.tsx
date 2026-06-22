import { useEffect, useState, useRef } from "react";
import { ACCESS_TOKEN, BASE_URL, IMAGE_BASE_URL } from "../../constants";
import { useNavigate } from "react-router";
import usePopular from "../../hooks/Movies/usePopular";
import MovieCard from "../../components/movies";
import type { Movie } from "../../service/Movies";
import axios from "axios";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { Play, Star, Calendar, ChevronLeft, ChevronRight } from "lucide-react";

const MoviePage = () => {
  const [nowPlayingList, setNowPlayingList] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [upcomingList, setUpcomingList] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Movie[]>([]);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const { popularMovie } = usePopular();

  const nowPlayingRef = useRef<HTMLDivElement>(null);
  const popularRef = useRef<HTMLDivElement>(null);
  const upcomingRef = useRef<HTMLDivElement>(null);
  const topRatedRef = useRef<HTMLDivElement>(null);

  const scroll = (ref: React.RefObject<HTMLDivElement | null>, direction: "left" | "right") => {
    if (ref.current) {
      const { scrollLeft, clientWidth } = ref.current;
      const scrollAmount = clientWidth * 0.75;
      const scrollTo = direction === "left" 
        ? scrollLeft - scrollAmount 
        : scrollLeft + scrollAmount;
      ref.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const getNowPlayingList = (page: number) => {
    fetch(BASE_URL + `movie/now_playing?page=${page}&language=en=US`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        setNowPlayingList(response.results);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getUpcomingList = (_page: number) => {
    axios
      .get(BASE_URL + `movie/upcoming`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
      .then((res) => {
        setUpcomingList(res.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getTopRated = (_page: number) => {
    axios
      .get(BASE_URL + `movie/top_rated`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
      .then((res) => {
        setTopRated(res.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSearch = () => {
    if (!searchQuery) {
        return;
    }
    axios
      .get(BASE_URL + `search/movie?query=${searchQuery}&language=en-US`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
      .then((res) => {
        setSearchResult(res.data.results);
        setHasSearched(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getNowPlayingList(1);
    getUpcomingList(1);
    getTopRated(1);
    return () => {};
  }, []);

  const navigate = useNavigate();

  // Find a movie to feature as a banner (prioritize popular or now playing)
  const featuredMovie = nowPlayingList[3] || (popularMovie ?? [])[0] || upcomingList[0];
  const backdropUrl = (featuredMovie as any)?.backdrop_path
    ? `${IMAGE_BASE_URL.replace('/w500', '/original')}${(featuredMovie as any).backdrop_path}`
    : null;

  return (
    <div className="movie-page-container min-h-screen bg-[#000000] text-[#EEEEEE] flex flex-col w-full overflow-x-hidden font-sans">
      
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} onSearchSubmit={handleSearch} />

      {hasSearched ? (
        /* Search Active View: Show ONLY search results in a grid */
        <main className="flex-1 w-full max-w-6xl mx-auto px-6 sm:px-12 py-8 text-left relative z-10 min-h-[60vh]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-900 pb-4 mb-8">
            <div className="mt-12">
              <span className="text-4xl font-bold text-[#CB2957] uppercase tracking-wider">Hasil Pencarian</span>
            </div>
          </div>

          {searchResult.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 justify-items-center">
              {searchResult.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-center">
              <span className="text-4xl mb-3">🔍</span>
              <h3 className="text-lg font-bold text-white">Tidak ada hasil ditemukan</h3>
              <p className="text-sm text-neutral-500 mt-1 max-w-md">
                Kami tidak menemukan film yang cocok dengan "{searchQuery}". Silakan coba kata kunci lain.
              </p>
            </div>
          )}
        </main>
      ) : (
        /* Standard Portal View: Banner + Horizontal scrolling Rails */
        <>
          {/* Cinematic Hero Section */}
          {featuredMovie && (
            <section className="relative w-full h-[65vh] sm:h-[75vh] md:h-[85vh] flex items-center overflow-hidden bg-black border-b border-neutral-900/40">
              {backdropUrl && (
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src={backdropUrl}
                    alt={featuredMovie.original_title || (featuredMovie as any).title}
                    className="w-full h-full object-cover object-top opacity-60 transition-opacity duration-1000"
                  />
                  {/* Dark Overlays for outstanding text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/45 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/10 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
                </div>
              )}

              {/* Hero Details */}
              <div className="relative z-10 max-w-4xl px-6 sm:px-12 md:px-16 flex flex-col gap-4 text-left">
                {/* <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#CB2957]/20 border border-[#CB2957]/45 text-[#CB2957] w-fit">
                  ★ FEATURED MOVIE
                </span> */}
                
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#EEEEEE] max-w-2xl leading-none drop-shadow-md">
                  {featuredMovie.original_title || (featuredMovie as any).title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#DDDDDD] font-semibold">
                  <span className="flex items-center gap-1 text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    {(featuredMovie as any).vote_average ? (featuredMovie as any).vote_average.toFixed(1) : 'N/A'}
                  </span>
                  {(featuredMovie as any).release_date && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-neutral-400" />
                      {(featuredMovie as any).release_date}
                    </span>
                  )}
                </div>

                <p className="text-sm text-[#DDDDDD] max-w-xl line-clamp-3 leading-relaxed drop-shadow font-light">
                  {featuredMovie.overview}
                </p>

                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => navigate(`/movie/${featuredMovie.id}`)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#CB2957] hover:bg-[#CB2957]/90 text-white font-bold rounded-lg transition-all duration-300 hover:scale-105 shadow-md hover:shadow-[#CB2957]/30 active:scale-95 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-white" /> Details
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* Main Content Area */}
          <div className="flex flex-col gap-4 py-8 bg-[#000000] relative z-10">
            
            {/* 1. Now Playing Rail */}
            <section className="w-full px-6 sm:px-12 py-4 text-left">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#EEEEEE] mb-2 tracking-wide flex items-center gap-2">
                <span className="w-1.5 h-6 bg-[#CB2957] rounded-full inline-block"></span>
                Now Playing Movies
              </h2>
              {loading ? (
                <div className="h-72 w-full flex items-center justify-center">
                  <p className="text-neutral-500 animate-pulse text-sm">Loading movies...</p>
                </div>
              ) : (
                <div className="relative group/rail">
                  <button 
                    onClick={() => scroll(nowPlayingRef, 'left')} 
                    className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-[#CB2957] hover:border-[#CB2957] text-white p-2 rounded-full opacity-0 group-hover/rail:opacity-100 transition-all duration-300 border border-neutral-800 cursor-pointer shadow-lg"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => scroll(nowPlayingRef, 'right')} 
                    className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-[#CB2957] hover:border-[#CB2957] text-white p-2 rounded-full opacity-0 group-hover/rail:opacity-100 transition-all duration-300 border border-neutral-800 cursor-pointer shadow-lg"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <div ref={nowPlayingRef} className="flex overflow-x-auto gap-4 sm:gap-6 py-4 scroll-smooth no-scrollbar select-none">
                    {nowPlayingList.map((movie) => (
                      <MovieCard key={movie.id} movie={movie} />
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* 2. Popular Movies Rail */}
            <section className="w-full px-6 sm:px-12 py-4 text-left">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#EEEEEE] mb-2 tracking-wide flex items-center gap-2">
                <span className="w-1.5 h-6 bg-[#CB2957] rounded-full inline-block"></span>
                Popular Movies
              </h2>
              {(popularMovie ?? []).length === 0 ? (
                <div className="h-72 w-full flex items-center justify-center">
                  <p className="text-neutral-500 animate-pulse text-sm">Loading popular movies...</p>
                </div>
              ) : (
                <div className="relative group/rail">
                  <button 
                    onClick={() => scroll(popularRef, 'left')} 
                    className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-[#CB2957] hover:border-[#CB2957] text-white p-2 rounded-full opacity-0 group-hover/rail:opacity-100 transition-all duration-300 border border-neutral-800 cursor-pointer shadow-lg"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => scroll(popularRef, 'right')} 
                    className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-[#CB2957] hover:border-[#CB2957] text-white p-2 rounded-full opacity-0 group-hover/rail:opacity-100 transition-all duration-300 border border-neutral-800 cursor-pointer shadow-lg"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <div ref={popularRef} className="flex overflow-x-auto gap-4 sm:gap-6 py-4 scroll-smooth no-scrollbar select-none">
                    {(popularMovie ?? []).map((movie) => (
                      <MovieCard key={movie.id} movie={movie} />
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* 3. Upcoming Movies Rail */}
            <section className="w-full px-6 sm:px-12 py-4 text-left">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#EEEEEE] mb-2 tracking-wide flex items-center gap-2">
                <span className="w-1.5 h-6 bg-[#CB2957] rounded-full inline-block"></span>
                Upcoming Movies
              </h2>
              {(upcomingList ?? []).length === 0 ? (
                <div className="h-72 w-full flex items-center justify-center">
                  <p className="text-neutral-500 animate-pulse text-sm">Loading upcoming movies...</p>
                </div>
              ) : (
                <div className="relative group/rail">
                  <button 
                    onClick={() => scroll(upcomingRef, 'left')} 
                    className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-[#CB2957] hover:border-[#CB2957] text-white p-2 rounded-full opacity-0 group-hover/rail:opacity-100 transition-all duration-300 border border-neutral-800 cursor-pointer shadow-lg"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => scroll(upcomingRef, 'right')} 
                    className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-[#CB2957] hover:border-[#CB2957] text-white p-2 rounded-full opacity-0 group-hover/rail:opacity-100 transition-all duration-300 border border-neutral-800 cursor-pointer shadow-lg"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <div ref={upcomingRef} className="flex overflow-x-auto gap-4 sm:gap-6 py-4 scroll-smooth no-scrollbar select-none">
                    {(upcomingList ?? []).map((movie) => (
                      <MovieCard key={movie.id} movie={movie} />
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* 4. Top Rated Movies Rail */}
            <section className="w-full px-6 sm:px-12 py-4 text-left">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#EEEEEE] mb-2 tracking-wide flex items-center gap-2">
                <span className="w-1.5 h-6 bg-[#CB2957] rounded-full inline-block"></span>
                Top Rated Movies
              </h2>
              {(topRated ?? []).length === 0 ? (
                <div className="h-72 w-full flex items-center justify-center">
                  <p className="text-neutral-500 animate-pulse text-sm">Loading top rated movies...</p>
                </div>
              ) : (
                <div className="relative group/rail">
                  <button 
                    onClick={() => scroll(topRatedRef, 'left')} 
                    className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-[#CB2957] hover:border-[#CB2957] text-white p-2 rounded-full opacity-0 group-hover/rail:opacity-100 transition-all duration-300 border border-neutral-800 cursor-pointer shadow-lg"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => scroll(topRatedRef, 'right')} 
                    className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-[#CB2957] hover:border-[#CB2957] text-white p-2 rounded-full opacity-0 group-hover/rail:opacity-100 transition-all duration-300 border border-neutral-800 cursor-pointer shadow-lg"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <div ref={topRatedRef} className="flex overflow-x-auto gap-4 sm:gap-6 py-4 scroll-smooth no-scrollbar select-none">
                    {(topRated ?? []).map((movie) => (
                      <MovieCard key={movie.id} movie={movie} />
                    ))}
                  </div>
                </div>
              )}
            </section>

          </div>
        </>
      )}
      <Footer />
    </div>
  );
};

export default MoviePage;

