import AboutUs from "../(homepage)/_components/about-us";
import CompaniesSection from "../(homepage)/_components/partner-companies";
import TestimonialSection from "../(homepage)/_components/testimonials";
import InstagramSection from "./_components/instagram-section";
import OurTeamSection from "./_components/our-team-section";
import SectionFeatures from "./_components/section-features";

export default function AboutPage() {
    return (
        <section className="py-20 flex flex-col gap-5">
            <AboutUs/>
            <TestimonialSection/>
            <OurTeamSection/>
            <SectionFeatures/>
            <InstagramSection/>
            <CompaniesSection/>
        </section>
    )
}