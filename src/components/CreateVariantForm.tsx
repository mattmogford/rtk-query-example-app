import React, { useState } from "react";
import { useCreateVariantMutation } from "../hooks/service";

type FormData = {
  name: string;
  description: string;
  private: boolean;
  variant: string;
};

const initialData: FormData = {
  name: "",
  description: "",
  private: false,
  variant: "",
};

const CreateVariantForm = (): React.ReactElement => {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [createVariant, { isLoading, isError, isSuccess, data }] =
    useCreateVariantMutation();

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    void createVariant(formData);
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
        {isLoading && <div>Creating variant...</div>}
        {isError && <div>An error occurred</div>}
        {isSuccess && <div>Variant created successfully!</div>}
        {data && (
          <>
            <div>
              <strong>Your new variant:</strong>
            </div>
            <div>ID: {data.id}</div>
            <div>Name: {data.name}</div>
            <div>Description: {data.description}</div>
          </>
        )}
      </form>
    </>
  );
};

export default CreateVariantForm;
