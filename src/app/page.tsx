"use client";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import "react-accessible-accordion/dist/fancy-example.css";
import { motion, useTransform, useScroll } from "framer-motion";
import Marquee from "react-fast-marquee";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from "next/navigation";
import { Header } from "./components/Header";
import { MedicationCalculator } from "./components/MedicationCalculator";

export default function Home() {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [openMedicationCalculator, setOpenMedicationCalculator] =
    useState(false);
  const services: string[] = ["Serviço 1", "Serviço 2", "Serviço 3"];
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleAccordion = (index: number): void => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    contentRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.style.maxHeight =
          openIndex === index ? `${ref.scrollHeight}px` : "0px";
      }
    });
  }, [openIndex]);

  const sectionRef = useRef(null);
  const { scrollY } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Controle de escala, posição vertical e opacidade usando mola
  const scale = useTransform(scrollY, [0, 400], [4, 1]);
  const yPosition = useTransform(scrollY, [0, 100], [0, 100]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);
  const reverseOpacity = useTransform(scrollY, [0, 200], [0, 1]);
  const scrollToRef = useRef<HTMLDivElement | null>(null);
  const scrollToSessao2 = () => {
    // Função que faz o scroll até a sessão 2
    if (scrollToRef.current) {
      scrollToRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };
  const parentVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const slides = [0, 1, 2];

  return (
    <>
      <div className="flex h-full w-full flex-col items-center bg-[#0A0A0A]">
        <main className="rel flex w-full flex-col">
          <Header />
          <motion.section
            ref={sectionRef}
            className="relative z-40 flex min-h-[180vh] w-full flex-col rounded-b-[40px] bg-[#0A0A0A] lg:rounded-b-[80px]"
          >
            <div className="absolute z-50 h-full w-full rounded-b-[40px] bg-[url(/1.png)] bg-cover bg-no-repeat opacity-30 lg:rounded-b-[80px]"></div>
            <div className="absolute z-40 h-full w-full rounded-b-[40px] bg-white/70 lg:rounded-b-[80px]"></div>

            <Image
              className="absolute bottom-20 left-0 z-50 h-[50vh] w-auto"
              alt=""
              width={500}
              height={500}
              src="/2.png"
            />
            <div className="sticky top-0 z-[80] flex h-screen w-full justify-center">
              <motion.div
                className="relative flex w-full flex-col items-center rounded-lg px-4 py-16 lg:px-0"
                animate={{ y: 0, scale: 1, opacity: 1 }}
                initial={{ y: -100, scale: 0.8, opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2,
                }}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                >
                  <Image
                    className="mb-4 mt-8 h-28 w-auto"
                    alt=""
                    width={500}
                    height={500}
                    src="/fullLogo.png"
                  />
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  className="text-3xl font-bold text-black lg:text-4xl"
                >
                  CONSULTORIA EM SAÚDE ANIMAL
                </motion.h1>
                <motion.h2
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                  className="mb-4 mt-4 text-black lg:text-center lg:text-lg"
                >
                  CONSULTORIA EM SAÚDE ANIMAL, CONSULTORIA EM SAÚDE ANIMAL
                  CONSULTORIA EM <br /> SAÚDE ANIMAL CONSULTORIA EM SAÚDE ANIMAL
                </motion.h2>

                <motion.div
                  style={{ scale, y: yPosition }}
                  className="absolute -bottom-20 z-[80] flex h-[440px] w-[80%] flex-col overflow-hidden rounded-3xl lg:flex-row"
                >
                  <motion.div
                    style={{ opacity }}
                    className="absolute left-0 right-0 top-10 z-[90] flex scale-[0.4] flex-col items-center justify-center"
                  >
                    <Image
                      className="h-max w-1/2 object-contain lg:mb-4 lg:mt-4 lg:h-28 lg:w-auto"
                      alt=""
                      width={500}
                      height={500}
                      src="/5.png"
                    />
                    <h1 className="w-40 font-bold text-white lg:w-auto lg:text-2xl">
                      CONSULTORIA EM SAÚDE ANIMAL
                    </h1>
                    <div className="flex w-2/3 flex-row gap-4 lg:w-auto">
                      <button
                        onClick={() => scrollToSessao2()}
                        className="mt-8 scale-90 rounded-md transition-all duration-300 hover:scale-100"
                      >
                        <Image
                          alt=""
                          width={500}
                          height={500}
                          src={"/appleP.png"}
                          className="h-10 w-auto object-contain"
                        />
                      </button>
                      <button
                        onClick={() => scrollToSessao2()}
                        className="mt-8 scale-90 rounded-md transition-all duration-300 hover:scale-100"
                      >
                        <Image
                          alt=""
                          width={500}
                          height={500}
                          src={"/googleP.png"}
                          className="h-10 w-auto rounded-md object-contain"
                        />
                      </button>
                    </div>
                  </motion.div>
                  <video
                    className="absolute left-0 top-0 z-[50] h-full w-full object-cover"
                    src={"/video.mp4"}
                    autoPlay
                    playsInline
                    preload="auto"
                    muted
                    loop
                  />
                  <motion.div
                    style={{ opacity: reverseOpacity }}
                    className="z-[60] flex h-full w-full flex-col justify-evenly p-4 text-right lg:flex-row lg:items-end lg:justify-between"
                  >
                    <div className="flex w-full flex-col items-center">
                      <div className="flex w-[80%] items-end">
                        <h3 className="text-start">
                          Calculadora desenvolvida para facilitar a tomada de
                          decisões sobre o estado de saúde do rebanho.
                        </h3>
                      </div>
                      <button
                        onClick={() => router.push("/mortality-calculator")}
                        className="font-regular mt-4 flex w-[80%] items-center justify-center rounded-md border-[#8F1220] bg-white transition-all duration-300 hover:scale-[1.05]"
                      >
                        <span className="flex items-center justify-center bg-gradient-to-r from-[#8F1220] to-black bg-clip-text p-2 text-sm text-[#8F1220]">
                          Calculadora de Mortalidade
                        </span>
                      </button>
                    </div>
                    <div className="flex w-full flex-col items-center">
                      <div className="flex w-[80%] items-start">
                        <h3 className="text-start">
                          Ferramenta para auxiliar na quantidade de medicamentos
                          com base no tamanho do rebanho e do motivo do
                          tratamento.
                        </h3>
                      </div>
                      <button
                        onClick={() => setOpenMedicationCalculator(true)}
                        className="font-regular mt-4 flex w-[80%] items-center justify-center rounded-md border-[#8F1220] bg-white transition-all duration-300 hover:scale-[1.05]"
                      >
                        <span className="flex items-center justify-center bg-gradient-to-r from-[#8F1220] to-black bg-clip-text p-2 text-sm text-[#8F1220]">
                          Calculadora de Medicamentos
                        </span>
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </motion.section>

          <div ref={scrollToRef} className="relative -mt-20 flex flex-col">
            <div className="absolute right-0 z-30 h-full w-[100px] bg-gradient-to-r from-[#0A0A0A] to-[#8F1220]/80"></div>
            <section className="z-[40] mt-60 flex items-center justify-between px-0 py-8 text-xl font-bold text-[#585858] lg:px-24 lg:py-16">
              <Marquee gradient={false} pauseOnHover speed={100}>
                <div className="flex space-x-24 px-24 text-xl font-bold text-[#585858]">
                  <span>LOGO NAME</span>
                  <span>LOGO NAME</span>
                  <span>LOGO NAME</span>
                  <span>LOGO NAME</span>
                  <span>LOGO NAME</span>
                  <span>LOGO NAME</span>
                </div>
              </Marquee>
            </section>

            <section className="relative flex h-screen w-full flex-col items-center justify-center bg-[#0A0A0A] text-white">
              <Image
                className="absolute right-0 z-50 h-[50vh] w-auto"
                alt=""
                width={500}
                height={500}
                src="/logoCortadaCinza.png"
              />
              <div className="z-[60] flex h-full w-full flex-col px-4 py-8 text-white lg:px-24 lg:py-16">
                <div className="flex flex-row gap-2">
                  <motion.div
                    className="flex flex-row items-center gap-2 font-bold"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <Image
                      className="h-14 w-auto"
                      alt=""
                      width={500}
                      height={500}
                      src="/4.png"
                    />
                  </motion.div>
                  <motion.div
                    className="flex flex-row items-center gap-2 font-bold"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="text-2xl font-bold">SERVIÇOS</h2>
                  </motion.div>
                </div>
                <motion.h3
                  className="text-md mb-4 text-start font-semibold"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  Explore the world through our portfolio of works and find what
                  you love here.
                </motion.h3>

                <motion.div
                  className="mt-10 flex flex-col justify-between gap-8"
                  variants={parentVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {services.map((service, index) => (
                    <motion.div
                      key={index}
                      className={`mb-2 mt-4 w-full transition-all duration-300 lg:w-[80%] ${
                        openIndex !== index ? "border-b border-b-white" : ""
                      }`}
                      variants={childVariants}
                    >
                      <button
                        onClick={() => toggleAccordion(index)}
                        className="flex w-full justify-between px-4 py-2 text-left text-sm font-medium text-white"
                      >
                        <div
                          className={`flex flex-row gap-8 transition-all duration-300 ${
                            openIndex === index
                              ? "text-[#DC2626]"
                              : "text-white"
                          }`}
                        >
                          <span>0{index + 1}</span>
                          <span className="text-xl font-bold">{service}</span>
                        </div>
                        <div
                          className={`border ${
                            openIndex === index
                              ? "border-white"
                              : "border-zinc-600"
                          } flex h-8 w-8 items-center justify-center rounded-full p-2 transition-all duration-300`}
                        >
                          <span
                            className={`${
                              openIndex === index ? "-rotate-45" : ""
                            } transform transition-transform duration-300`}
                          >
                            <ArrowRight
                              className={`transition-all duration-300 ${
                                openIndex === index
                                  ? "text-[#DC2626]"
                                  : "text-white"
                              }`}
                            />
                          </span>
                        </div>
                      </button>
                      <div
                        ref={(el) => {
                          contentRefs.current[index] = el;
                        }}
                        className="flex max-h-0 flex-row items-center gap-8 overflow-hidden px-4 text-sm text-gray-200 transition-all duration-500 ease-in-out"
                      >
                        <div
                          className={`flex h-48 w-[80%] flex-row items-center gap-8 transition-all duration-300 ${
                            openIndex === index ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          <div className="h-32 w-40 p-1">
                            <div className="h-full w-full rounded-lg bg-white"></div>
                          </div>
                          <span>
                            Explore the world through our portfolio of works and
                            find what you love here. This is a detailed
                            description of {service}.
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </section>
          </div>
          <section className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-b-3xl">
            <div className="absolute z-20 h-full w-full bg-[url(/1.png)] bg-cover bg-no-repeat opacity-30"></div>
            <div className="absolute z-10 h-full w-full bg-white/70"></div>
            <div className="z-[60] flex h-full w-full flex-col px-4 py-8 text-[#DC2626] lg:px-24 lg:py-16">
              <div className="flex flex-row gap-2">
                <motion.div
                  className="flex flex-row items-center gap-2 font-bold"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <Image
                    className="h-14 w-auto"
                    alt=""
                    width={500}
                    height={500}
                    src="/4.png"
                  />
                </motion.div>
                <motion.div
                  className="flex flex-row items-center gap-2 font-bold"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl font-bold">NOSSA HISTÓRIA</h2>
                </motion.div>
              </div>
              <motion.h3
                className="text-md mb-4 text-start font-semibold"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                (TEXTO GENÉRICO SOBRE HISTÓRIA DE ATÉ 2 LINHAS)
              </motion.h3>

              <h3 className="text-md text-start font-semibold"></h3>
              <div className="z-[60] mb-20 mt-10 flex w-full flex-row justify-between gap-8">
                <Swiper
                  slidesPerView={1.2}
                  spaceBetween={20}
                  breakpoints={{
                    768: {
                      slidesPerView: 3,
                      spaceBetween: 20,
                    },
                  }}
                >
                  {slides.map((index) => (
                    <SwiperSlide key={index}>
                      <motion.button
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="group relative flex flex-col gap-4 rounded-2xl bg-black/20 p-4 pt-16 transition-all duration-300 hover:scale-[1.05] hover:bg-black/40 lg:h-64 lg:w-64 lg:pt-4 xl:h-[350px] xl:w-[350px]"
                      >
                        <div className="h-1/2 w-full"></div>
                        <div className="flex h-1/2 w-full items-center">
                          <span className="text-start font-semibold text-zinc-800 transition-all duration-300 group-hover:text-white">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit.
                          </span>
                        </div>
                        <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border p-2 transition-all duration-300 group-hover:bg-[#DC2626]">
                          <span className="-rotate-45 transform transition-transform duration-300 group-hover:-rotate-90">
                            <ArrowRight className="text-[#DC2626] transition-all duration-300 group-hover:text-white" />
                          </span>
                        </div>
                      </motion.button>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </section>

          <section className="relative z-40 -mt-20 flex h-screen w-full flex-col items-center justify-center rounded-t-3xl bg-[#0A0A0A] px-4 py-8 text-white lg:px-24 lg:py-16 lg:pb-20">
            <Image
              className="absolute right-0 top-20 z-50 h-[50vh] w-auto"
              alt=""
              width={500}
              height={500}
              src="/3.png"
            />
            <div className="z-[60] flex w-full flex-col">
              <div className="text-bold flex flex-row items-center justify-center gap-2">
                <motion.div
                  className="flex flex-col items-center justify-center gap-2 font-bold"
                  variants={textVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <div className="flex-row-gap-2 flex">
                    <motion.div
                      variants={imageVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      <Image
                        className="h-10 w-10"
                        alt=""
                        width={500}
                        height={500}
                        src="/4.png"
                      />
                    </motion.div>
                    <h2 className="text-2xl font-bold">
                      TECNOLOGIAS INOVADORAS NO SETOR
                    </h2>
                  </div>
                  <h3 className="text-md text-center font-semibold">
                    (TEXTO SOBRE TECNOLOGIAS INOVADORAS NO SETOR DE PECUÁRIA, DE
                    ATÉ 3 LINHAS)
                  </h3>
                </motion.div>
              </div>

              <motion.div
                className="mb-10 mt-10 flex w-full flex-col items-center justify-evenly gap-8 lg:flex-row"
                variants={textVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="h-64 w-64 rounded-2xl bg-white lg:h-[400px] lg:w-[390px]"></div>
                <div className="h-64 w-64 rounded-2xl bg-white lg:h-[400px] lg:w-[390px]"></div>
              </motion.div>
            </div>
          </section>
        </main>
        <footer className="mb-10 flex w-[80%] flex-col items-center justify-between gap-4 self-center rounded-lg bg-black px-4 py-2 shadow shadow-[#8F1220] lg:flex-row">
          <button>
            <Image
              className="h-16 w-auto transition-all duration-300 hover:scale-[1.05]"
              alt=""
              width={500}
              height={500}
              src="/12.png"
            />
          </button>
          <button>
            <Image
              className="h-16 w-auto transition-all duration-300 hover:scale-[1.05]"
              alt=""
              width={500}
              height={500}
              src="/13.png"
            />
          </button>
          <button>
            <Image
              className="h-16 w-auto transition-all duration-300 hover:scale-[1.05]"
              alt=""
              width={500}
              height={500}
              src="/14.png"
            />
          </button>
          <div className="flex flex-col lg:items-end">
            <span className="text-lg">Tecnologia Desenvolvida por</span>
            <span className="text-lg font-semibold">
              Executivo&apos;s Negócios Digitais LTDA
            </span>
          </div>
        </footer>
      </div>

      <MedicationCalculator
        openMedicationCalculator={openMedicationCalculator}
        setOpenMedicationCalculator={setOpenMedicationCalculator}
      />
    </>
  );
}
