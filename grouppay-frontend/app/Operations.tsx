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
// export const GET_ACCOUNTS = gql`
// `

//payment statuses
//id=graphene.ID(), about=graphene.String()

//groups
//id=graphene.ID(), name=graphene.String(), leader_user_id=graphene.ID(), created_at=graphene.DateTime(), payment=graphene.Float(), status_id=graphene.ID(), about=graphene.String()

//group members
//id=graphene.ID(), user_id=graphene.ID(), group_id=graphene.ID(), is_leader=graphene.Boolean(), accepted_payment=graphene.Boolean(), accepted_payment_at=graphene.DateTime()