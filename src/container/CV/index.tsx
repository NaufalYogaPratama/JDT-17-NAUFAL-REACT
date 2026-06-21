import { useNavigate } from 'react-router'
import { Badge } from '../../components/ui/badge'
import {Button} from '../../components/ui/button'

function CvPage() {
  const navigate = useNavigate()

  return (
    <div>
        {/* content-up */}
        <div>
            <Button onClick={() => navigate("/")}>Kembali ke home</Button>
            
            {/* HERO SECTION */}
            <section>
                {/* content left */}
                <div>
                    {/* content inside 1 */}
                    <Badge>
                        <span>
                            Halo bang
                        </span>
                    </Badge>
                    {/* content inside 2 */}
                    <div>
                        {/* content inside 2.1 */}
                        <h1>
                            Naufal Yoga Pratama
                        </h1>
                        {/* content inside 2.2 */}
                        <p>
                            Software Engineer | Fans Messi
                        </p>
                    </div>
                    {/* content inside 3 */}
                    <p>
                        Kadang suka ngoding kadang kidding
                    </p>
                    {/* content inside 4 */}
                    <div>
                        <Button>Email me</Button>
                        <Button>Connect</Button>
                    </div>
                </div>

                {/* content right */}
                <div>
                    {/* content inside 1 */}
                    <div>
                        <img src="@/assets/hero.png" alt="foto-hero"/>
                    </div>
                </div>
            </section>
        </div>
    </div>
  )
}

export default CvPage
