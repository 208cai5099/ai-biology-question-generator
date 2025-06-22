import Navbar from "@/components/navbar-components/navbar";
import GenerateForm from "@/components/generate-components/generate-form";
import { checkLogin } from "../middleware/check-login";
import LoginReminder from "@/components/generate-components/login-reminder";

export default async function Generate() {

  const loginStatus = await checkLogin()
  
  return (
    <div className="bg-customBackground min-h-screen">

      <Navbar />
      {
        loginStatus ? 
        <GenerateForm />
        :
        <LoginReminder />
      }

    </div>
  );
}