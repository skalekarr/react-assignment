import React from 'react';
import { connect } from 'react-redux';
import 'isomorphic-fetch';
import logo from './logo.svg';
import './App.css';

//fetch api-service
function parseJSONResponse(response) {
    return response.json();
}

function getResponse(response) {
    return response;
}

function fetchData(text) {
    return fetch('http://avoindata.prh.fi/bis/v1/' + text)
        .then(parseJSONResponse)
        .then(getResponse);
}

//action-creator
function search (result, type) {
  return {type, result};
}

//react-components

function Item(props) {
  const { itemKey, value } = props;

  return (
    <div>
        <em>{itemKey}</em>
        { value.map((item, itemIndex) => <ul key={itemIndex}> {
          Object.keys(item).map((key, index) => {
            const valueValue = item[key];
            const element = valueValue instanceof Array ? 
              <Item itemKey={key} value={valueValue} /> : 
              <li key={index} style={valueValue ? {color: 'green'} : {color: 'red'}}> {key} : {valueValue || 'Data Unavailable'} </li>;
            return element;
          })}</ul>
          )} 
    </div>
  )
}

// react TreeView component - stateless
function TreeView (props) {
  const { result } = props;

    return (
      <div>
        <ul className="test">
          { Object.keys(result).map((key, index) => {
            const value = result[key];
            const element = value instanceof Array ? 
              <Item itemKey={key} value={value} /> : 
              <li key={index} style={value ? {color: 'green'} : {color: 'red'}}> {key} : {value || 'Data Unavailable'} </li>;
            return element;
          })}
        </ul>        
      </div>
    );
}

function Filter (props) {
  const { dispatch } = props;
  let searchInput = null;
  
  function handleSearch() {
    fetchData(searchInput.value)
          .then((response, error) => {
              dispatch(search(response, 'SUCCESS'))
          });
  }
  
  return (
      <div className="search">
          <input
              type="text"
              ref={(input) => { searchInput = input; }} />
          <button onClick={handleSearch}> Search </button>
      </div>
    )
  
}
function App(props) {
  const { dispatch, result } = props;
  
  return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Assignment</h2>
        </div>
        <Filter dispatch={dispatch}/>
        <TreeView result={result}/>        
      </div>
    );
}

//map state and dispatch to props
function mapStateToProps (state) {
  return {
    result: state
    };
}

// App container
 const AppContainer = connect(mapStateToProps)(App);

 export default AppContainer;