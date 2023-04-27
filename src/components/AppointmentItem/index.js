// Write your code here
import './index.css'
import {format} from 'date-fns'

const AppointmentItem = props => {
  const {appointmentItems, onStarUpdate} = props

  const {id, title, isStared, datetime} = appointmentItems

  const star = isStared
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const starUpdate = () => {
    onStarUpdate(id)
  }
  return (
    <li className="list-container">
      <div className="star-name-container">
        <p className="title">{title}</p>
        <button className="starbutton" data-testid="star" onClick={starUpdate}>
          <img onClick={starUpdate} className="starimg" src={star} alt="star" />
        </button>
      </div>
      <p className="timedate">
        {format(new Date(datetime), 'dd MMMM yyyy, EEEE')}
      </p>
    </li>
  )
}
export default AppointmentItem
