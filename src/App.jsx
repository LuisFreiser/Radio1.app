import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  lazy,
  Suspense,
} from "react";
import { Menu, X, Pause, Play, Music2 } from "lucide-react";
import { Toaster, toast } from "sonner"; // Importa Toaster y toast

// Lazy loading de componentes
const ProgramDaily = lazy(() => import("./components/ProgramDaily"));
const SocialLinks = lazy(() => import("./components/SocialLinks"));
const ImageSlider = lazy(() => import("./components/ImageSlider"));
const MobileMenu = lazy(() => import("./components/MobileMenu"));
const StoreLinks = lazy(() => import("./components/StoreLinks"));

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Referencia al elemento de audio
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return; // Evita error si el audio no está disponible

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

    // Función de limpieza: remueve los listeners al desmontar
    return () => {
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("playing", handlePlay);
      audio.removeEventListener("waiting", handleLoading);
      audio.removeEventListener("stalled", handleError);
    };
  }, []);

  //TOGGLE PLAY MEJORADO Y MENSAJES DE SONNER
  const togglePlay = useCallback(async () => {
    try {
      setIsLoading(true); // Muestra el estado de carga

      const audio = audioRef.current;

      // Verifica si el audio está pausado o en reproducción
      if (audio.paused) {
        // Configura el audio si es necesario
        if (!audio.src) {
          audio.src = "https://conectperu.com/8038/stream"; // Link directo a la radio online
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
  }, []); // Dependencias vacías porque no usamos variables externas

  // Control de volumen envuelto en useCallback para optimización
  const handleVolumeChange = useCallback((e) => {
    const value = e.target.value;
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  }, []);

  // Toggle Menu Mobile en useCallback para optimización
  const toggleMenu = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  // Handlers para el elemento audio, memoizados para optimización
  const handleAudioError = useCallback((e) => {
    console.error("Audio error:", e.target.error);
    toast.error("Error al reproducir la radio. Por favor, intenta nuevamente.");
    setIsLoading(false);
    setIsPlaying(false);
  }, []);

  const handleAudioPlaying = useCallback(() => {
    setIsLoading(false);
    setIsPlaying(true);
  }, []);

  const handleAudioWaiting = useCallback(() => {
    setIsLoading(true);
  }, []);

  const handleAudioPause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleAudioEnded = useCallback(() => {
    setIsPlaying(false);
  }, []);

  // Memoización del elemento audio
  const audioElement = useMemo(
    () => (
      <audio
        ref={audioRef}
        preload="auto"
        type="audio/mpeg"
        crossOrigin="anonymous"
        onError={handleAudioError}
        onPlaying={handleAudioPlaying}
        onWaiting={handleAudioWaiting}
        onPause={handleAudioPause}
        onEnded={handleAudioEnded}
      />
    ),
    [
      handleAudioError,
      handleAudioPlaying,
      handleAudioWaiting,
      handleAudioPause,
      handleAudioEnded,
    ]
  );

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
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-white transition-transform duration-300 rotate-180" />
          ) : (
            <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-white transition-transform duration-300" />
          )}
          <span className="text-white text-sm sm:text-base">MENÚ</span>
        </button>

        {/* Mobile Menu Component */}
        <Suspense
          fallback={
            <div className="animate-pulse text-center p-4">
              Cargando menú...
            </div>
          }
        >
          <MobileMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </Suspense>
      </div>

      {/* Contenido Principal */}
      <Suspense
        fallback={
          <div className="animate-pulse text-center p-8">
            Cargando contenido...
          </div>
        }
      >
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

            {audioElement}

            {/* Album Art and Player */}
            <div className=" bg-white/10 backdrop-blur-lg mb-8 p-4 rounded-2xl overflow-hidden">
              <div className="flex justify-center items-center h-32 mb-2 mt-2">
                <img
                  src="/assets/Logo2.jpg"
                  alt="Now Playing"
                  className="w-32 h-32 sm:w-32 sm:h-32 lg:w-32 lg:h-32 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
                />
              </div>
              <div className="flex flex-col items-center mt-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={togglePlay}
                    disabled={isLoading}
                    className="bg-white rounded-full p-3 hover:bg-gray-200 shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
                      <Pause className="w-6 h-6 sm:w-6 sm:h-6 lg:w-6 lg:h-6 text-blue-600 transition-colors duration-300 hover:text-blue-700" />
                    ) : (
                      <Play className="w-6 h-6 sm:w-6 sm:h-6 lg:w-6 lg:h-6 text-blue-600 transition-colors duration-300 hover:text-blue-700" />
                    )}
                  </button>
                  <span
                    className={`px-2 py-1 sm:px-3 sm:py-1 lg:px-4 lg:py-2 rounded-full text-xs sm:text-sm lg:text-base font-medium transition-all duration-500 ${
                      isPlaying
                        ? "bg-green-500 text-white shadow-green-500/50 shadow-lg animate-pulse"
                        : "bg-gray-500 text-gray-200"
                    }`}
                  >
                    {isPlaying ? "Online" : "Offline"}
                  </span>
                </div>

                {/* Control Volume */}
                <div className="mt-4 sm:mt-6 lg:mt-8 w-full max-w-xs sm:max-w-sm lg:max-w-md flex items-center gap-3 sm:gap-4 lg:gap-6">
                  <Music2 className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-sky-100 transition-colors duration-300 hover:text-sky-200" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-full h-2 sm:h-3 bg-white rounded-full appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-500 hover:bg-gray-100 transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Store Links */}
            <div className="w-full flex justify-center mb-8 lg:mb-0">
              <StoreLinks />
            </div>
          </div>

          {/* Social Media Links - Desktop & Mobile Components */}
          <SocialLinks />
        </div>

        {/* Slider Section Component */}
        <div className="mt-8">
          <ImageSlider />
        </div>
      </Suspense>
    </div>
  );
}

export default App;
