import { useNavigate } from 'react-router'
import { IMAGE_BASE_URL } from '../../constants'
import type { Movie } from '../../service/Movies'

interface Props {
  movie: Movie
}

const MovieCard = ({ movie }: Props) => {
  const navigate = useNavigate();

  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : null

  return (
    <article 
    className='font-mono w-48 rounded-xl bg-slate-200 text-black shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 overflow-hidden flex flex-col'
    onClick={() => navigate(`/movie/${movie.id}`)}
    >
      {posterUrl ? (
        <img
          src={posterUrl}
          alt={movie.original_title}
          className='w-full h-72 object-cover'
        />
      ) : (
        <div className='w-full h-72 bg-slate-700 flex items-center justify-center text-xs text-slate-800'>
          No poster
        </div>
      )}
      <div className='p-3 flex flex-col gap-2 flex-1 min-h-0'>
        <h4 className='font-semibold text-sm leading-snug line-clamp-2 shrink-0'>
          {movie.original_title}
        </h4>
        <p className='text-xs text-slate-900 leading-relaxed line-clamp-3 overflow-hidden'>
          {movie.overview}
        </p>
      </div>
    </article>
  )
}

export default MovieCard
