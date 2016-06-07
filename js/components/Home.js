import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Geosuggest from 'react-geosuggest';
import Map from './Map';
import PlaceCard from './PlaceCard';

import * as HomeActions from '../actions/HomeActions';

class Home extends Component {

  componentDidMount() {
    this.refs.geosuggest.update(this.props.suggestInput);
  }

  render() {
    const {mapOptions, dispatch, isFetching, suggestedPlaces = []} = this.props;
    const actions = bindActionCreators(HomeActions, dispatch);

    return (
      <main>
        <Map {...mapOptions}/>
        <Geosuggest ref="geosuggest"
          onChange={ value => actions.handleSuggestInputChange(value) }
          onSuggestSelect={ suggest => {
            actions.handleSelectSuggest(suggest);
            actions.fetchSuggestedPlace(suggest);
          }}

          onActivateSuggest={ (suggest) => actions.activateSuggest(suggest)  }
        />

        <section>
          {!isFetching && suggestedPlaces.map((place,id) => <PlaceCard {...place} key={id} />)}
        </section>

      </main>
    );
  }
}

export default connect(state => state.PlaceSelectionReducer)(Home);
