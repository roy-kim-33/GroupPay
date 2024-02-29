'use client'

import React, { useState, FormEvent, ChangeEvent, FormEventHandler } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery, useMutation, gql } from '@apollo/client'
import { GET_USERS, TOKEN_AUTH } from '@/utils'
import Cookies from 'js-cookie'


export default function Login(): JSX.Element {
    const router = useRouter()
    const [usernameInput, setUsernameInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')

    const [tokenAuth, {
        called: tokenAuthCalled,
        loading: tokenAuthLoading,
        reset: tokenAuthReset
    }] = useMutation(TOKEN_AUTH)

    const cookifyAuthToken = async () => {
        const tokenAuthResponse = await tokenAuth({ variables: { username: usernameInput, password: passwordInput }})
        const authToken = tokenAuthResponse.data.tokenAuth.token
        const refreshExpiresIn = tokenAuthResponse.data.tokenAuth.refreshExpiresIn
        Cookies.set('JWT', authToken, { expires: refreshExpiresIn, path: '/' })
    }

    const handleLoginSubmit: FormEventHandler = async (e: FormEvent) => {
        e.preventDefault()
        try {
            await cookifyAuthToken()
            router.push('/groups')
        } catch (error) {
            // console.error('Authentication error2:', error)
            throw new Error(`Authentication error: ${error}`)
        }
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
