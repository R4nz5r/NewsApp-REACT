import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  pageSize = 15;
  apiKey =import.meta.env.VITE_REACT_APP_NEWS_API;
  
  state = {
    process:0
  }

  setProgress =(progress) =>{
    this.setState({progress : progress})
  }

  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar color='#f11946' height={3} progress={this.state.progress} />
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  pageSize={this.pageSize} country={'in'}/>}></Route>
            <Route exact path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='business' pageSize={this.pageSize} country={'in'} category={'business'} />}></Route>
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={this.pageSize} country={'in'} category={'entertainment'} />}></Route>
            <Route exact path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='health' pageSize={this.pageSize} country={'in'} category={'health'} />}></Route>
            <Route exact path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='science' pageSize={this.pageSize} country={'in'} category={'science'} />}></Route>
            <Route exact path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='sports' pageSize={this.pageSize} country={'in'} category={'sports'} />}></Route>
            <Route exact path="/technology"element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='technology' pageSize={this.pageSize} country={'in'} category={'technology'} />}></Route>
          </Routes>
        </Router>

      </div>
    )
  }
}
