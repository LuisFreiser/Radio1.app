import { X, Facebook, Youtube, Instagram, MessageCircle } from "lucide-react";
import PropTypes from "prop-types";

function MobileMenu({ toggleMenu, isMenuOpen }) {
  return (
    <div
      className={`
          md:hidden fixed inset-0 bg-black/50 backdrop-blur-lg transform transition-transform duration-300 ease-in-out
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
    >
      {/* Botón de cierre */}
      <button
        onClick={toggleMenu}
        className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
      >
        <X className="w-8 h-8 text-white" />
      </button>

      <div className="h-full w-full p-8">
        <div className="flex flex-col space-y-6">
          {/* Program Daily Mobile */}
          <div className=" bg-white/20 backdrop-blur-lg rounded-lg p-6 mt-10 text-white max-w-md">
            <h2 className="text-2xl text-center font-bold mb-6">
              PROGRAMACIÓN SEMANAL
            </h2>

            {/* Morning Program */}
            <div className="mb-8">
              <h3 className="text-blue-400 mb-4">Programa Matutino</h3>
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop"
                  alt="Juan"
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h4 className="font-bold">Despertar con Juan</h4>
                  <p className="text-sm text-gray-300">
                    Lunes a Viernes, 6:00 - 10:00
                  </p>
                  <p className="text-sm text-gray-300">
                    Noticias, tráfico y los éxitos del momento
                  </p>
                </div>
              </div>
            </div>

            {/* Midday Program */}
            <div>
              <h3 className="text-blue-400 mb-4">Programa del Mediodía</h3>
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
                  alt="Maria"
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h4 className="font-bold">Conexión Maria</h4>
                  <p className="text-sm text-gray-300">
                    Lunes a Viernes, 10:00 - 14:00
                  </p>
                  <p className="text-sm text-gray-300">
                    Música latina y entrevistas exclusivas
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Social Links */}
        <div className="mt-8">
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-white hover:text-blue-300">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" className="text-white hover:text-blue-300">
              <Youtube className="w-6 h-6" />
            </a>
            <a href="#" className="text-white hover:text-blue-300">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" className="text-white hover:text-blue-300">
              <MessageCircle className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
// Añadir validación de props
MobileMenu.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
};

export default MobileMenu;
