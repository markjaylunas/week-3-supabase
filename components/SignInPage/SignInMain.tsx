import {
  Container,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

type Form = {
  email: string;
  password: string;
};

const SignInMain = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Form>();

  const onSubmit = (data: Form) => {
    setLoading(true);
    console.log(data);
    setLoading(false);
    reset();
  };
  return (
    <Container size="sm">
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
