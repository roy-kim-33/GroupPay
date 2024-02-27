'use client'
import React from 'react';

interface UserInputProps {
    id: string;
    label: string;
    txtarea: boolean;
}


export default function UserInput({id, label, txtarea}: UserInputProps): JSX.Element {
    return (
        <p>
            <label htmlFor={id}>{label}</label>
            {txtarea ? 
            <textarea id={id}></textarea> : 
            <input id={id} type="text"></input>
            }
        </p>
    );
}
