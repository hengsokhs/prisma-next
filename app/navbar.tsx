"use client";

import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex justify-center" style={{ padding: "16px", borderBottom: "1px solid #add", marginBottom: "10px"}}>
            <Link href={"/"} style={{ marginRight: "16px" }}>Home</Link>
            <Link href={"/users"} style={{ marginRight: "16px" }}>Users</Link>
            {/* <Link href={"/"} style={{ marginRight: "16px" }}>About</Link> */}
        </nav>
    );
}