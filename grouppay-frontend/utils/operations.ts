import { gql } from "@apollo/client";

//--------------------------MUTATIONS / AUTH--------------------------------
export const TOKEN_AUTH = gql`
  mutation TokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      payload
      refreshExpiresIn
      token
    }
  }
`;

export const VERIFY_TOKEN = gql`
  mutation VerifyToken($token: String) {
    verifyToken(token: $token) {
      payload
    }
  }
`;

export const REFRESH_TOKEN = gql`
  mutation VerifyToken($token: String) {
    refreshToken(token: $token) {
      payload
      refreshExpiresIn
      token
    }
  }
`;

export const DELETE_TOKEN = gql`
  mutation DeleteTokenCookie {
    deleteTokenCookie {
      deleted
    }
  }
`;

//--------------------------QUERIES / RESOLVERS--------------------------------
//users
// id=graphene.ID(), username=graphene.String(), email=graphene.String()
export const GET_USERS = gql`
  query GetUsers($id: ID, $username: String, $email: String) {
    usersList(id: $id, username: $username, email: $email) {
      id
      password
      lastLogin
      isSuperuser
      username
      firstName
      lastName
      email
      isStaff
      isActive
      dateJoined
      account {
        id
        balance
      }
      ledGroups {
        id
        name
        createdAt
        payment
        about
      }
      groupMembership {
        id
        isLeader
        acceptedPayment
        acceptedPaymentAt
        group {
          id
          name
          createdAt
          payment
          about
          leaderUser {
            id
            password
            lastLogin
            isSuperuser
            username
            firstName
            lastName
            email
            isStaff
            isActive
            dateJoined
          }
          status {
            id
            statusCode
            description
          }
          groupMembers {
            id
            isLeader
            acceptedPayment
            acceptedPaymentAt
            user {
              id
              password
              lastLogin
              isSuperuser
              username
              firstName
              lastName
              email
              isStaff
              isActive
              dateJoined
            }
          }
        }
      }
    }
  }
`;
//accounts
//id=graphene.ID(), user_id=graphene.ID()
export const GET_ACCOUNTS = gql`
  query GetAccounts($id: ID, $userId: ID) {
    accountsList(id: $id, userId: $userId) {
      id
      balance
      user {
        id
        password
        username
        email
      }
    }
  }
`;

//payment statuses
//id=graphene.ID(), about=graphene.String()
export const GET_PAYMENT_STATUSES = gql`
  query GetPaymentStatuses($id: ID, $statusCode: Int, $about: String) {
    paymentStatusesList(id: $id, statusCode: $statusCode, about: $about) {
      id
      statusCode
      description
      groupsWithStatus {
        id
        name
        createdAt
        payment
        about
      }
    }
  }
`;

//groups
//id=graphene.ID(), name=graphene.String(), leader_user_id=graphene.ID(), created_at=graphene.DateTime(), payment=graphene.Float(), status_id=graphene.ID(), about=graphene.String()
export const GET_GROUPS = gql`
  query GetGroups(
    $id: ID
    $name: String
    $leader_user_id: ID
    $created_at: DateTime
    $payment: Float
    $status_id: ID
    $about: String
  ) {
    id
    name
    createdAt
    payment
    about
    leaderUser {
      id
      password
      username
      email
    }
    status {
      id
      statusCode
      description
    }
    groupMembers {
      id
      isLeader
      acceptedPayment
      acceptedPaymentAt
      user {
        id
        password
        username
        email
      }
    }
  }
`;

//group members
//id=graphene.ID(), user_id=graphene.ID(), group_id=graphene.ID(), is_leader=graphene.Boolean(), accepted_payment=graphene.Boolean(), accepted_payment_at=graphene.DateTime()
export const GET_GROUP_MEMBERS = gql`
  query GetGroupMembers(
    $id: ID
    $userId: ID
    $groupID: ID
    $isLeader: Boolean
    $acceptedPayment: Boolean
    $acceptedPaymentAt: DateTime
  ) {
    groupMembersList(
      id: $id
      userId: $userId
      groupId: $groupId
      isLeader: $isLeader
      acceptedPayment: $acceptedPayment
      acceptedPaymentAt: $acceptedPaymentAt
    ) {
      id
      isLeader
      acceptedPayment
      acceptedPaymentAt
      user {
        id
        password
        username
        email
      }
      group {
        id
        name
        createdAt
        payment
        about
      }
    }
  }
`;

//--------------------------MUTATIONS--------------------------------
//USER
//create (post) -- Req: Username, email, password
export const POST_USER = gql`
  mutation PostUser($username: String, $email: String, $password: String) {
    postUser(username: $username, email: $email, password: $password) {
      user {
        id
        password
        lastLogin
        isSuperuser
        username
        firstName
        lastName
        email
        isStaff
        isActive
        dateJoined
      }
    }
  }
`;
//update (patch) -- Req: id -- NonReq: username, email, password
export const PATCH_USER = gql`
  mutation PatchUser(
    $id: ID!
    $username: String
    $email: String
    $password: String
  ) {
    patchUser(
      id: $id
      username: $username
      email: $email
      password: $password
    ) {
      user {
        id
        password
        lastLogin
        isSuperuser
        username
        firstName
        lastName
        email
        isStaff
        isActive
        dateJoined
      }
    }
  }
`;
//delete
export const DELETE_USER = gql`
  mutation DeleteUser {
    deleteUser(id: null) {
      user {
        id
        password
        lastLogin
        isSuperuser
        username
        firstName
        lastName
        email
        isStaff
        isActive
        dateJoined
      }
    }
  }
`;

//ACCOUNT
//create (post) -- Req: user_id -- NonReq: balance
export const POST_ACCOUNT = gql`
  mutation PostAccount($userId: ID!, $balance: Float) {
    postAccount(userId: null, balance: null) {
      account {
        id
        balance
        user {
          id
          password
          username
          email
        }
      }
    }
  }
`;
//update (patch) -- Req: id -- NonReq: user_id, balance
export const PATCH_ACCOUNT = gql`
  mutation PatchAccount($id: ID!, $balance: Float, $userId: ID) {
    patchAccount(id: $id, balance: $balance, userId: $userId) {
      account {
        id
        balance
        user {
          id
          password
          username
          email
        }
      }
    }
  }
`;
//delete -- Req: id
export const DELETE_ACCOUNT = gql`
  mutation DeleteAccount($id: ID!) {
    deleteAccount(id: $id) {
      account {
        id
        balance
        user {
          id
          password
          username
          email
        }
      }
    }
  }
`;

//PAYMENT STATUS
//create (post) -- Req: about
export const POST_PAYMENT_STATUS = gql`
  mutation PostPaymentStatus($statusCode: Int!, $description: String!) {
    postPaymentStatus(statusCode: $statusCode, description: $description) {
      paymentStatus {
        id
        statusCode
        description
      }
    }
  }
`;
//update (patch) -- Req: id -- NonReq: about
export const PATCH_PAYMENT_STATUS = gql`
  mutation PatchPaymentStatus(
    $id: ID!
    $statusCode: Int
    $description: String
  ) {
    patchPaymentStatus(
      id: $id
      statusCode: $statusCode
      description: $description
    ) {
      paymentStatus {
        id
        statusCode
        description
      }
    }
  }
`;
//delete -- Req: id
export const DELETE_PAYMENT_STATUS = gql`
  mutation DeletePaymentStatus($id: ID!) {
    deletePaymentStatus(id: $id) {
      paymentStatus {
        id
        statusCode
        description
      }
    }
  }
`;

//GROUP
//create (post) -- Req: leader_user_id, payment, status_id -- NonReq: name, about
export const POST_GROUP = gql`
  mutation PostGroup(
    $leaderUserId: ID!
    $payment: Float!
    $statusCode: Int!
    $about: String
    $name: String
  ) {
    postGroup(
      leaderUserId: $leaderUserId
      payment: $payment
      statusCode: $statusCode
      about: $about
      name: $name
    ) {
      group {
        id
        name
        createdAt
        payment
        about
        groupMembers {
          id
          isLeader
          acceptedPayment
          acceptedPaymentAt
          user {
            id
            password
            username
            email
          }
        }
        leaderUser {
          id
          password
          username
          email
        }
      }
    }
  }
`;
//update (patch) -- Req: id -- NonReq: leader_user_id, payment, status_id, name, about
export const PATCH_GROUP = gql`
  mutation PatchGroup(
    $id: ID!
    $about: String
    $leaderUserId: ID
    $name: String
    $payment: Float
    $statusCode: Int
  ) {
    patchGroup(
      id: $id
      about: $about
      leaderUserId: $leaderUserId
      name: $name
      payment: $payment
      statusCode: $statusCode
    ) {
      group {
        id
        name
        createdAt
        payment
        about
        leaderUser {
          id
          password
          username
          email
        }
        status {
          id
          statusCode
          description
        }
        groupMembers {
          id
          isLeader
          acceptedPayment
          acceptedPaymentAt
          user {
            id
            password
            username
            email
          }
        }
      }
    }
  }
`;
//delete -- Req: id
export const DELETE_GROUP = gql`
  mutation DeleteGroup($id: ID!) {
    deleteGroup(id: $id) {
      group {
        id
        name
        createdAt
        payment
        about
        leaderUser {
          id
          password
          username
          email
        }
        status {
          id
          statusCode
          description
        }
        groupMembers {
          id
          isLeader
          acceptedPayment
          acceptedPaymentAt
          user {
            id
            password
            username
            email
          }
        }
      }
    }
  }
`;

//GROUP MEMBER
//create (post) -- Req: user_id, group_id -- NonReq: is_leader, accepted_payment
export const POST_GROUP_MEMBER = gql`
  mutation PostGroupMember(
    $groupId: ID!
    $userId: ID!
    $isLeader: Boolean
    $acceptedPayment: Boolean
  ) {
    postGroupMember(
      groupId: null
      userId: null
      acceptedPayment: null
      isLeader: null
    ) {
      groupMember {
        id
        isLeader
        acceptedPayment
        acceptedPaymentAt
        user {
          id
          password
          username
          email
        }
        group {
          id
          name
          createdAt
          payment
          about
          leaderUser {
            id
            password
            username
            email
          }
          status {
            id
            statusCode
            description
          }
          groupMembers {
            id
            isLeader
            acceptedPayment
            acceptedPaymentAt
            user {
              id
              password
              username
              email
            }
          }
        }
      }
    }
  }
`;
//update (patch) -- Req: id -- NonReq: user_id, group_id, is_leader, accepted_payment
export const PATCH_GROUP_MEMBER = gql`
  mutation PatchGroupMember(
    $id: ID!
    $acceptedPayment: Boolean
    $groupId: ID
    $isLeader: Boolean
    $userId: ID
  ) {
    patchGroupMember(
      id: $id
      acceptedPayment: $acceptedPayment
      groupId: $groupId
      isLeader: $isLeader
      userId: $userId
    ) {
      groupMember {
        id
        isLeader
        acceptedPayment
        acceptedPaymentAt
        user {
          id
          password
          username
          email
        }
        group {
          id
          name
          createdAt
          payment
          about
          leaderUser {
            id
            password
            username
            email
          }
          status {
            id
            statusCode
            description
          }
          groupMembers {
            id
            isLeader
            acceptedPayment
            acceptedPaymentAt
            user {
              id
              password
              username
              email
            }
          }
        }
      }
    }
  }
`;
//delete -- Req: id
export const DELETE_GROUP_MEMBER = gql`
  mutation DeleteGroupMember($id: ID!) {
    deleteGroupMember(id: $id) {
      groupMember {
        id
        isLeader
        acceptedPayment
        acceptedPaymentAt
        user {
          id
          password
          username
          email
        }
        group {
          id
          name
          createdAt
          payment
          about
          leaderUser {
            id
            password
            username
            email
          }
          status {
            id
            statusCode
            description
          }
          groupMembers {
            id
            isLeader
            acceptedPayment
            acceptedPaymentAt
            user {
              id
              password
              username
              email
            }
          }
        }
      }
    }
  }
`;
