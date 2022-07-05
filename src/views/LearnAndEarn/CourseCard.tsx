import { useRouter } from 'next/router'
import { CourseCardInterface, DataQuestions } from './interface'
import { CourseCardContainer, StartCourseButton } from './style'

type Props = {
  data: DataQuestions
}

const CourseCard = ({ data }: Props) => {
  const router = useRouter()
  const onStartCourse = (id: string) => {
    router.push(`learn-and-earn/${id}`)
  }
  return (
    <CourseCardContainer>
      <div className="cover-image">
        <img
          src="https://media.istockphoto.com/photos/non-fungible-token-picture-id1307372676?b=1&k=20&m=1307372676&s=170667a&w=0&h=0CbFHaQ9HZIrPQzHo1z3idRp4cGUL6vkPQi7jPUEv_s="
          alt=""
        />
      </div>

      <div className="about-course">
        <p className="head-desc">All rewards redeemed, stay tuned</p>
        <h4 className="course-title">{data.name}</h4>
        <p className="course-description">{data.description}</p>
        <StartCourseButton onClick={() => onStartCourse(data.id)}>Start</StartCourseButton>
      </div>
    </CourseCardContainer>
  )
}

export default CourseCard
