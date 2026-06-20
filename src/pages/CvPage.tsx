import { useNavigate } from 'react-router'
import Button from '../components/Button'

function CvPage() {
  const navigate = useNavigate()

  return (
    <div className='flex flex-col items-center gap-6 p-8'>
      <h1 className='text-2xl font-semibold'>CV Page</h1>
      <p>Halaman CV kamu ada di sini.</p>
      <Button content='Kembali ke Home' onClick={() => navigate('/')} />
    </div>
  )
}

export default CvPage
