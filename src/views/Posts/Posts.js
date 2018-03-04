import React from 'react'
import { graphql } from 'react-apollo'
import { allPostsQuery } from '../../lib/queries'
import { Switch, Route } from 'react-router-dom'
import PostList from '../../components/PostList/'
import PostEdit from '../../components/PostEdit'

class Posts extends React.Component {
  render () {
    const { allPostsQuery } = this.props

    if (allPostsQuery && allPostsQuery.loading) {
      return <div>loading..</div>
    }

    const posts = allPostsQuery.posts

    console.log(this.props)

    return (
      <div className="animated fadeIn">
        <Switch>
          <Route
            exact
            path="/posts/edit/:id"
            name="EditPost"
            render={({ match }) => {
              const post = posts.find(post => post.id === match.params.id)

              return <PostEdit post={post} />
            }}
          />
          <Route path="/posts" name="PostList" render={() => <PostList posts={posts} />} />
        </Switch>
      </div>
    )
  }
}

export default graphql(allPostsQuery, { name: 'allPostsQuery' })(Posts)
