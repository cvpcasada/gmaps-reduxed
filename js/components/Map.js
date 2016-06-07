import React, { Component } from "react";

import { default as canUseDOM } from "can-use-dom";
import { default as _ } from "lodash";

import { GoogleMapLoader, GoogleMap, Marker } from "react-google-maps";
import { triggerEvent } from "react-google-maps/lib/utils";

/*
 * This is the modify version of:
 * https://developers.google.com/maps/documentation/javascript/examples/event-arguments
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
export default class Map extends Component {
  static defaultProps = {
    center: {lat: 59.938043, lng: 30.337157},
    zoom: 14,
    markers: [],
    style:{ width: '100%', height: '25rem' }
  };

  constructor(props, context) {
    super(props, context);
    this.handleWindowResize = _.throttle(::this.handleWindowResize, 500);
  }

  componentDidMount() {
    if (!canUseDOM) {
      return;
    }
    window.addEventListener(`resize`, this.handleWindowResize);
  }

  componentWillUnmount() {
    if (!canUseDOM) {
      return;
    }
    window.removeEventListener(`resize`, this.handleWindowResize);
  }

  handleWindowResize() {
    triggerEvent(this._googleMapComponent, `resize`);
  }

  /*
   * This is called when you click on the map.
   * Go and try click now.
   */
  handleMapClick(event) {
    /*let { markers } = this.state;
     markers = update(markers, {
     $push: [
     {
     position: event.latLng,
     defaultAnimation: 2,
     key: Date.now() // Add a key property for: http://fb.me/react-warning-keys
     }
     ]
     });
     this.setState({ markers });

     if (markers.length === 3) {

     }*/
  }

  handleMarkerRightclick(index, event) {
    /*
     * All you modify is data, and the view is driven by data.
     * This is so called data-driven-development. (And yes, it's now in
     * web front end and even with google maps API.)
     */
    /*let { markers } = this.state;
     markers = update(markers, {
     $splice: [
     [index, 1]
     ]
     });
     this.setState({ markers });*/
  }

  handleCenterChanged() {

  }

  render() {
    const {center, zoom, style, markers} = this.props;
    const centerPos = new window.google.maps.LatLng(center.lat, center.lng);

    return (
      <GoogleMapLoader
        containerElement={
                  <div
                    style={style}
                  ></div>
                }
        googleMapElement={
                  <GoogleMap
                    ref={(map) => {
                    this._googleMapComponent = map;
                    window._googleMapComponent = map;
                    }}
                    onCenterChanged={this.handleCenterChanged}
                    defaultZoom={zoom}
                    defaultCenter={center}
                    center={centerPos}
                    onClick={::this.handleMapClick}
                  >
                    {markers.map((marker, id) => {
                      return (
                        <Marker key={id}
                          {...marker}
                          onRightclick={this.handleMarkerRightclick.bind(this, id)}
                        />
                      );
                    })}
                  </GoogleMap>
                }
      />
    );
  }
}
