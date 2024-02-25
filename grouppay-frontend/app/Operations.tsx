import { gql } from '@apollo/client';

//--------------------------QUERIES / RESOLVERS--------------------------------
//users
//id=graphene.ID(), username=graphene.String(), email=graphene.String()
export const GET_USERS = gql`
  query GetUsers($id: ID, $username: String, $email: String) {
    userList(id: $id, username: $username, email: $email) {
      id
      username
      email
    }
  }
` 
//accounts
//id=graphene.ID(), user_id=graphene.ID()
export const GET_ACCOUNTS = gql`
  query GetAccounts($id: ID, $user_id: ID) {
    accountList(id: $id, user_id: $user_id) {
      id
      balance
      user_id
    }
  }
`

//payment statuses
//id=graphene.ID(), about=graphene.String()
export const GET_PAYMENT_STATUSES = gql`
  query GetPaymentStatuses($id: ID, $about: String) {
    paymentStatusList(id: $id, about: $about) {
      id
      about
    }
  }
`

//groups
//id=graphene.ID(), name=graphene.String(), leader_user_id=graphene.ID(), created_at=graphene.DateTime(), payment=graphene.Float(), status_id=graphene.ID(), about=graphene.String()
export const GET_GROUPS = gql`
  query GetGroups($id: ID, $name: String, $leader_user_id: ID, $created_at: DateTime, $payment: Float, $status_id: ID, $about: String) {
    groupList(id: $id, name: $name, leader_user_id: $leader_user_id, created_at: $created_at, payment: $payment, status_id: $status_id, about: $about) {
      id
      name
      leader_user_id
      created_at
      payment
      status_id
      about
    }
  }
`

//group members
//id=graphene.ID(), user_id=graphene.ID(), group_id=graphene.ID(), is_leader=graphene.Boolean(), accepted_payment=graphene.Boolean(), accepted_payment_at=graphene.DateTime()
export const GET_GROUP_MEMBERS = gql`
  query GetGroupMembers($id: ID, $user_id: ID, $group_id: ID, $is_leader: Boolean, $accepted_payment: Boolean, $accepted_payment_at: DateTime) {
    groupMemberList(id: $id, user_id: $user_id, group_id: $group_id, is_leader: $is_leader, accepted_payment: $accepted_payment, accepted_payment_at: $accepted_payment_at) {
      id
      user_id
      group_id
      is_leader
      accepted_payment
      accepted_payment_at
    }
  }
`

//--------------------------MUTATIONS--------------------------------
//USER 
  //create (post) -- Req: Username, email, password
export const POST_USER = gql`
  mutation PostUser($username: String!, $email: String!, $password: String!) {
    postUser(username: $username, email: $email, password: $password) {
      user {
        username
        email
        password
      }
    }
  }
`
  //update (patch) -- Req: id -- NonReq: username, email, password
export const PATCH_USER = gql`
  mutation PatchUser($id: ID!, $username: String, $email: String, $password: String) {
    patchUser(id: $id, username: $username, email: $email, password: $password) {
      user {
        id
        username
        email
        password
      }
    }
  }
`
  //delete
export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      user {
        id
        username
        email
        password
      }
    }
  }
`

//ACCOUNT 
  //create (post) -- Req: user_id -- NonReq: balance
export const POST_ACCOUNT = gql`
  mutation PostAccount($user_id: ID!, $balance: Float) {
    postAccount(user_id: $user_id, balance: $balance) {
      account {
        id
        user_id
        balance
      }
    }
  }
`
  //update (patch) -- Req: id -- NonReq: user_id, balance
export const PATCH_ACCOUNT = gql`
  mutation PatchAccount($id: ID!, $user_id: ID, $balance: Float) {
    patchAccount(id: $id, user_id: $user_id, balance: $balance) {
      account {
        id
        user_id
        balance
      }
    }
  }
`
  //delete -- Req: id
export const DELETE_ACCOUNT = gql`
  mutation DeleteAccount($id: ID!) {
    deleteAccount(id: $id) {
      account {
        id
        user_id
        balance
      }
    }
  }
`

//PAYMENT STATUS 
  //create (post)
  //update (patch)
  //delete

//USER 
  //create (post)
  //update (patch)
  //delete

//GROUP 
  //create (post)
  //update (patch)
  //delete

//GROUP MEMBER 
  //create (post)
  //update (patch)
  //delete