"use client";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type User = {
    id: number;
    name: string;
    email: string;
}

export default function User() {
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     fetch("/api/user")
    //         .then(res => res.json())
    //         .then(data => setUsers(data))
    // }, []);
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


    const handleCreate = () => {
        router.push("/users/create")
    }

    const handleInfo = (id: number) => {
        router.push(`/users/${id}/info`);
    }

    const handleEdit = (id: number) => {
        router.push(`/users/${id}/edit`);
    }

    const handleDelete = (id: number) => {
        router.push(`/users/${id}/delete`)
    }

    return (
        <div className="flex justify-center">
            <div className={"w-3/4"}><Button onClick={handleCreate} variant="outline">Create User</Button>
                <Table className={"mt-2"}>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center">ID</TableHead>
                            <TableHead className="text-center">Name</TableHead>
                            <TableHead className="text-center">Email</TableHead>
                            <TableHead className="text-center">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user: User, index: number) => (
                            <TableRow key={user.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell className="flex justify-center">
                                    <ButtonGroup >
                                        <Button onClick={() => handleInfo(user.id)} variant="secondary"
                                            size={"xs"}>Info</Button>
                                        <Button onClick={() => handleEdit(user.id)} variant="default"
                                            size={"xs"}>Edit</Button>
                                        <Button onClick={() => handleDelete(user.id)} variant="destructive"
                                            size={"xs"}>Delete</Button>
                                    </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}