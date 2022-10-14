import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { Grid } from 'semantic-ui-react'
import PostCard from '../components/PostCard'
const FETCH_POSTS_QUERY = gql`
  query {
    getPosts {
      id
      body
      createAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createAt
        body
      }
    }
  }
`
function Home() {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY)

  return (
    <Grid columns={3}>
      <Grid.Row style={{ justifyContent: 'center', marginTop: '20px' }}>
        <h1>Recent Posts</h1>
      </Grid.Row>

      <Grid.Row>
        {loading ? (
          <h1>Loading posts</h1>
        ) : (
          data.getPosts &&
          data.getPosts.map(post => (
            <Grid.Column key={post.id} style={{ marginTop: '20px' }}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  )
}

export default Home
