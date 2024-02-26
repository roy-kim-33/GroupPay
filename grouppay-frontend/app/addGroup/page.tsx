// import React, { useState } from 'react';
// import { useMutation, gql } from '@apollo/client';
// import UserInput from '@/components/UserInput';

// const CREATE_GROUP_MUTATION = gql`
// mutation CreateGroup($leaderUserId: ID!, $name: String!, $about: String!, $payment: Float!, $statusCode: Int!) {
//     postGroup(leaderUserId: $leaderUserId, name: $name, about: $about, payment: $payment, statusCode: $statusCode) {
//       group {
//         id
//         name
//         leaderUser {
//           id
//           username
//         }
//         about
//       }
//     }
//   }
//    `;

// export default function CreateUserForm(): JSX.Element {
//     const [status, setStatus] = useState<string>("");
//     const [createGroup, { data, loading, error }] = useMutation(CREATE_GROUP_MUTATION);

//     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         const formData = new FormData(e.currentTarget);
//         const cost = parseFloat(formData.get('cost') as string);
//         const groupName = formData.get('groupname') as string;
//         const description = formData.get('description') as string;

//         createGroup({ variables: { cost, groupName, description } })
//           .then(response => {
//             // Handle the successful submission here
//             setStatus("Group created successfully!");
//           })
//           .catch(err => {
//             // Handle errors here
//             setStatus("Submission failed. Please try again.");
//             console.error("Error creating group:", err);
//           });
//     };

//     return (
//         <div>
//             <h2>Create New Group</h2>
//             <form onSubmit={handleSubmit}>
//                 <UserInput id="cost" name="cost" label="Cost" txtarea={false}></UserInput>
//                 <UserInput id="groupname" name="groupname" label="Group Name (Optional)" txtarea={false}></UserInput>
//                 <UserInput id="description" name="description" label="Description (Optional)" txtarea={true}></UserInput>
//                 <button type="submit">Submit</button>
//                 {loading && <p>Submitting...</p>}
//                 {error && <p>Error :( Please try again</p>}
//                 <p>{status}</p>
//             </form>
//         </div>
//     );
// }
