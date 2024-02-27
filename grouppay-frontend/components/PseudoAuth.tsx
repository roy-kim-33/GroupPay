import React, { useState, FormEvent, ChangeEvent, FormEventHandler } from 'react'
import { useRouter } from 'next/router';
import { useQuery, useMutation, gql } from '@apollo/client'
import { GET_USERS } from '@/utils'


export default function PseudoAuth(): JSX.Element {
    const router = useRouter();
    const [usernameInput, setUsernameInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    
    const {
        loading: loading_getUsers,
        error: error_getUsers,
        data: data_getUsers,
        refetch: refetch_getUsers,
    } = useQuery(
        GET_USERS,
        {
            variables: { username: usernameInput },
            notifyOnNetworkStatusChange: true,
        }
    )

    const handleLoginSubmit: FormEventHandler = async (e: FormEvent) => {
        e.preventDefault()
        if (data_getUsers.data.usersList.length < 1) {
            // post new user
        } else {
            // use this user as context
        }
        await router.push('/groups');

    }
    const handleUsernameChange: FormEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUsernameInput(e.target.value)
    }
    
    const handlePasswordChange: FormEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordInput(e.target.value)
    }
    return (
        <form
            className="flex-col"
            onSubmit={handleLoginSubmit}
        >   
            <div>
                <label htmlFor="username-input">Username:</label>
                <textarea
                    id="username-input"
                    name="username-input"
                    rows={1}
                    value={usernameInput}
                    // onKeyDown
                    onInput={handleUsernameChange}
                ></textarea>
            </div>
            <div>
                <label htmlFor="password-input">Password:</label>
                <textarea
                    id="password-input"
                    name="password-input"
                    rows={1}
                    value={passwordInput}
                    // onKeyDown
                    onInput={handlePasswordChange}
                ></textarea>
            </div>
            <div className="submit text-center w-1/2 p-3">
                <button type="submit" role="button to submit login username and optional password"
                    className="my-10 py-3">
                    SUBMIT
                </button>
            </div>
        </form>
    )
}
