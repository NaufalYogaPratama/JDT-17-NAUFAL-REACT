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
      className='relative w-36 sm:w-44 md:w-48 aspect-[2/3] rounded-xl overflow-hidden cursor-pointer group transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(203,41,87,0.4)] bg-[#0B0B0B] border border-neutral-900/50 shrink-0 flex-col flex'
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      {/* Poster Image */}
      <div className="w-full h-full">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={movie.original_title}
            className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
            loading="lazy"
          />
        ) : (
          <div className='w-full h-full bg-[#0B0B0B] flex flex-col items-center justify-center text-xs text-neutral-500 p-3 text-center border border-neutral-800 rounded-xl'>
            <span className="text-2xl mb-2">🎬</span>
            <span className="font-semibold line-clamp-3">{movie.original_title}</span>
          </div>
        )}
      </div>

      {/* Cinematic Gradient Overlay */}
      {/* On mobile: visible. On desktop: fades in on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 text-left">
        <div className="flex items-center gap-1 mb-1">
          <span className="text-amber-400 text-xs">★</span>
          <span className="text-xs font-bold text-[#EEEEEE]">
            {(movie as any).vote_average ? (movie as any).vote_average.toFixed(1) : 'N/A'}
          </span>
          {(movie as any).release_date && (
            <span className="text-[10px] text-[#DDDDDD]/70 ml-2">
              {(movie as any).release_date.split('-')[0]}
            </span>
          )}
        </div>
        <h4 className="font-bold text-xs sm:text-sm text-[#EEEEEE] leading-snug line-clamp-2">
          {movie.original_title}
        </h4>
      </div>
    </article>
  )
}

export default MovieCard

