import HomePage from "./Home/page";
import NavBar from "./Shared/navBar/page";
// import Register from "./user/register/page";
import PaitentDash from "./PatiantDashboard/page";

export default function Home() {
  return (
    <div className="">
      <NavBar />
      {/* <HomePage /> */}
      <PaitentDash />
    </div>
  );
}
