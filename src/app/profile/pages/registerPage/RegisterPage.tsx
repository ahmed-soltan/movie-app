import { Link } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RegisterForm from "./components/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="w-full flex items-center justify-center p-5">
      <Card className="w-full max-w-[500px]">
        <CardHeader className="flex items-center justify-center">
          <CardTitle>Create Your Account</CardTitle>
          <CardDescription>Create Account in Movie Home</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
        <CardFooter className="flex items-center justify-center w-full gap-5">
          <p>
            Already Have an Account? {" "}
            <Link to="/profile/login" className="text-blue-400 text-sm">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage;
