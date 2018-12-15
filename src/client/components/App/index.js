import React from 'react';

const hasGetUserMedia = () =>
  !!(navigator.mediaDevices && navigator.getUserMedia);

const DeviceList = props => {
  return (
    <ul>
      {props.devices.map(device => (
        <li key={device.id}>{JSON.stringify(device, null, 2)}</li>
      ))}
    </ul>
  );
};

const getDevices = ctx =>
  navigator.mediaDevices
    .enumerateDevices()
    .then(devices => ctx.setState({ devices }));

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: []
    };
  }

  componentDidMount() {
    const video = document.querySelector('video');
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(stream => (video.srcObject = stream));
  }

  render() {
    getDevices(this);
    return (
      <div className="container">
        <h1>Collabow, yo.</h1>
        <div className="inputContainer">
          <video autoPlay={true} />
          {this.state.devices.length ? (
            <DeviceList devices={this.state.devices} />
          ) : (
            <div>pooping ...</div>
          )}
        </div>
      </div>
    );
  }
}
