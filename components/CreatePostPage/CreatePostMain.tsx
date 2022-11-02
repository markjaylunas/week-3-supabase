import {
  Checkbox,
  Container,
  Radio,
  Space,
  Switch,
  Textarea,
  Title,
} from "@mantine/core";
import axios, { AxiosError } from "axios";
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { PostItem } from "../../types/post.types";
import supabase from "../../utils/supabaseClient";
import Compressor from "compressorjs";

const CreatePostMain = () => {
  const [loading, setLoading] = useState(false);
  const [isCompressed, setIsCompressed] = useState(true);
  const [compressionSide, setCompressionSide] = useState("");
  const [imageFile, setImageFile] = useState<Blob | null>(null);

  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm<PostItem>();

  const onSubmit = async (data: PostItem) => {
    const toastLoading = toast.loading("Uploading ...");
    setLoading(true);
    const imageUploadUrl = (await uploadImage()) as string;
    const newData = { ...data, image: imageUploadUrl };

    try {
      const createPostResponse = axios.post("/api/post", newData);
      toast.update(toastLoading, {
        render: (await createPostResponse).data.message,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      const err = error as AxiosError | Error;
      if (axios.isAxiosError(err)) {
        setLoading(false);
        toast.update(toastLoading, {
          render: err.response?.data.message,
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      } else {
        console.error(err);
      }
    }

    setLoading(false);
  };

  const uploadImage = async () => {
    if (imageFile === null) return null;
    if (isCompressed) {
      const newImage = await compressedImage(imageFile);
      const imageUrl = await uploadToStorage(newImage);
      return imageUrl;
    } else {
      return await uploadToStorage(imageFile);
    }
  };

  const uploadToStorage = async (image: Blob | null) => {
    if (image === null) return null;
    try {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("post")
        .upload(`image/${uuidv4()}`, image, {
          contentType: "image/jpeg",
        });

      if (uploadError) console.error(uploadError);
      const path = uploadData?.path as string;
      return await generateImageUrl(path);
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const generateImageUrl = async (path: string) => {
    const {
      data: { publicUrl },
    } = await supabase.storage.from("post").getPublicUrl(path);
    const formattedUrl = `${publicUrl}?t=${new Date().toISOString()}`;
    return formattedUrl;
  };

  const compressedImage = async (image: Blob) => {
    if (compressionSide === "client") {
      const compressResult = await clientSideCompression(image);
      return compressResult;
    } else if (compressionSide === "server") return image;
    return image;
  };

  const clientSideCompression = async (image: Blob) => {
    try {
      new Compressor(image, {
        quality: 0.8,
        success: async (result) => {
          return result;
        },
      });
    } catch (error) {
      console.error(error);
      return image;
    }
    return image;
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputFile = e.target.files;
    if (inputFile === null) return;
    const image = inputFile[0];
    setImageFile(image);
  };
  return (
    <Container>
      <Title>Create Post</Title>
      <Space h="lg" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Switch
          label="Compressed image"
          checked={isCompressed}
          onChange={(event) => setIsCompressed(event.currentTarget.checked)}
        />
        <Space h={"lg"} />
        {isCompressed && (
          <Radio.Group
            name="compressionSide"
            label="Select where to compress"
            withAsterisk
            value={compressionSide}
            onChange={setCompressionSide}
          >
            <Radio label="Server Side Compression" value="server" />
            <Radio label="Client Side Compression" value="client" />
          </Radio.Group>
        )}
        <input type="file" accept="image/jpeg" onChange={handleImageChange} />
        <Textarea
          placeholder="Enter description"
          label="Description"
          withAsterisk
          {...register("description", {
            required: "Description is required",
          })}
          aria-invalid={errors.description ? "true" : "false"}
        />
        <p role="alert" className="error">
          {errors.description?.message}
        </p>
        <p role="alert" className="error">
          {errors.image?.message}
        </p>

        <Checkbox label="Public" {...register("is_public", { value: false })} />

        <button
          disabled={loading || imageFile === null ? true : false}
          className="btn"
        >
          {loading ? "Saving ..." : "Save"}
        </button>
      </form>
    </Container>
  );
};

export default CreatePostMain;
