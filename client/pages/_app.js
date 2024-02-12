import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import Heading from "./components/Heading";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class">
      <Heading
        title={"abubakar"}
        description="portfolio"
        keywords=""
      />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
