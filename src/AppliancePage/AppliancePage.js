import { Component } from 'react';
import { withRouter } from 'react-router-dom'
import './AppliancePage.css';

import { getAppliance, changeAppliance, deleteAppliance, controlAppliance } from '../utils/api'

class AppliancePage extends Component {

  state = {
    appliance: {
      programms: []
    },
    applianceName: "",
    power: false,
    selectValue: "",
    grill_on: false
  }

  grillChange = (event) => {
    this.setState({
      grill_on: event.target.checked
    })

    let newObject = {
      _id: this.state.appliance._id,
      type: this.state.appliance.type,
      grill_on: event.target.checked
    }

    controlAppliance(newObject).then((data) => {
      this.setState({ appliance: data })
    })
  }

  selectChange = (event) => {
    this.setState({
      selectValue: event.target.value
    })
  }

  delete = () => {
    const { type, _id } = this.state.appliance
    deleteAppliance(type, _id).then(() => {
      this.props.history.push("/");
    })
  }

  powerChange = async (event) => {
    this.setState({
      power: event.target.checked
    })

    let newObject = {
      _id: this.state.appliance._id,
      type: this.state.appliance.type,
      power: event.target.checked,
      choosen_program: this.state.selectValue
    }

    if(this.state.appliance.grill) {
      newObject.grill_on = this.state.grill_on
    }

    controlAppliance(newObject).then((data) => {
      this.setState({ appliance: data })
    })
  }

  changeName = (event) => {
    this.setState({
      applianceName: event.target.value
    })
  }

  saveName = () => {
    const {type, _id} = this.state.appliance
    changeAppliance(type, _id, this.state.applianceName).then((data) => {
      this.setState({ appliance: data })
    })
    
  }

  setAppliance = () => {
    getAppliance(this.props.id).then((data) => {
      this.setState({
        appliance: data,
        applianceName: data.name,
        power: data.power,
        selectValue: data.choosen_program ? data.choosen_program : data.programms[0],
        grill_on: data.grill_on
      })
    })
  }

  componentDidMount() {
    this.setAppliance()
  }

  render() {
    const { img, model, programms } = this.state.appliance

    const selectOptions = programms.map((item) => {
      return (
        <option key={item} value={item}>
          {item}
        </option>
      )
    })

    const grill = () => {
      if(this.state.appliance?.grill)
        return (
          <div className="text-start mb-3">
            <div className="fs-5 fw-bold label">Grill</div>
            <div className="left-padding">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="grillSwitch" checked={this.state.grill_on} onChange={this.grillChange} />
                <label className="form-check-label" htmlFor="grillSwitch">Switch it to turn on/off grill</label>
              </div>
            </div>
          </div>
        )
    }

    return (
      <div className="AppliancePage container">
        <div className="row">
          <div className="col-sm">
            <img src={img} className="img-fluid" alt="Appliance"></img>
          </div>
          <div className="col-sm">
            <div className="fs-3 fw-bold header">Appliance</div>
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Name of your appliance" aria-label="Name of your appliance" aria-describedby="button-rename" onChange={this.changeName} value={this.state.applianceName}/>
              <button className="btn btn-outline-secondary" type="button" id="button-rename" onClick={this.saveName}>Save</button>
            </div>
            <div className="text-start mb-3">
              <div className="fs-5 fw-bold label">Model</div>
              <div className="fs-4 left-padding">{model}</div>
            </div>
            <div className="fs-3 fw-bold header">Controls</div>
            <div className="text-start mb-3">
              <div className="fs-5 fw-bold label">Programm</div>
              <div className="left-padding">
                <select className="form-select" aria-label="Select type of appliance" onChange={this.selectChange} value={this.state.selectValue}>
                  {selectOptions}
                </select>
              </div>
            </div>
            { grill() }
            <div className="text-start mb-3">
              <div className="fs-5 fw-bold label">Power</div>
              <div className="left-padding">
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" id="powerSwitch" checked={this.state.power} onChange={this.powerChange} />
                  <label className="form-check-label" htmlFor="powerSwitch">Switch it to instantly turn on/off your appliance</label>
                </div>
              </div>
            </div>
            <div className="text-end mb-3 delete">
              <button type="button" className="btn btn-danger" onClick={this.delete}>Delete Appliance</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(AppliancePage);
