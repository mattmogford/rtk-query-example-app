import React from "react";
import { useListServiceTypesQuery } from "../hooks/alcumusAPI";

const ServiceTypesList = (): React.ReactElement => {
  const { data, isLoading, isError } = useListServiceTypesQuery(undefined);

  return (
    <>
      {isLoading && <span>Loading Service Types...</span>}
      {isError && <span>An error occurred</span>}
      {data &&
        data.map((serviceType) => (
          <div key={serviceType.name}>
            <div>Name: {serviceType.name}</div>
            <div>Description: {serviceType.description}</div>
          </div>
        ))}
    </>
  );
};

export default ServiceTypesList;
