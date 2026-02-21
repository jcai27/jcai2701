import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";

const isVideoUrl = (url: string) => /\.(mp4|webm|mov|m4v|ogg)(\?.*)?$/i.test(url);

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
            <p className="section-label">About Me</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              About Me
            </h1>
            <p className="mt-3 max-w-3xl text-lg text-muted-foreground">
              A few things I enjoy outside of coding!
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
                <div>
                  <p className="section-label">Hobby {idx + 1}</p>
                  <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{item.title}</h2>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{item.description}</p>
                </div>

                <div className="grid gap-4 md:relative md:min-h-[420px] md:block">
                  {[0, 1].map((imageIndex) => {
                    const url = item.imageUrls?.[imageIndex];
                    const isFirst = imageIndex === 0;
                    const cardPosition = isFirst
                      ? "md:left-0 md:top-0 md:w-[74%] md:rotate-[-1.5deg]"
                      : "md:right-0 md:bottom-2 md:w-[66%] md:rotate-[1.5deg]";
                    return (
                      <div
                        key={imageIndex}
                        className={`${cardPosition} overflow-hidden rounded-2xl border border-border bg-card shadow-[0_12px_30px_hsl(222_20%_14%_/_0.16)] md:absolute`}
                      >
                        <div className="h-56 sm:h-64">
                          {url ? (
                            isVideoUrl(url) ? (
                              <video
                                src={url}
                                className="h-full w-full object-cover"
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="metadata"
                              />
                            ) : (
                              <img src={url} alt={`${item.title} ${imageIndex + 1}`} className="h-full w-full object-cover" />
                            )
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
                              Add photo or video {imageIndex + 1} in admin
                            </div>
                          )}
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
