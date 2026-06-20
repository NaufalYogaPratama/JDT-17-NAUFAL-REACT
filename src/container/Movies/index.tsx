import { useEffect, useState } from 'react'
import { ACCESS_TOKEN, BASE_URL } from '../../constants'
import { useNavigate } from 'react-router';
import Button from '../../components/Button';
import usePopular from '../../hooks/Movies/usePopular';
import MovieCard from '../../components/movies'
import type { Movie } from '../../service/Movies'

const Movie = () => {

    const [nowPlayingList, setNowPlayingList] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { popularMovie } = usePopular();

    const getNowPlayingList = (page: number) => {
        fetch(BASE_URL + `movie/now_playing?page=${page}&language=en=US`, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }).then((res) => res.json()).then((response) => {
            setNowPlayingList(response.results);
        }).finally(() => {
            setLoading(false);
        });
      };

    useEffect(() => {
        getNowPlayingList(1)
        return () => {

        }
    })

    const navigate = useNavigate();

    console.log({popularMovie});
    

  return (
    <div className='flex flex-col items-center gap-6 p-8 min-h-screen w-full'>
        <h1 className='text-3xl font-bold text-gray-800'>Now Playing Movies</h1>
        <Button content='Kembali ke Home' onClick={() => navigate('/')} />
        {loading ? (
            <p className='text-gray-500 animate-pulse'>Loading movies...</p>
        ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl'>
            {nowPlayingList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
            </div>
        )}
        <div className='w-full max-w-6xl'>
        <h1 className='text-2xl font-bold text-gray-800 mb-4'>Popular Movies</h1>
        {(popularMovie ?? []).length === 0 ? (
            <p className='text-gray-500 animate-pulse'>Loading popular movies...</p>
        ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {(popularMovie ?? []).map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
            </div>
        )}
        </div>
    </div>
  )
}

export default Movie