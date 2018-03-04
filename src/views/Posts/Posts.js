import React from 'react'
import { graphql } from 'react-apollo'
import { allPostsQuery } from '../../lib/queries'
import { Link, Switch, Route, Redirect } from 'react-router-dom'
import PostList from '../../components/PostList/'

class Habits extends React.Component {
  render() {
    const { allPostsQuery, classes } = this.props

    if (allPostsQuery && allPostsQuery.loading) {
      return <div>loading..</div>
    }

    const posts = allPostsQuery.posts

    console.log(this.props)

    return (
      <div className="animated fadeIn">
        <Switch>
          <Route path="/posts" name="PostList" render={() => <PostList posts={posts} />} />
        </Switch>
      </div>
    )
  }
}

export default graphql(allPostsQuery, { name: 'allPostsQuery' })(Habits)
