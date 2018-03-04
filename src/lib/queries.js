import gql from 'graphql-tag'

export const currentUserQuery = gql`
  query CurrentUserQuery {
    user {
      id
      name
      email
    }
  }
`

export const allPostsQuery = gql`
  query AllPostsQuery {
    posts {
      ... on Note {
        id
        content
      }
      ... on Article {
        id
        title
        content
      }
      ... on Bookmark {
        id
        url
      }
    }
  }
`

export const allHabitsQuery = gql`
  query AllHabitsQuery {
    habits {
      id
      name
      description
      days
      isGood
      threshold
      logs
      author {
        id
        name
      }
    }
  }
`

export const habitQuery = gql`
  query HabitQuery($id: ID!) {
    habit(id: $id) {
      id
      name
      description
      days
      isGood
      threshold
      logs
      author {
        id
        name
      }
    }
  }
`

export const updateHabitMutation = gql`
  mutation UpdateHabitMutation(
    $id: ID!
    $name: String!
    $description: String
    $isGood: Boolean!
    $threshold: Int!
    $days: Int!
  ) {
    updateHabit(
      id: $id
      name: $name
      description: $description
      isGood: $isGood
      threshold: $threshold
      days: $days
    ) {
      id
      name
      description
      days
      isGood
      threshold
      author {
        id
        name
      }
    }
  }
`

export const deleteHabitMutation = gql`
  mutation DeleteHabitMutation($id: ID!) {
    deleteHabit(id: $id) {
      id
    }
  }
`

export const createHabitMutation = gql`
  mutation CreateHabitMutation(
    $name: String!
    $description: String
    $isGood: Boolean!
    $threshold: Int!
    $days: Int!
    $author: ID!
  ) {
    createHabit(
      name: $name
      description: $description
      isGood: $isGood
      threshold: $threshold
      days: $days
      author: $author
    ) {
      id
      name
      description
      days
      isGood
      threshold
      author {
        id
        name
      }
    }
  }
`

export const createHabitLogMutation = gql`
  mutation CreateHabitLogMutation($id: ID!) {
    createHabitLog(id: $id) {
      id
      logs
    }
  }
`

export const createUserMutation = gql`
  mutation CreateUserMutation($email: String!, $password: String!, $name: String!) {
    registerUser(email: $email, password: $password, name: $name) {
      id
      token
    }
  }
`

export const signinUserMutation = gql`
  mutation SigninUserMutation($email: String!, $password: String!) {
    authenticateUser(email: $email, password: $password) {
      token
      id
    }
  }
`
