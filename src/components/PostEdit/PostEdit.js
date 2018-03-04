import React from 'react'
import { graphql, compose } from 'react-apollo'
import { Card, CardBody, Col, Button, ButtonGroup, Form, FormGroup, Label, Input } from 'reactstrap'
import { withRouter } from 'react-router-dom'
import { getUser } from '../../lib/user'
import {
  updateNoteMutation,
  deleteNoteMutation,
  deleteBookmarkMutation,
  allPostsQuery
} from '../../lib/queries'

class PostEdit extends React.Component {
  componentDidMount = () => {
    const { content, tags } = this.props.post
    this.content.value = content
    this.tags.value = tags ? tags.join(',') : ''
  }

  handleSubmit = async () => {
    const content = this.content.value
    const tags = this.tags.value.split(',')

    try {
      const { userId: authorId } = getUser()

      if (!authorId) {
        console.error('No user logged in!')
        return
      }

      await this.props.updateNoteMutation({
        variables: {
          id: this.props.post.id,
          content,
          tags
        }
      })
      this.props.history.push('/posts')
    } catch (err) {
      console.error(err)
    }
  }

  handleDelete = async () => {
    let mutation

    console.log(this.props.post.type)

    if (this.props.post.type === 'Note') {
      mutation = this.props.deleteNoteMutation
    } else if (this.props.post.type === 'Bookmark') {
      mutation = this.props.deleteBookmarkMutation
    }

    try {
      await mutation({
        variables: {
          id: this.props.post.id
        },
        refetchQueries: [
          {
            query: allPostsQuery
          }
        ]
      })
      this.props.history.push('/posts')
    } catch (e) {
      console.error(e)
    }
  }

  render () {
    return (
      <Card>
        <CardBody>
          <Form>
            <legend>Edit Note</legend>
            <FormGroup row>
              <Label for="name" sm={2}>
                Content
              </Label>
              <Col sm={10}>
                <Input
                  type="textarea"
                  name="content"
                  id="content"
                  innerRef={input => (this.content = input)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="tags" sm={2}>
                Tags
              </Label>
              <Col sm={10}>
                <Input type="text" name="tags" id="tags" innerRef={input => (this.tags = input)} />
              </Col>
            </FormGroup>
            <FormGroup check row>
              <Col sm={{ size: 10, offset: 2 }}>
                <ButtonGroup>
                  <Button color="primary" onClick={this.handleSubmit}>
                    Submit
                  </Button>
                  <Button color="danger" onClick={this.handleDelete}>
                    Delete
                  </Button>
                </ButtonGroup>
              </Col>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    )
  }
}

export default compose(
  graphql(updateNoteMutation, { name: 'updateNoteMutation' }),
  graphql(deleteNoteMutation, { name: 'deleteNoteMutation' }),
  graphql(deleteBookmarkMutation, { name: 'deleteBookmarkMutation' })
)(withRouter(PostEdit))
