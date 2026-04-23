"use client";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function User() {
    return(
        <div className="container">
            <Button variant="outline">Create User</Button>

            <Table >
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>0</TableCell>
                        <TableCell>xxx</TableCell>
                        <TableCell>xxx@mail.com</TableCell>
                    </TableRow>
                </TableBody>
            </Table>

        </div>
    );
}