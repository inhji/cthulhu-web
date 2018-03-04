import React from 'react'
import { Card, CardBody, CardTitle, Button, Table, Col, Row } from 'reactstrap'
import { Link, withRouter } from 'react-router-dom'

class Note extends React.Component {
  render() {
    const { content } = this.props.note

    return (
      <Row>
        <Col lg={6}>
          <Card>
            <CardBody>
              <p dangerouslySetInnerHTML={{ __html: content }}></p>
              <Button>Edit</Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  }
}

class PostList extends React.Component {
  render() {
    const posts = this.props.posts

    return (
      <div>
        {posts.map(post => {
          switch (post.__typename) {
            case 'Note':
              return <Note note={post} key={post.id} />
              break
          }
        })}
      </div>
    )
  }
}

export default withRouter(PostList)
