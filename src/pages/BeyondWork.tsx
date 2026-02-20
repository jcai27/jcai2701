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
            <p className="mt-3 max-w-3xl text-lg text-muted-foreground">
              A few things {personalInfo.name} enjoys beyond software engineering.
            </p>
          </div>
        </section>

        {beyondWorkSections.map((item, idx) => (
          <section
            key={`${item.title}-${idx}`}
            className={`w-full px-6 py-16 ${idx % 2 === 0 ? "bg-secondary/25" : "bg-background"}`}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-6xl"
            >
              <div className={`grid items-start gap-10 lg:grid-cols-2 ${idx % 2 === 1 ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""}`}>
                <div className="relative">
                  <div className={`rounded-2xl border border-border bg-card/85 p-7 shadow-[0_14px_34px_hsl(222_20%_14%_/_0.09)] ${idx % 2 === 0 ? "lg:-rotate-1" : "lg:rotate-1"}`}>
                    <p className="section-label">Hobby {idx + 1}</p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{item.title}</h2>
                    <p className="mt-4 text-base leading-relaxed text-muted-foreground">{item.description}</p>
                  </div>
                  <div className={`absolute -top-3 h-8 w-24 rounded-md bg-accent/70 ${idx % 2 === 0 ? "right-8 rotate-6" : "left-8 -rotate-6"}`} />
                </div>

                <div className="grid gap-4 md:relative md:min-h-[420px] md:block">
                  {[0, 1].map((imageIndex) => {
                    const url = item.imageUrls?.[imageIndex];
                    const isFirst = imageIndex === 0;
                    const cardPosition = isFirst
                      ? "md:left-0 md:top-0 md:w-[76%] md:rotate-[-2deg]"
                      : "md:right-0 md:bottom-0 md:w-[70%] md:rotate-[3deg]";
                    return (
                      <div
                        key={imageIndex}
                        className={`${cardPosition} overflow-hidden rounded-2xl border border-border bg-card shadow-[0_12px_30px_hsl(222_20%_14%_/_0.16)] md:absolute`}
                      >
                        <div className="h-56 sm:h-64">
                          {url ? (
                            <img src={url} alt={`${item.title} ${imageIndex + 1}`} className="h-full w-full object-cover" />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
                              Add image {imageIndex + 1} in admin
                            </div>
                          )}
                        </div>
                        <div className="border-t border-border bg-card/90 px-3 py-2 text-xs text-muted-foreground">
                          {item.title} · {imageIndex + 1}
                        </div>
                      </div>
                    );
                  })}
                </div>
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
