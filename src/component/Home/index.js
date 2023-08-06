import {Component} from 'react'
import Loader from 'react-loader-spinner'

import CourseCard from '../CourseCard'

import {
  HomeContainer,
  CourseHeading,
  CourseUl,
  LoadingContainer,
  FailureContainer,
  FailureHeading,
  FailurePara,
  FailureButton,
  FailureImage,
} from './styled'

const apiConsts = {
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class Home extends Component {
  state = {apiStatus: apiConsts.initial, coursesList: []}

  componentDidMount() {
    this.getTheCoursesData()
  }

  onSuccessApi = courses => {
    const formattedList = courses.map(each => ({
      id: each.id,
      name: each.name,
      imageUrl: each.logo_url,
    }))
    this.setState({coursesList: formattedList, apiStatus: apiConsts.success})
  }

  getTheCoursesData = async () => {
    this.setState({apiStatus: apiConsts.loading})
    const apiUrl = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(apiUrl)
    if (response.ok) {
      const data = await response.json()
      this.onSuccessApi(data.courses)
    } else {
      this.setState({apiStatus: apiConsts.failure})
    }
  }

  onRetry = () => {
    this.getTheCoursesData()
  }

  renderFailureView = () => (
    <FailureContainer>
      <FailureImage
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt="not found"
      />
      <FailureHeading>Oops! Something Went Wrong</FailureHeading>
      <FailurePara>
        We cannot seem to find the page you are looking for.
      </FailurePara>
      <FailureButton type="button" onClick={this.onRetry}>
        Retry
      </FailureButton>
    </FailureContainer>
  )

  renderSuccessView = () => {
    const {coursesList} = this.state
    return (
      <HomeContainer>
        <CourseHeading>Courses</CourseHeading>
        <CourseUl>
          {coursesList.map(eachCourse => (
            <CourseCard key={eachCourse.id} eachCourse={eachCourse} />
          ))}
        </CourseUl>
      </HomeContainer>
    )
  }

  renderLoadingView = () => (
    <LoadingContainer data-testid="loader">
      <Loader type="ThreeDots" color="#4656a1" height="50" width="50" />
    </LoadingContainer>
  )

  render() {
    const {apiStatus} = this.state
    return (
      <>
        <HomeContainer>
          {apiStatus === apiConsts.loading && this.renderLoadingView()}
          {apiStatus === apiConsts.success && this.renderSuccessView()}
          {apiStatus === apiConsts.failure && this.renderFailureView()}
        </HomeContainer>
      </>
    )
  }
}

export default Home
