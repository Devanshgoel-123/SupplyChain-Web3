import { Footer } from "@/components/Footer";
import RootLayout from "./layout";
import ReduxProvider from "./ReduxProvider";
import Navbar from "@/components/Navbar";
import ServiceCard from "@/components/Service";
import TableComponent from "@/components/Table";
export default function Page(){
  return (
    <RootLayout>
      <ReduxProvider>
        <Navbar/>
        <ServiceCard/>
        <TableComponent/>
        <Footer/>
       
      </ReduxProvider>
    </RootLayout>
  )
}