import { Hero } from "./hero";
import { Rates } from "./rates";
import { CTABanner } from "./cta-banner";
import { HowItWorks } from "./how-it-works";
import { Benefits } from "./benefits";
import { Visit } from "./visit";
import { Footer } from "./footer";

export default function App() {
  return (
    <div className="min-h-screen w-full bg-white">
      <Hero />
      <Rates />
      <CTABanner />
      <HowItWorks />
      <Benefits />
      <Visit />
      <Footer />
    </div>
  );
}
