import "./App.css";
import { MainNavigation } from "./components/TabPanel";
import ApolloClientProvider from "./contexts/ApolloClientProvider";

function App() {
  return (
    <ApolloClientProvider>
      <MainNavigation />
    </ApolloClientProvider>
  );
}

export default App;
