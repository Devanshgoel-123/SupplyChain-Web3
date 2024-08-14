import RootLayout from "./layout";
import ReduxProvider from "./ReduxProvider";
import Navbar from "@/components/Navbar";
export default function Page(){
  return (
    <RootLayout>
      <ReduxProvider>
        <Navbar/>
      </ReduxProvider>
    </RootLayout>
  )
}