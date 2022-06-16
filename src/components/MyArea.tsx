import React from "react";
import { useSecret } from "../hooks/selectors";
import { useListServiceTypesQuery } from "../hooks/service";
import { useAppDispatch } from "../hooks/store";
import { myAreaActions } from "../store/myArea";

const MyArea = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const secret = useSecret();

  const { data, isLoading } = useListServiceTypesQuery(undefined);

  const onClick = () => {
    dispatch(
      myAreaActions.setSecret({
        secret: `MY_SECRET! ${Math.ceil(Math.random() * 100)}`,
      })
    );
  };

  return (
    <>
      <h4>My Area</h4>
      <div>
        <button onClick={onClick}>Set Secret</button>
      </div>
      <div>
        <span>{secret}</span>
        {isLoading && <span>Loading variants...</span>}
        {data &&
          data.map((serviceType) => (
            <div key={serviceType.name}>
              <div>Name: {serviceType.name}</div>
              <div>Description: {serviceType.description}</div>
              <div>Created by: {serviceType.createdBy}</div>
            </div>
          ))}
      </div>
    </>
  );
};

export default MyArea;
