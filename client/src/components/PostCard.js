import React from 'react'
import { Card, Image, Button } from 'semantic-ui-react'
import moment from 'moment'
import { Link } from 'react-router-dom'
function PostCard({
  post: { username, body, id, createAt, likeCount, commentCount, likes }
}) {
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button
          basic
          fluid={false}
          size="mini"
          color="teal"
          content="Like"
          icon="heart"
          label={{
            basic: true,
            color: 'teal',
            pointing: 'left',
            content: likeCount
          }}
        />
        <Button
          basic
          fluid={false}
          size="mini"
          color="blue"
          content="Comment"
          icon="comment"
          label={{
            basic: true,
            color: 'blue',
            pointing: 'left',
            content: commentCount
          }}
        />
      </Card.Content>
    </Card>
  )
}
export default PostCard
