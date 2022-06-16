import React, { useState } from "react";
import CreateVariantForm from "./components/CreateVariantForm";
import MyArea from "./components/MyArea";
import ServiceTypesList from "./components/ServiceTypesList";
import { useAppDispatch } from "./hooks/store";
import { authActions } from "./store/auth";

const App = (): React.ReactElement => {
  const [serviceTypesListOpen, setServiceTypesListOpen] = useState(false);
  const [createVariantFormOpen, setCreateVariantFormOpen] = useState(false);

  const dispatch = useAppDispatch();

  return (
    <div className="App">
      <button
        onClick={() => {
          console.log("login");
          dispatch(authActions.login({ token: "MY_TOKEN" }));
        }}
      >
        Login
      </button>

      <hr />

      <div>
        <h4>API Service Area</h4>
        <button type="button" onClick={() => setServiceTypesListOpen(true)}>
          Load Service Types
        </button>
        {serviceTypesListOpen && <ServiceTypesList />}
      </div>
      <div>
        <button type="button" onClick={() => setCreateVariantFormOpen(true)}>
          Create a Variant
        </button>
        {createVariantFormOpen && <CreateVariantForm />}
      </div>

      <hr />

      <MyArea />
    </div>
  );
};

export default App;
