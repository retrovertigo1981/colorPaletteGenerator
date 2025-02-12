import { Navbar } from "../components/Navbar";
import { Linkedin, Github } from "lucide-react";

const About = () => {
  return (
    <>
      <Navbar />
      <section className=" min-h-screen">
        <div className="px-4 md:px-6 h-full pb-12 md:max-w-3xl md:mx-auto">
          {/* <h2 className="py-5 text-4xl font-bold text-center text-white mb-8">
            About
          </h2> */}

          <div className="grid md:grid-cols-1 gap-8 pt-8">
            {/* Sección Personal */}
            <div className="">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Hola, soy Sebastián
              </h3>
              <p className="text-gray-800 leading-relaxed mb-6">
                Soy un desarrollador full-stack JavaScript apasionado por crear
                soluciones tecnológicas innovadoras. Con experiencia en
                tecnologías como React, Node.js y PostgreSQL, siempre busco
                aprender y mejorar mis habilidades para ofrecer productos de
                alta calidad.
              </p>

              <div className="flex gap-4 mt-6">
                <a
                  href="https://www.linkedin.com/in/sebastianpenaj/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 hover:text-blue-600 transition-colors"
                >
                  <Linkedin size={32} />
                </a>
                <a
                  href="https://github.com/retrovertigo1981"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 hover:text-gray-900 transition-colors"
                >
                  <Github size={32} />
                </a>
              </div>
            </div>

            {/* Sección Proyecto */}
            <div className="">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Sobre el Proyecto
              </h3>
              <p className="text-gray-800 leading-relaxed mb-4">
                Colorsitos.app nació como un proyecto especial para mi
                portafolio, donde tecnologías modernas como React, Tailwind CSS
                y Firebase se unen para crear una experiencia web de alto nivel.
                Más allá de ser una muestra de mis habilidades técnicas, es un
                reflejo de mi pasión por aprender y crear herramientas que no
                solo sean útiles, sino que también inspiren a otros
                desarrolladores en su camino.
              </p>
            </div>
          </div>
          <div className="mt-8">
            <img
              className=" rounded-md"
              src="/mario_coding.gif"
              alt="Mario Codeando"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
