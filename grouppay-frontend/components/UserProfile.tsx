"use client"
//need to import user info to display here; 
import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USERS, DELETE_USER } from '../utils/operations';

export default function UserProfile() {
    const [deleting, setDeleting] = useState<boolean>(false);

    const { data: getData, loading: getLoading, error: getError, refetch } = useQuery(GET_USERS, {
      //CURRENTLY HARDCODED TO BE ID #1 -- A TEMPORARY SOLUTION
      variables: { id: 1 },
    });
    const [ deleteUser, {data: deleteData, loading: deleteLoading, error: deleteError} ] = useMutation(DELETE_USER);

    //Handle delete account button click
    const handleDeleteAccount = () => {
        // use delete mutation to handle deletion
        //CURRENTLY HARDCODED TO BE ID #1 -- A TEMPORARY SOLUTION
        deleteUser({variables: {id: 1}})
        // then, auto log out the user and display confirmation
    }

    return (
      <div>
        <h1>Profile</h1>
        {/* Query for user's username */}
        {/* Query for user's email (one query, two pieces of data) */}
        <button>Log out</button> {/* button should make some auth call */}
        <button onClick={() => {setDeleting(true);}}>Delete account</button> {/* button should display "Are you sure?" overlay, then call delete user based on response. */}
        {deleting ? 
        <div>
            Confirm account deletion:
            <button className="bg-white rounded-xl shadow-lg" onClick={() => {handleDeleteAccount()}}>Delete</button>
            <button className="bg-white rounded-xl shadow-lg" onClick={() => {setDeleting(false)}}>Cancel</button>
        </div> : ""}
        
      </div>
    )
  }
  