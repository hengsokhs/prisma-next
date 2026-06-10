'use client';
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// type User = {
//   id: number;
//   name: string;
//   email: string;
// }

// export default function HomePage() {
//   const router = useRouter();
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // fetch user 
//   // useEffect(() => {
//   //   fetch("/api/user")
//   //     .then(res => res.json())
//   //     .then(data => setUsers(data))
//   // }, []);

//   // fetch user
//   useEffect(() => {
//     const fetchUsers = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch("/api/user");
//         const data = await res.json();
//         setUsers(data);
//       } catch (error) {
//         console.log("Failed to fetch users", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);


//   return (
//     <>
//       <Button variant="outline">Click</Button>
//       {users.map((user: User) => (
//         <div key={user.id}>{user.name}</div>
//       ))}

//     </>
//   );
// }


import AuthForm from "@/components/auth-form"

export default function LoginPage() {
  return (
    <div className="relative flex justify-center min-h-screen items-center bg-muted">

      {/* Background layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted to-background" />

      {/* Optional subtle pattern / glow */}
      <div className="absolute inset-0 opacity-40 blur-3xl bg-[radial-gradient(circle_at_center,theme(colors.primary/20),transparent_70%)]" />

      {/* Content */}
      <div className="relative flex justify-center z-10 w-full px-4">
        <AuthForm />
      </div>
    </div>
  )
}