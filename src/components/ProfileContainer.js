import React from 'react'
import Profile from './Profile'
import { graphql } from 'react-apollo'
import { currentUserQuery } from '../queries'

class ProfileContainer extends React.Component {
  render() {
    const { currentUserQuery } = this.props

    if (currentUserQuery && currentUserQuery.loading) {
      return <div>loading..</div>
    }

    if (currentUserQuery && currentUserQuery.error) {
      return console.log(currentUserQuery.error)
    }

    return <Profile user={currentUserQuery.user} />
  }
}

export default graphql(currentUserQuery, { name: 'currentUserQuery' })(ProfileContainer)
