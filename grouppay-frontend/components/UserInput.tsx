// 'use client'
// import React from 'react';

// interface UserInputProps {
//     id: string;
//     label: string;
//     txtarea: boolean;
// }

// export default function UserInput({id, label, txtarea}: UserInputProps): JSX.Element {
//     return (
//         <p>
//             <label htmlFor={id}>{label}</label>
//             {txtarea ? 
//             <textarea id={id}></textarea> : 
//             <input id={id} type="text"></input>
//             }
//         </p>
//     );
// }


// UserInput.tsx
import React from 'react';

interface UserInputProps {
    id: string;
    name: string; // Add the name property here
    label: string;
    txtarea: boolean;
}

export default function UserInput({id, name, label, txtarea}: UserInputProps): JSX.Element {
    return (
        <p>
            <label htmlFor={id}>{label}</label>
            {txtarea ? 
                <textarea id={id} name={name}></textarea> : 
                <input id={id} name={name} type="text"></input> // Make sure to use the name prop here
            }
        </p>
    );
}
