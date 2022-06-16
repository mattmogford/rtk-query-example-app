import React from "react";
import { useListServiceTypesQuery } from "../hooks/service";

const ServiceTypesList = (): React.ReactElement => {
  const { data, isLoading, isError } = useListServiceTypesQuery(undefined);

  return (
    <>
      {isLoading && <span>Loading variants...</span>}
      {isError && <span>An error occurred</span>}
      {data &&
        data.map((serviceType) => (
          <div key={serviceType.name}>
            <div>Name: {serviceType.name}</div>
            <div>Description: {serviceType.description}</div>
            <div>Created by: {serviceType.createdBy}</div>
          </div>
        ))}
    </>
  );
};

export default ServiceTypesList;
