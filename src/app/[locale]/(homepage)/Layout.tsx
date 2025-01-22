import Footer from "@/app/[locale]/(homepage)/_components/Footer"
import Navbar from "@/app/[locale]/(homepage)/_components/Navbar"

export default function HomeLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
         <>
          <Navbar/>
            {children}
            <Footer/>
         </>
    )
  }