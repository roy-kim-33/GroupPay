import React from "react";
import Link from 'next/link'
interface GroupProps {
  group: {
    id: string;
    name: string;
    createdAt: string;
    payment: number;
    about: string;
  }
  acceptedPayment: boolean
}

export default function Group({ group, acceptedPayment }: GroupProps) {
  return (
    <div>
        <Link href="/" style={{ textDecoration: acceptedPayment ? 'line-through' : 'none' }}>
          {group.name}
          {group.about}
          {group.payment}
        </Link>
    </div>
  );
}
