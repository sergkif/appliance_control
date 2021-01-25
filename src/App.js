import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import IndexPage from './IndexPage/IndexPage'
import AppliancePage from './AppliancePage/AppliancePage'

import './App.css'

function App() {
  return (
    <div className="App">
      <Router>
        <div className="header">
          <h1 className="h1"><Link to="/">Electrolux</Link></h1>
        </div>
        <Route path="/" component={IndexPage} exact></Route>
        <Route path="/appliance/:id" exact render={({match}) => {
          return <AppliancePage id={match.params.id}/>
        }}></Route>
      </Router>
    </div>
  );
}

export default App;
