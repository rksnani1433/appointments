import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

const appoinmentList = []

class Appointments extends Component {
  state = {
    title: '',
    datetime: '',
    addList: appoinmentList,
    isFilterApplied: false,
  }

  filterIsStared = () => {
    const {isFilterApplied} = this.state
    if (isFilterApplied) {
      // remove the filter
      console.log(appoinmentList)
      this.setState({addList: appoinmentList, isFilterApplied: false})
    } else {
      // apply the filter
      this.setState(prevState => ({
        addList: prevState.addList.filter(each => each.isStared === true),
        isFilterApplied: true,
      }))
    }
  }

  onStarUpdate = id => {
    this.setState(prev => ({
      addList: prev.addList.map(each => {
        if (each.id === id) {
          return {...each, isStared: !each.isStared}
        }
        return each
      }),
    }))
  }

  addAppointment = event => {
    event.preventDefault()
    const {title, datetime, addList} = this.state
    const newApp = {
      id: uuidv4(),
      title,
      datetime,
      isStared: false,
    }
    this.setState(prevState => ({
      addList: [...prevState.addList, newApp],
    }))
    document.getElementById('userdate').value = ''
    document.getElementById('usertitle').value = ''
  }

  titleUpdate = event => {
    const {title} = this.state
    this.setState({title: event.target.value})
  }

  datetimeUpdate = event => {
    const {datetime} = this.state
    this.setState({datetime: event.target.value})
  }

  render() {
    const {title, datetime, addList, isFilterApplied} = this.state
    console.log(addList)
    console.log(isFilterApplied)
    const isTrue = isFilterApplied ? 'star2' : 'starButton'

    return (
      <div className="app-container">
        <div className="main-container">
          <div className="main-form-container">
            <form onSubmit={this.addAppointment} className="form-container">
              <h1> Add Appointment</h1>
              <lable className="lables" htmlFor="input">
                Title
              </lable>
              <input
                id="usertitle"
                onChange={this.titleUpdate}
                className="inputTitle"
                type="text"
              />
              <lable className="lables" htmlFor="inputdate">
                Date
              </lable>
              <input
                id="userdate"
                onChange={this.datetimeUpdate}
                type="date"
                className="userDate"
              />
              <button type="submit" className="button">
                Add
              </button>
            </form>
            <img
              className="appointment-image"
              alt="appointments"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
            />
          </div>
          <hr className="horizontal-line" />
          <div className="appoint-star-container">
            <p className="appointments">Appointments</p>
            <button
              onClick={this.filterIsStared}
              type="button"
              className={isTrue}
            >
              Starred
            </button>
          </div>
          <ul className="ul-contianer">
            {addList.map(each => (
              <AppointmentItem
                onStarUpdate={this.onStarUpdate}
                key={each.id}
                appointmentItems={each}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
