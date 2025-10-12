
import SignupForm from "./SignupForm";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Создание',
    description: 'MUSSK2.0',
}

export default function SignunPage() {
    return (
        <SignupForm ></SignupForm>
    );
}
