"use client"

import React, {
  useState,
  useEffect,
  FormEvent,
  ChangeEvent,
  FormEventHandler,
} from "react"
import { useRouter } from "next/navigation"
import { useQuery, useMutation, gql } from "@apollo/client"
import { GET_USERS, VERIFY_TOKEN } from "@/utils"
import Cookies from "js-cookie"
import { GroupTiny } from "@/components"

interface GroupMembership {
  id: string
  isLeader: boolean
  acceptedPayment: boolean
  acceptedPaymentAt: string
  group: {
    id: string
    name: string
    createdAt: string
    payment: number
    about: string
  }
}

export default function GroupList(): JSX.Element {
  const [username, setUsername] = useState("")
  const [groups, setGroups] = useState([])

  const [
    verifyToken,
    {
      called: verifyTokenCalled,
      loading: verifyTokenLoading,
      reset: verifyTokenReset,
    },
  ] = useMutation(VERIFY_TOKEN)

  const verifyTokenAsync = async () => {
    const verifyTokenResponse = await verifyToken({
      variables: { token: Cookies.get("JWT") },
    })
    const verifiedUsername =
      verifyTokenResponse.data.verifyToken.payload.username
    setUsername(verifiedUsername)
  }

  useEffect(() => {
    try {
      verifyTokenAsync()
    } catch (error) {
      throw new Error(`Token verification error: ${error}`)
    }
  }, [])

  const {
    loading: loading_getUsers,
    error: error_getUsers,
    data: data_getUsers,
    refetch: refetch_getUsers,
  } = useQuery(GET_USERS, {
    variables: { username: username },
    notifyOnNetworkStatusChange: true,
  })

  useEffect(() => {
    if (loading_getUsers === false && error_getUsers === undefined) {
      console.log(data_getUsers)
      setGroups(data_getUsers?.usersList[0].groupMembership)
    }
  }, [loading_getUsers, error_getUsers, data_getUsers])

  return (
    <ol>
      {groups.map((groupMembership: GroupMembership) => (
        <GroupTiny key={groupMembership.id} group={groupMembership.group} acceptedPayment={groupMembership.acceptedPayment}/>
      ))}
    </ol>
  )
}
