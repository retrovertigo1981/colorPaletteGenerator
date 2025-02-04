import { Navbar } from "../components/Navbar";
import { Linkedin, Github } from "lucide-react";

const About = () => {
  return (
    <>
      <Navbar />
      <section className="bg-[linear-gradient(123deg,rgba(241,76,46,1)_11%,rgba(143,229,246,1)_82%)] min-h-screen">
        <div className="px-4 md:px-6 h-full pb-12 md:max-w-3xl md:mx-auto">
          {/* <h2 className="py-5 text-4xl font-bold text-center text-white mb-8">
            About
          </h2> */}

          <div className="grid md:grid-cols-1 gap-8 pt-8">
            {/* Sección Personal */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Hola, soy Sebastián
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Soy un desarrollador full-stack apasionado por crear soluciones
                tecnológicas innovadoras. Con experiencia en tecnologías como
                React, Node.js y PostgreSQL, siempre busco aprender y mejorar
                mis habilidades para ofrecer productos de alta calidad.
              </p>

              <div className="flex gap-4 mt-6">
                <a
                  href="https://www.linkedin.com/in/sebastianpenaj/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <Linkedin size={32} />
                </a>
                <a
                  href="https://github.com/retrovertigo1981"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <Github size={32} />
                </a>
              </div>
            </div>

            {/* Sección Proyecto */}
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Sobre el Proyecto
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Colorsitos.app es una aplicación web diseñada como un proyecto
                fullstack para mi portafolio profesional. Utiliza tecnologías
                modernas como React, Tailwind CSS y Firebase para ofrecer una
                experiencia de usuario de alto nivel.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Este proyecto representa mi compromiso con el aprendizaje
                continuo y la superación de nuevos desafíos, demostrando mi
                capacidad para dominar nuevas tecnologías y aplicarlas de manera
                efectiva. Colorsitos.app no solo es un producto funcional y de
                calidad para los usuarios, sino que también sirve como una
                herramienta útil para otros desarrolladores, reflejando mi
                dedicación a crear soluciones innovadoras y prácticas.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
