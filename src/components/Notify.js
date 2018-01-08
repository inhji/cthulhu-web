import React from 'react'

export default class Notify extends React.Component {
  render() {
    return (
      <div>
        <button
          onClick={() => {
            Notification.requestPermission().then(function(result) {
              navigator.serviceWorker.ready.then(function(registration) {
                registration.showNotification('Notification with ServiceWorker')
              })
            })
          }}
        >
          Notify me!!!
        </button>
      </div>
    )
  }
}
