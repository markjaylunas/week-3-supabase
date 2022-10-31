import {
  Container,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

type Form = {
  email: string;
  password: string;
};

const SignInMain = () => {
  const [loading, setLoading] = useState(false);
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Form>();

  const onSubmit = async (data: Form) => {
    setLoading(true);
    // try {
    //   const response = await axios.post("/api/sign-in", { ...data });
    //   if (response.data) {
    //     router.push("/p/dashboard");
    //   }
    // } catch (error) {
    //   throw error;
    // }
    const toastLoading = toast.loading("Please wait...");
    const {
      data: { user },
      error,
    } = await supabaseClient.auth.signInWithPassword(data);
    if (error) {
      toast.update(toastLoading, {
        render: error.message,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
    if (user) {
      router.push("/p/dashboard");

      toast.update(toastLoading, {
        render: `Signed in as ${user.email}`,
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
    }
    setLoading(false);
    reset();
  };
  return (
    <Container size="sm">
      <Title>Sign In</Title>
      <Stack>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            placeholder="Enter email"
            label="Email"
            type="email"
            withAsterisk
            {...register("email", {
              required: "Email is required",
            })}
            aria-invalid={errors.email ? "true" : "false"}
          />
          <p role="alert" className="error">
            {errors.email?.message}
          </p>

          <PasswordInput
            placeholder="Enter password"
            label="Password"
            withAsterisk
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 7,
                message: "Password must be at least 8 characters.",
              },
              maxLength: {
                value: 25,
                message: "Password length can't be more than 25 characters.",
              },
            })}
            aria-invalid={errors.password ? "true" : "false"}
          />
          <p role="alert" className="error">
            {errors.password?.message}
          </p>

          <button disabled={loading ? true : false} className="btn btn-lg">
            Sign In
          </button>
        </form>
        <Link href="/register">
          <Text underline={true}>Create an account</Text>
        </Link>
      </Stack>
    </Container>
  );
};

export default SignInMain;
