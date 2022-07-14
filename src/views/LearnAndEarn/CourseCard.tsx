import { useWeb3React } from '@web3-react/core'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useRouter } from 'next/router'
import { DataQuestions } from './interface'
import { CourseCardContainer, StartCourseButton } from './style'

type Props = {
  data: DataQuestions
}

const CourseCard = ({ data }: Props) => {
  const router = useRouter()
  const onStartCourse = (id: string) => {
    router.push(`learn-and-earn/${id}`)
  }
  const { account } = useWeb3React()
  return (
    <CourseCardContainer>
      <div className="cover-image">
        <img
          src="http://static.ybox.vn/2019/11/4/1574935620512-1574911870970-1553610200828-1550216732388-Savvycom.png"
          alt=""
        />
      </div>

      <div className="about-course">
        <div>
          <div className="head-desc">
            <div className="reward-info">
              <img src="/images/tokens/SVC.png" alt="svc" />
              <p> 5 SVC</p>
            </div>
            <div className="reward-info">
              <img src="/images/tokens/WBNB.png" alt="bnb" />
              <p> 0.01 BNB</p>
            </div>
          </div>
          <h4 className="course-title">{data.name}</h4>
          <p className="course-description">{data.description}</p>
        </div>
        {!account ? (
          <ConnectWalletButton maxWidth={176} />
        ) : (
          <StartCourseButton onClick={() => onStartCourse(data.id)}>Start</StartCourseButton>
        )}
      </div>
    </CourseCardContainer>
  )
}

export default CourseCard
