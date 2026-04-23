'use client';
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
}

export default function HomePage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/user")
      .then(res => res.json())
      .then(data => setUsers(data))
  }, []);

  return (
    <>
      <Button variant="outline">Click</Button>
      {users.map((user: User) => (
        <div key={user.id}>{user.name}</div>
      ))}

    </>
  );
}