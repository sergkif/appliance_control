import { Component } from 'react'
import './IndexPage.css';
import ApplianceList from './AplianceList/ApplianceList'

import { getApplianceList } from '../utils/api'

export default class IndexPage extends Component {

  state = {
    applianceList: []
  }

  setApplianceList = () => {
    getApplianceList().then((data) => {
      this.setState({
        applianceList: data
      })
    })
  }

  componentDidMount() {
    this.setApplianceList()
  }

  render() {
    return (
      <div className="IndexPage">
        <ApplianceList applianceList={this.state.applianceList} updateApplianceList={this.setApplianceList}/>
      </div>
    );
  }
  
}
