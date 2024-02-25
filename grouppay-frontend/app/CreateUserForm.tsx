'use client'
import React, {useState} from 'react';
import UserInput from './UserInput';

export default function CreateUserForm(): JSX.Element {
    const [status, setStatus] = useState<string>("");

    return (
        <div>
            <h2>Create New User</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                setStatus("Submitted successfully!");
            }}>
                <UserInput id="name" label="Full name" txtarea={false}></UserInput>
                <UserInput id="phone" label="Phone number" txtarea={false}></UserInput>
                <UserInput id="email" label="Email" txtarea={false}></UserInput>
            </form>
        </div>
    );
}