import { Link } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "./components/LoginForm";

const LoginPage = () => {
  return (
    <div className="w-full flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-[500px]">
        <CardHeader className="flex items-center justify-center">
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>Sign in to Movie Home</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="flex items-center justify-center w-full gap-5">
          <p>
            Don't Have an Account? {" "}
            <Link to="/profile/register" className="text-blue-400 text-sm">
              Create Account
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
