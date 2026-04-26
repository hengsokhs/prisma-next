"use client";
import {Button} from "@/components/ui/button";
import {
    Field, FieldGroup, FieldLabel
} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {useState} from "react";
import {prisma} from "@/lib/prisma";
import {useRouter} from "next/navigation";

export default function CreateUserPage() {
    const route = useRouter();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleClear = () => {
        setName("");
        setEmail("");
    }

    const handleBack = () => {
        route.push("/users");
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Step : Get data from FormData
        const form = e.currentTarget;
        const formData = new FormData(form);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;

        /// Step : Validate Data
        if (!name || !email) {
            alert("Name and Email is required!");
            return;
        }

        try {
            // Step : Call fetch API to save User
            const res = await fetch("/api/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name, email,
                })
            });

            // Step : Get response
            const resJson = await res.json();
            if (resJson.success) {
                console.log(resJson.user);
                alert(resJson.user.id);
                form.reset();
            } else {
                alert(resJson.error);
            }
        } catch (error) {
            alert("Something went wrong: " + error);
        }
    }

    return (
        <div className={"flex justify-center mt-3"}>
            <Card className="w-1/2 flex">
                <CardHeader>
                    <CardTitle>Create New User</CardTitle>
                    <CardAction>
                        <Button onClick={handleClear} variant={"outline"}>Clear</Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <FieldGroup>
                            <Field className="my-1">
                                <FieldLabel htmlFor="fieldgroup-name">Name</FieldLabel>
                                <Input
                                    type={"text"}
                                    name={"name"}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    id="fieldgroup-name"
                                    placeholder="Enter name"
                                    required={true}
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
                                <Input
                                    type={"email"}
                                    name={"email"}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    id="fieldgroup-email"
                                    placeholder="Enter email"
                                    required={true}
                                />
                            </Field>
                            <Field className="flex justify-center" orientation={"horizontal"}>
                                <Button onClick={handleBack} type="reset" variant={"outline"} size="sm">
                                    Back
                                </Button>
                                <Button
                                    type="submit"
                                    size="sm"
                                >
                                    {loading ? "Loading..." : "Submit"}
                                </Button>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>

    );
}