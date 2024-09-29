import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { UpdateUserProfileFormSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ProfilePhotoUploader from "@/components/photo-uploader";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/use-user";

interface USerFormProps {
  handleEditProfile: () => void;
}

const UserForm = ({ handleEditProfile }: USerFormProps) => {
  const { updateUserProfile , user } = useUser();
  const form = useForm<z.infer<typeof UpdateUserProfileFormSchema>>({
    resolver: zodResolver(UpdateUserProfileFormSchema),
    defaultValues: {
      username: user?.username||"",
      email: user?.email||"",
      photoUrl: user?.photoUrl || "",
    },
  });

  const getProfilePhoto = (photo: string) => {
    form.setValue("photoUrl", photo);
  };

  const onSubmit = (data: z.infer<typeof UpdateUserProfileFormSchema>) => {
    updateUserProfile(data);
    form.reset();
    handleEditProfile();
  };

  return (
    <Form {...form}>
      <form className="space-y-8 w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col items-start gap-4 w-full">
          <ProfilePhotoUploader getProfilePhoto={getProfilePhoto} />
          <FormField
            name="username"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full max-w-[500px]">
                <FormLabel className="text-sm font-medium text-slate-300">
                  username
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="ex. john deo"
                    className="w-full p-2 text-sm bg-[#1c1c1c] border-none text-[#999] placeholder:text-[#999]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full max-w-[500px]">
                <FormLabel className="text-sm font-medium text-slate-300">
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="ex. john.deo@example.com"
                    className="w-full p-2 text-sm bg-[#1c1c1c] border-none text-[#999] placeholder:text-[#999]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button variant={"primary"} type="submit">
          Save Changes
        </Button>
      </form>
    </Form>
  );
};

export default UserForm;
