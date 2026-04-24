"use client";
import { Button } from "@/components/ui/button";
import {
    Field, FieldGroup, FieldLabel
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function CreateUserPage() {
    return (
        <FieldGroup>
            <Field className="mx-auto">
                <FieldLabel htmlFor="fieldgroup-name">Name</FieldLabel>
                <Input className="text-blue-50" id="fieldgroup-name" placeholder="Enter name" />
            </Field>
            <Field>
                <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
                <Input id="fieldgroup-email" placeholder="Enter email" />
            </Field>
            <Field className="flex justify-center bg-amber-400" orientation={"horizontal"}>
                <Button type="reset" variant={"outline"} size="sm">
                    Reset
                </Button>
                <Button type="submit" size="sm">
                    Submit
                </Button>
            </Field>
        </FieldGroup>
    );
}