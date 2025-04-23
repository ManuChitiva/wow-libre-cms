import AdIframe from "@/components/adversing";
import NativeBanners from "@/components/adversing/native_banner";
import Advertising from "@/components/home/banner";
import Bidding from "@/components/home/bidding";
import ContributionsHome from "@/components/home/contribution";
import Information from "@/components/home/information";
import InfoIntegrate from "@/components/home/integration";
import Navbar from "@/components/home/navbar-home/navbar";
import SliderHome from "@/components/home/slider";
import Subscription from "@/components/home/subscription";
import ServerExperience from "@/components/home/us";
import PricingPlans from "@/components/princing";

const Home = () => {
  return (
    <>
      <Navbar />
      <Advertising />

      <Information />
      <PricingPlans />
      <ServerExperience />
      <SliderHome />

      <InfoIntegrate />

      <Bidding />
      <ContributionsHome />

      <Subscription />
    </>
  );
};
export default Home;
