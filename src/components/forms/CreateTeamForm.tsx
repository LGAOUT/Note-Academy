import { CreateFormValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  toast,
} from "@/components/ui";
import { FileUploader, Loader } from "../shared";
import { useUserContext } from "@/context/AuthContext";
import { useCreateTeams } from "@/lib/react-query/queries";
import { useNavigate } from "react-router-dom";

export const CreateTeamForm = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof CreateFormValidation>>({
    resolver: zodResolver(CreateFormValidation),
  });

  const { mutateAsync: createTeam, isLoading: isLoadingCreate } =
    useCreateTeams();

  const handleCreateTeam = async (
    value: z.infer<typeof CreateFormValidation>
  ) => {
    const updatedPost = await createTeam({
      ...value,
      admin: user.id,
      member_counter: 0,
    });

    if (!updatedPost) {
      toast({
        variant: "destructive",
        title: `Team creation failed. Please try again.`,
      });
    }

    if (updatedPost) {
      toast({
        variant: "success",
        title: `Team ${value.name} has been created successfully.`,
      });
      navigate(`/teams/${updatedPost.$id}`);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleCreateTeam)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">Name</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">
                Add Tags (separated by comma " , ")
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Art, Expression, Learn"
                  type="text"
                  className="shad-input"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cover_picture"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Add Your Cover Picture
              </FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={""}
                  isTeam={true}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <Button
          disabled={isLoadingCreate}
          type="submit"
          className="shad-button_primary whitespace-nowrap">
          {isLoadingCreate && <Loader />}
          Post
        </Button>
      </form>
    </Form>
  );
};
