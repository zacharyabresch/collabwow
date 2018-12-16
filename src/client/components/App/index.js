import React from 'react';

const hasGetUserMedia = () =>
  !!(navigator.mediaDevices && navigator.getUserMedia);

const DeviceList = props => {
  return (
    <ul>
      {props.devices.map(device => {
        let [kind, type, direction] = device.kind.match(/(\w+)(input|output)/i);
        return (
          <li key={device.id}>
            <strong>
              {device.label} ({direction} | {kind})
            </strong>
          </li>
        );
      })}
    </ul>
  );
};

const getDevices = ctx =>
  navigator.getUserMedia(
    { audio: true, video: true },
    () =>
      navigator.mediaDevices
        .enumerateDevices()
        .then(devices => ctx.setState({ devices })),
    console.error
  );

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
