import {Link} from 'react-router-dom'
import {CourseLi, EachCourseImage, EachCoursePara} from '../Home/styled'

const CourseCard = props => {
  const {eachCourse} = props
  const {id, name, imageUrl} = eachCourse
  return (
    <CourseLi>
      <Link
        to={`/courses/${id}`}
        style={{textDecoration: 'none', cursor: 'pointer'}}
      >
        <EachCourseImage src={imageUrl} alt={name} />
        <EachCoursePara>{name}</EachCoursePara>
      </Link>
    </CourseLi>
  )
}

export default CourseCard
