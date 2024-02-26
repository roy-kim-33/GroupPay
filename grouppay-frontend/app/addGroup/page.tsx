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
// `;

// // Define a TypeScript type for the response
// type CreateGroupResponse = {
//     postGroup: {
//         group: {
//             id: string;
//             name: string;
//             leaderUser: {
//                 id: string;
//                 username: string;
//             };
//             about: string;
//         };
//     };
// };

// export default function CreateUserForm(): JSX.Element {
//     const [status, setStatus] = useState<string>("");
//     const [createGroup, { data, loading, error }] = useMutation<CreateGroupResponse>(CREATE_GROUP_MUTATION);

//     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         const formData = new FormData(e.currentTarget);
//         const leaderUserId = formData.get('leaderUserId') as string;
//         const payment = parseFloat(formData.get('cost') as string);
//         const name = formData.get('groupname') as string;
//         const about = formData.get('description') as string;
//         const statusCode = 1; // Adjust as necessary
    
//         createGroup({ 
//             variables: { 
//                 leaderUserId, 
//                 name, 
//                 about, 
//                 payment, 
//                 statusCode 
//             } 
//         })
//         //   .then((response) => {
//         //     // Now TypeScript knows the structure of `response`
//         //     const groupName = response.data.postGroup.group.name;
//         //     setStatus(`Group "${groupName}" created successfully!`);
//         //   })
//         //   .catch(err => {
//         //     setStatus("Submission failed. Please try again.");
//         //     console.error("Error creating group:", err);
//         //   });
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
//                 {error && <p>Error :( Please try againa)</p>}
//                 <p>{status}</p>
//             </form>
//         </div>
//     );
// }
'use client'
import React from 'react'
import Link from 'next/link'
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@/utils'

export default function addGroup(): JSX.Element {
  return (
    <main className="flex flex-col items-center px-4">
      <ApolloProvider client={apolloClient}>
        <Link href="/">
          Home
        </Link>
      </ApolloProvider>
    </main>
  )
}
