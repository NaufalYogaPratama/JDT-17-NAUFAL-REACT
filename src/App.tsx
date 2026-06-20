import { useNavigate } from 'react-router'
import './App.css'
import Box from './components/box'
import Button from './components/button';

function App() {
  const Experience = [{
    title: "PT Indivara",
    desc: "akubksjhjcsjcchaas ccjchchjca"
  },
  {
    title: "PT AJAPJ",
    desc: "aku deskripsi 2"
  }]
  
  const navigate = useNavigate();

  const movePage = () => {
    navigate('/cv-page')
  }

  const movePageMovie = () => {
    navigate('/movie')
  }

  const movePageTodo = () => {
    navigate('/todo')
  }

  return (
    <div className='flex flex-col items-center gap-6 p-8'>
      <div className='flex flex-row gap-4 justify-center'>
        {Experience.map((el, index) => (
          <Box key={index} index={index} title={el.title} desc={el.desc} />
        ))}
      </div>
      <Button onClick={movePage} content='Move to Page CV' />
      <Button onClick={movePageTodo} content='Move to Page Todo' />
      <Button onClick={movePageMovie} content='Move to Page Movie' />
    </div>
  )
}

export default App
