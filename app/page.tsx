import StatusBar from "./components/StatusBar";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Process from "./components/Process";
import Moment from "./components/Moment";
import Products from "./components/Products";
import Gallery from "./components/Gallery";
import WeeklyContent from "./components/WeeklyContent";
import ShareBar from "./components/ShareBar";
import FindUs from "./components/FindUs";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <StatusBar />
      <Nav />
      <main>
        <Hero />
        <Products />
        <Features />
        <Process />
        <Moment />
        <Gallery />
        <WeeklyContent />
        <ShareBar />
        <FindUs />
      </main>
      <Footer />
    </>
  );
}
