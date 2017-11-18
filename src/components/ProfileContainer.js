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

    const user = currentUserQuery.user

    return <Profile user={user} />
  }
}

export default graphql(currentUserQuery, { name: 'currentUserQuery' })(
  ProfileContainer
)
