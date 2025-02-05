import { useState, useRef, useEffect } from "react";
import { Menu, X, Pause, Play, Music2 } from "lucide-react";
import { Toaster, toast } from "sonner"; // Importa Toaster y toast
import ProgramDaily from "./components/ProgramDaily";
import SocialLinks from "./components/SocialLinks";
import ImageSlider from "./components/ImageSlider";
import MobileMenu from "./components/MobileMenu";
import StoreLinks from "./components/StoreLinks";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    const handlePlay = () => {
      setIsLoading(false);
      setIsPlaying(true);
    };

    const handleLoading = () => {
      setIsLoading(true);
    };

    const handleError = (e) => {
      console.error("Error de reproducción:", e);
      toast.info("Conectando la radio. Por favor, espere un momento."); // Mensaje de error con Sonner
      setIsLoading(false);
      setIsPlaying(false);
    };

    // Agrega los listeners al cargar el componente
    audio.addEventListener("error", handleError);
    audio.addEventListener("playing", handlePlay);
    audio.addEventListener("waiting", handleLoading);
    audio.addEventListener("stalled", handleError);

    // Limpieza al desmontar el componente
    audio.removeEventListener("error", handleError);
    audio.removeEventListener("playing", handlePlay);
    audio.removeEventListener("waiting", handleLoading);
    audio.removeEventListener("stalled", handleError);
  }, []);

  // const togglePlay = async () => {
  //   try {
  //     setError(null);
  //     setIsLoading(true);

  //     if (audioRef.current.paused) {
  //       const audio = audioRef.current;
  //       audio.src = "https://stream.zeno.fm/7skvov1tpc5tv"; // Usamos el link directo a la radio Online
  //       audio.preload = "none";
  //       audio.crossOrigin = "anonymous";

  //       await audio.load();
  //       await audio.play();
  //       setIsPlaying(true);
  //       setIsLoading(false);
  //       toast.success("Radio online conectada"); // Mensaje de éxito con Sonner
  //     } else {
  //       audioRef.current.pause();
  //       setIsPlaying(false);
  //       setIsLoading(false);
  //       toast.success("Radio online en Pausa"); // Mensaje informativo con Sonner
  //     }
  //   } catch (err) {
  //     console.error("Toggle error:", err);
  //     toast.error("Ocurrió un error al intentar reproducir la radio."); // Mensaje de error con Sonner
  //     setIsLoading(false);
  //   }
  // };

  //TOGGLE PLAY MEJORADO Y MENSAJES DE SONNER
  const togglePlay = async () => {
    try {
      setIsLoading(true); // Muestra el estado de carga

      const audio = audioRef.current;

      // Verifica si el audio está pausado o en reproducción
      if (audio.paused) {
        // Configura el audio si es necesario
        if (!audio.src) {
          audio.src = "https://stream.zeno.fm/7skvov1tpc5tv"; // Link directo a la radio online
          audio.crossOrigin = "anonymous";
        }

        // Intenta reproducir
        await audio.play();
        setIsPlaying(true);
        toast.success("Radio online conectada"); // Mensaje de éxito con Sonner
      } else {
        // Pausa la reproducción
        audio.pause();
        setIsPlaying(false);
        toast.info("Radio online en pausa"); // Mensaje informativo con Sonner
      }

      setIsLoading(false); // Detiene el estado de carga
    } catch (err) {
      console.error("Error al intentar reproducir:", err);
      toast.error("Ocurrió un error al intentar reproducir la radio."); // Mensaje de error con Sonner
      setIsLoading(false); // Detiene el estado de carga incluso en caso de error
    }
  };

  const handleVolumeChange = (e) => {
    const value = e.target.value;
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-800 text-white p-6">
      {/* Toaster component notifications */}
      <Toaster richColors closeButton />

      {/* Menu Button Mobile */}
      <div className="relative z-50">
        <button
          onClick={toggleMenu}
          className="md:hidden flex items-center gap-2 bg-blue-700 text-white rounded-full px-4 py-2 hover:bg-blue-800 shadow-lg transition-all duration-300"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
          <span className="text-white">MENÚ</span>
        </button>

        {/* Mobile Menu Component */}
        <MobileMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </div>

      {/* Contenido Principal */}
      <div className="mt-8 flex flex-col md:flex-row gap-8">
        {/* Program Daily - Desktop - Component*/}
        <ProgramDaily />

        {/* Player Section */}
        <div className="flex-1 flex flex-col items-center justify-center text-white md:pr-28">
          <div className="text-center mb-4">
            <h1 className="text-4xl font-extrabold tracking-tight text-blue-500 mb-4">
              Radio Antorcha Encendida
            </h1>
            <p className="text-lg text-gray-300 italic">
              Una Señal de los Ultimos Tiempos
            </p>
          </div>

          <audio
            ref={audioRef}
            preload="auto"
            type="audio/mpeg"
            crossOrigin="anonymous"
            onError={(e) => {
              console.error("Audio error:", e.target.error);
              toast.error(
                "Error al reproducir la radio. Por favor, intenta nuevamente."
              ); //Mensaje de error con Sonner
              setIsLoading(false);
              setIsPlaying(false);
            }}
            onPlaying={() => {
              setIsLoading(false);
              setIsPlaying(true);
            }}
            onWaiting={() => setIsLoading(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => {
              setIsPlaying(false);
            }}
          />

          {/* Album Art and Player */}
          <div className=" bg-white/10 backdrop-blur-lg mb-8 p-4 rounded-2xl overflow-hidden">
            <div className="flex justify-center items-center h-32 mb-2 mt-2">
              <img
                src="/assets/Logo2.jpg"
                alt="Now Playing"
                className="w-32 h-32 rounded-lg shadow-lg mb-4"
              />
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-4">
                <button
                  onClick={togglePlay}
                  disabled={isLoading}
                  className="bg-white rounded-full p-3"
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin h-6 w-6 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : isPlaying ? (
                    <Pause className="w-6 h-6 text-blue-600" />
                  ) : (
                    <Play className="w-6 h-6 text-blue-600" />
                  )}
                </button>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    isPlaying ? "bg-green-500" : "bg-gray-500"
                  }`}
                >
                  {isPlaying ? "Online" : "Offline"}
                </span>
              </div>

              {/* Control Volume */}
              <div className="mt-6 w-64 max-w-sm flex items-center gap-4">
                <Music2 className="w-7 h-7 text-sky-100" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full h-2 bg-white rounded-full appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>
          </div>

          {/* Store Links */}
          <StoreLinks />
        </div>

        {/* Social Media Links - Desktop & Mobile Components */}
        <SocialLinks />
      </div>

      {/* Slider Section Component */}
      <ImageSlider />
    </div>
  );
}

export default App;
