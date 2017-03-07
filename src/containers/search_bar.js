/*
 *   SearchBar container
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeather } from '../actions/index';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };

    // bind context of 'this' since we are throwing the callback around
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) { //callback
    this.setState({ term: event.target.value });
  }

  onFormSubmit(event) { //callback
    // prevent browser from submitting form when hitting submit or enter
    event.preventDefault();
    this.props.fetchWeather(this.state.term);
    //clear search input
    this.setState({ term: '' });
  }

  render() {
    return (
        <form onSubmit={this.onFormSubmit} className="input-group">
          <input
            placeholder="Get a five day forecast"
            className="form-control"
            value={this.state.term}
            onChange={this.onInputChange} />
          <span className="input-group-btn">
            <button type="submit" className="btn btn-secondary">Submit</button>
          </span>
        </form>
    );
  }
}

// bind actions
function mapDispactToProps(dispatch) {
  return bindActionCreators({ fetchWeather }, dispatch);
}

// null arg says that this container doesn't care about state
export default connect(null, mapDispactToProps)(SearchBar);
