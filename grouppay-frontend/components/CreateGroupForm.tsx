'use client'
import React, {useState} from 'react';
import UserInput from '../app/UserInput';

export default function CreateUserForm(): JSX.Element {
    const [status, setStatus] = useState<string>("");

    return (
        <div>
            <h2>Create New User</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                setStatus("Submitted successfully!");
            }}>
                <UserInput id="cost" label="Cost" txtarea={false}></UserInput>
                <UserInput id="groupname" label="Group Name (Optional)" txtarea={false}></UserInput>
                <UserInput id="description" label="Description (Optional)" txtarea={true}></UserInput>
            </form>
        </div>
    );
}