import React, { Component } from "react";
import {placesApis} from '../utils/PlacesApi';

import styles from '../../css/app.scss';

export default class PlaceCard extends Component {
    static defaultProps = {
    };

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {name, vicinity, icon, geometry, photos = []} = this.props;

        const lat = geometry.location.lat();
        const lng = geometry.location.lng();
        return (
            <div className={`thumbnail ${styles.thumbnail}`}>
              <div className="caption">
                    <div className="media">
                        <div className="media-left">
                          <div style={{'display':'inline-block','width':'71px','height':'71px'}}>
                            {photos.length > 0 && photos.map( (photo,id) => <img key={id} src={photo.getUrl({'maxWidth': 71, 'maxHeight': 71})} />)  }
                            {photos.length === 0 &&  <img className="media-object" src={icon} alt="" />}
                          </div>
                        </div>
                        <div className="media-body">
                            <h4 className="media-heading">{name}</h4>
                            {vicinity}
                        </div>
                        <div className="media-right">
                            <a href={placesApis.requestUber(lat,lng)}>Request Uber Ride</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
