import './ApplianceList.css'
import ApplianceCard from '../ApplianceCard/ApplianceCard'
import { withRouter } from 'react-router-dom'

import { addAppliance } from '../../utils/api'
import { Component } from 'react'

class ApplianceList extends Component {

  state = {
    modal: false,
    selectValue: "default",
    inputValue: ""
  }

  toggleModal = () => {
    this.setState((state) => {
      return { modal: !state.modal }
    })
  }

  selectChange = (event) => {
    this.setState({
      selectValue: event.target.value
    })
  }

  inputChange = (event) => {
    this.setState({
      inputValue: event.target.value
    })
  }

  saveAppliance = () => {
    let type
    if (this.state.selectValue.includes("oven")) {
      type = "oven"
    } else if (this.state.selectValue.includes("washing_machine")) {
      type = "washing_machine"
    }

    if (type) {
      const newAppliance = {
        type,
        model: this.state.selectValue,
        name: this.state.inputValue
      }
      addAppliance(newAppliance).then((data) => {
        if (data) {
          this.toggleModal()
          this.props.updateApplianceList()
        } 
      })
    }
  }

  render() {

    const { applianceList, history } = this.props

    const elements = applianceList.map((item) => {

      const { _id, ...itemProps } = item

      return (
        <div key={_id} onClick={ () => history.push(`/appliance/${_id}`) }>
          <ApplianceCard { ...itemProps } />
        </div>
      )
    })

    const modalClassNames = `modal fade ${this.state.modal ? 'show' : ''}`
    const modalStyle = this.state.modal ? {display: 'block'} : {}

    return (
      <div className="applianceList">
          { elements }
          <div className="applianceList-card card" onClick={ this.toggleModal }>
            <div className="card-body">
              <i className="far fa-plus fa-10x"></i>
            </div>
          </div>

          <div className={modalClassNames} style={modalStyle}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Add appliance</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={ this.toggleModal }></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <select className="form-select" aria-label="Select type of appliance" onChange={this.selectChange} value={this.state.selectValue}>
                      <option defaultValue value="default">Select model of appliance</option>
                      <option value="oven_1">oven_1</option>
                      <option value="oven_2">oven_2</option>
                      <option value="washing_machine_1">washing_machine_1</option>
                      <option value="washing_machine_2">washing_machine_2</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="appliance_name">Name your appliance</span>
                      </div>
                      <input type="text" className="form-control" aria-describedby="appliance_name" value={this.state.inputValue} onChange={this.inputChange}/>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={ this.toggleModal }>Close</button>
                  <button type="button" className="btn btn-primary" onClick={ this.saveAppliance }>Save changes</button>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default withRouter(ApplianceList);
