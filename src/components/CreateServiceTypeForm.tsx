import React, { useState } from "react";
import { useCreateServiceTypeMutation } from "../hooks/alcumusAPI";

type FormData = {
  name: string;
  description: string;
};

const initialData: FormData = {
  name: "",
  description: "",
};

const CreateServiceTypeForm = (): React.ReactElement => {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [createServiceType, { isLoading, isError, isSuccess, data }] =
    useCreateServiceTypeMutation();

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    void createServiceType(formData);
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
        {isLoading && <div>Creating Service Type...</div>}
        {isError && <div>An error occurred</div>}
        {isSuccess && <div>Service Type created successfully!</div>}
        {data && (
          <>
            <div>
              <strong>Your new service type:</strong>
            </div>
            <div>Name: {data.name}</div>
            <div>Description: {data.description}</div>
          </>
        )}
      </form>
    </>
  );
};

export default CreateServiceTypeForm;
