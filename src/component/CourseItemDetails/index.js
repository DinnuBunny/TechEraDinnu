import {Component} from 'react'
import Loader from 'react-loader-spinner'

import {
  CourseContainer,
  CourseDetailsCard,
  DetailsImage,
  DetailsHeadPara,
  DetailsHead,
  DetailsPara,
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

class CourseItemDetails extends Component {
  state = {apiStatus: apiConsts.initial, courseData: {}}

  componentDidMount() {
    this.getTheCourseData()
  }

  onSuccessApi = courseDetails => {
    const formattedData = {
      id: courseDetails.id,
      name: courseDetails.name,
      imageUrl: courseDetails.image_url,
      description: courseDetails.description,
    }
    this.setState({courseData: formattedData, apiStatus: apiConsts.success})
  }

  getTheCourseData = async () => {
    this.setState({apiStatus: apiConsts.loading})
    const {match} = this.props
    const {id} = match.params
    const apiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(apiUrl)
    if (response.ok) {
      const data = await response.json()
      this.onSuccessApi(data.course_details)
    } else {
      this.setState({apiStatus: apiConsts.failure})
    }
  }

  onRetry = () => {
    this.getTheCourseData()
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
    const {courseData} = this.state
    const {name, imageUrl, description} = courseData
    return (
      <CourseDetailsCard>
        <DetailsImage src={imageUrl} alt={name} />
        <DetailsHeadPara>
          <DetailsHead>{name}</DetailsHead>
          <DetailsPara>{description}</DetailsPara>
        </DetailsHeadPara>
      </CourseDetailsCard>
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
        <CourseContainer>
          {apiStatus === apiConsts.loading && this.renderLoadingView()}
          {apiStatus === apiConsts.success && this.renderSuccessView()}
          {apiStatus === apiConsts.failure && this.renderFailureView()}
        </CourseContainer>
      </>
    )
  }
}

export default CourseItemDetails
