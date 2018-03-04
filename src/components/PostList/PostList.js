import React from 'react'
import { Card, CardBody, Button, Col, Row } from 'reactstrap'
import { withRouter } from 'react-router-dom'

const Post = withRouter(({ post, history }) => (
  <Row>
    <Col lg={6}>
      <Card>
        <CardBody>
          <h1>{post.title}</h1>
          <p dangerouslySetInnerHTML={{ __html: post.content }} />
          <p>
            {post.url && (
              <span>
                <span>Link: </span>
                <a href={post.url}>{post.url}</a>
              </span>
            )}
          </p>

          <Button onClick={() => history.push(`/posts/edit/${post.id}`)}>Edit</Button>
        </CardBody>
      </Card>
    </Col>
    <Col lg={6}>
      <Card>
        <CardBody>
          <p>Tags: {post.tags ? post.tags.join(', ') : ''}</p>
          <p>Erstellt: {post.createdAt}</p>
          <p>
            Permalink:{' '}
            <a href={`https://inhji.de/${post.type}/${post.hashid}`}>
              {`https://inhji.de/${post.type}/${post.hashid}`}
            </a>
          </p>
        </CardBody>
      </Card>
    </Col>
  </Row>
))

class PostList extends React.Component {
  render () {
    const posts = this.props.posts

    return <div>{posts.map(post => <Post post={post} key={post.id} />)}</div>
  }
}

export default PostList
