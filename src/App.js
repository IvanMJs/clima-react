import React, { Component } from 'react'
import './App.css'
import Top from "./Top";
import Bottom from './Bottom'



const semana = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo',
]

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clima: {},
      isLoaded: false,
    }
    this.getWeekDay = this.getWeekDay.bind(this)
  }

  getWeekDay(fecha) {
    return semana[new Date(fecha * 1000).getDay()]
  }

  componentDidMount() {
    fetch(
      `https://api.apixu.com/v1/forecast.json?key=${
        process.env.REACT_APP_API_KEY
      }&q=Rafaela&days=6`
    )
      .then(response => response.json())
      .then(jsonData => {
        jsonData.current.condition.icon = jsonData.current.condition.icon.replace(
          '64x64',
          '128x128',
        )
        this.setState({
          clima: jsonData,
          isLoaded: true,
        })
      })
  }

  render() {
    const { location, current, forecast } = this.state.clima
    return this.state.isLoaded ? (
      <div className="App">
        <div className="container">
          <Top current={current} location={location} />

          <Bottom forecast={forecast} />
        </div>
      </div>
    ) : (
      <div className="App">Loading...</div>
    )
  }
}

export default App