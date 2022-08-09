import { APIServiceArea } from "./components/APIServiceArea";
import { LoginArea } from "./components/LoginArea";

const App = (): React.ReactElement => {
  return (
    <div className="App">
      <LoginArea />
      <hr />
      <APIServiceArea />
    </div>
  );
};

export default App;
