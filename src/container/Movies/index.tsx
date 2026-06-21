import { useEffect, useState } from "react";
import { ACCESS_TOKEN, BASE_URL } from "../../constants";
import { useNavigate } from "react-router";
import Button from "../../components/button";
import usePopular from "../../hooks/Movies/usePopular";
import MovieCard from "../../components/movies";
import type { Movie } from "../../service/Movies";
import axios from "axios";
import { Input } from "../../components/ui/input";

const Movie = () => {
  const [nowPlayingList, setNowPlayingList] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [upcomingList, setUpcomingList] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Movie[]>([]);
  const { popularMovie } = usePopular();

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

  const getUpcomingList = (page: number) => {
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

  const getTopRated = (page: number) => {
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

  console.log({ popularMovie });

  return (
    <div className="flex flex-col items-center gap-6 p-8 min-h-screen w-full">
      <h1 className="text-3xl font-bold text-gray-800">Now Playing Movies</h1>
      <Button content="Kembali ke Home" onClick={() => navigate("/")} />
        <div className="flex w-full max-w-sm items-center gap-2 mt-4 mb-8">
            <Input type="text" placeholder="Cari film..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
        </div>
        <Button content="Cari" onClick={handleSearch} />
        {searchResult.length > 0 && (
            <div className="w-full max-w-6xl mb-12">
                <h1 className="text-2xl font-bold text-blue-600 mb-4">Hasil Pencarian: "{searchQuery}"</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {searchResult.map((movie) => (
                        <MovieCard key={movie.id} movie={movie}/>
                    ))}
                </div>
            </div>
        )}
      {loading ? (
        <p className="text-gray-500 animate-pulse">Loading movies...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
          {nowPlayingList.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
      <div className="w-full max-w-6xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Popular Movies
        </h1>
        {(popularMovie ?? []).length === 0 ? (
          <p className="text-gray-500 animate-pulse">
            Loading popular movies...
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {(popularMovie ?? []).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
      <div className="w-full max-w-6xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Upcoming Movies
        </h1>
        {(upcomingList ?? []).length === 0 ? (
          <p className="text-gray-500 animate-pulse">
            Loading Upcoming Movies...
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {(upcomingList ?? []).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
      <div className="w-full max-w-6xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Top Rated Movies
        </h1>
        {(topRated ?? []).length === 0 ? (
          <p className="text-gray-500 animate-pulse">
            Loading Top Rated Movies...
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {(topRated ?? []).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Movie;
