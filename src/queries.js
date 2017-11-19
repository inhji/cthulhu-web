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

export const allHabitsQuery = gql`
  query AllHabitsQuery {
    allHabits {
      id
      name
      description
      days
      isGood
      threshold
      logs {
        id
        createdAt
      }
    }
  }
`

export const habitQuery = gql`
  query HabitQuery($id: ID!) {
    Habit(id: $id) {
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
    updateHabit(id: $id, toDelete: true) {
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
    $authorId: ID!
  ) {
    createHabit(
      name: $name
      description: $description
      isGood: $isGood
      threshold: $threshold
      days: $days
      authorId: $authorId
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
  mutation CreateHabitLogMutation($habitId: ID!) {
    createHabitLog(habitId: $habitId) {
      id
      habit {
        id
        name
      }
    }
  }
`

export const createUserMutation = gql`
  mutation CreateUserMutation($email: String!, $password: String!, $name: String!) {
    signupUser(email: $email, password: $password, name: $name) {
      id
      token
    }
    authenticateUser(email: $email, password: $password) {
      token
      id
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
