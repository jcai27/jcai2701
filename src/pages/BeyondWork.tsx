import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";

const BeyondWork = () => {
  const {
    data: { beyondWorkSections, personalInfo },
  } = usePortfolio();

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <p className="section-label">Beyond Work</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Life Outside Code
            </h1>
            <p className="mt-3 max-w-3xl text-muted-foreground">
              A few things {personalInfo.name} enjoys beyond software engineering.
            </p>
          </div>
        </section>

        {beyondWorkSections.map((item, idx) => (
          <section
            key={`${item.title}-${idx}`}
            className={`w-full px-6 py-16 ${idx % 2 === 0 ? "bg-secondary/20" : "bg-background"}`}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_420px]"
            >
              <div>
                <p className="section-label">Hobby {idx + 1}</p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground">{item.title}</h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {[0, 1].map((imageIndex) => {
                  const url = item.imageUrls?.[imageIndex];
                  return (
                    <div key={imageIndex} className="h-56 overflow-hidden rounded-xl border border-border bg-card/70">
                      {url ? (
                        <img src={url} alt={`${item.title} ${imageIndex + 1}`} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
                          Add image {imageIndex + 1} in admin
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
};

export default BeyondWork;
