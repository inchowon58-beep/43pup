import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Process from "./components/Process";
import Director from "./components/Director";
import Reviews from "./components/Reviews";
import Gallery from "./components/Gallery";
import FAQ from "./components/FAQ";
import ArticlesScroll from "./components/ArticlesScroll";
import { listPublicPageSummaries } from "@/lib/seo-pages";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let pages: Awaited<ReturnType<typeof listPublicPageSummaries>> = [];
  try {
    pages = await listPublicPageSummaries();
  } catch {
    pages = [];
  }

  return (
    <>
      <Hero />
      <About />
      <Services />
      <Process />
      <Director />
      <Gallery />
      <Reviews />
      <FAQ />
      <ArticlesScroll pages={pages} />
    </>
  );
}
