import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import CreateServiceTypeForm from "./CreateServiceTypeForm";
import ServiceTypesList from "./ServiceTypesList";

export const APIServiceArea = () => {
  const [serviceTypesListOpen, setServiceTypesListOpen] = useState(false);
  const [createServiceTypeFormOpen, setCreateServiceTypeFormOpen] =
    useState(false);

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  if (!isLoggedIn) return null;

  return (
    <>
      <div>
        <h4>API Service Area</h4>
        <button type="button" onClick={() => setServiceTypesListOpen(true)}>
          Load Service Types
        </button>
        {serviceTypesListOpen && <ServiceTypesList />}
      </div>
      <div>
        <button
          type="button"
          onClick={() => setCreateServiceTypeFormOpen(true)}
        >
          Create a ServiceType
        </button>
        {createServiceTypeFormOpen && <CreateServiceTypeForm />}
      </div>
    </>
  );
};
