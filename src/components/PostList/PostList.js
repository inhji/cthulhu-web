import React from 'react'
import { Card, CardBody, Button, Col, Row } from 'reactstrap'
import { withRouter } from 'react-router-dom'

const Note = withRouter(({ note, history }) => (
  <Row>
    <Col lg={6}>
      <Card>
        <CardBody>
          <p dangerouslySetInnerHTML={{ __html: note.content }} />
          <Button onClick={() => history.push(`/posts/edit/${note.id}`)}>Edit</Button>
        </CardBody>
      </Card>
    </Col>
    <Col lg={6}>
      <Card>
        <CardBody>
          <p>Tags: {note.tags ? note.tags.join(', ') : ''}</p>
          <p>Erstellt: {note.createdAt}</p>
          <p>
            Permalink:{' '}
            <a href={`https://inhji.de/note/${note.hashid}`}>{`https://inhji.de/note/${
              note.hashid
            }`}</a>
          </p>
        </CardBody>
      </Card>
    </Col>
  </Row>
))

class PostList extends React.Component {
  render () {
    const posts = this.props.posts

    return (
      <div>
        {posts.map(post => {
          switch (post.__typename) {
            case 'Note':
              return <Note note={post} key={post.id} />
          }
        })}
      </div>
    )
  }
}

export default PostList
