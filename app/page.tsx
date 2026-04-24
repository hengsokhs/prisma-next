'use client';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
}

export default function HomePage() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // fetch user 
  // useEffect(() => {
  //   fetch("/api/user")
  //     .then(res => res.json())
  //     .then(data => setUsers(data))
  // }, []);

  // fetch user
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/user");
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.log("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
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