import { createRoot } from "react-dom/client";
import App from "App";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (process.env.NODE_ENV === `production`) disableReactDevTools();

const rootElement = document.getElementById("root");
if (!rootElement) throw `There is no rootElement`;

const root = createRoot(rootElement);
root.render(<App />);
