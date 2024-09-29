import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { loginUser } from "@/features/user/userSlice";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      dispatch(loginUser(data));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ex. john.doe@example.com"
                    {...field}
                    type="email"
                    disabled={isSubmitting}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="******"
                    {...field}
                    type="password"
                    disabled={isSubmitting}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button variant={"primary"} className="w-full" disabled={isSubmitting}>
          Login
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
