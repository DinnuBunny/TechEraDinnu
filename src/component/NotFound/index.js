import {
  NotFoundCard,
  NotFoundImage,
  NotFoundHeading,
  NotFoundPara,
} from './styled'

const NotFound = () => (
  <NotFoundCard>
    <NotFoundImage
      src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
      alt="not found"
    />
    <NotFoundHeading>Page NotFound</NotFoundHeading>
    <NotFoundPara>
      We are sorry, the page you requested could not be found.
    </NotFoundPara>
  </NotFoundCard>
)

export default NotFound
