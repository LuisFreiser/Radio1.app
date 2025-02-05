import { Facebook, Youtube, Music2, MessageCircle } from "lucide-react";

function SocialLinks() {
  return (
    <>
      {/* Social Media Links - Desktop only */}
      <div className="hidden md:flex fixed right-4 top-1/2 -translate-y-1/2 flex-col gap-4">
        <a
          href="https://web.facebook.com/antorchaencendida.radio"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/10 p-3 rounded-lg hover:bg-white/20 transition"
        >
          <Facebook className="w-6 h-6 text-white" />
        </a>
        <a
          href="https://www.youtube.com/@antorchaencendidaministeri2436"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/10 p-3 rounded-lg hover:bg-white/20 transition"
        >
          <Youtube className="w-6 h-6 text-white" />
        </a>
        <a
          href="#"
          className="bg-white/10 p-3 rounded-lg hover:bg-white/20 transition"
        >
          <Music2 className="w-6 h-6 text-white" />
        </a>
        <a
          href="#"
          className="bg-white/10 p-3 rounded-lg hover:bg-white/20 transition"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </a>
      </div>

      {/* Mobile Social Links - Fixed Bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent backdrop-blur-sm">
        <div className="flex justify-center space-x-8">
          <a
            href="https://web.facebook.com/antorchaencendida.radio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-white-300 transform hover:scale-125 transition-all"
          >
            <Facebook className="w-8 h-8" />
          </a>
          <a
            href="https://www.youtube.com/@antorchaencendidaministeri2436"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-white-300 transform hover:scale-125 transition-all"
          >
            <Youtube className="w-8 h-8" />
          </a>
          <a
            href="#"
            className="text-white hover:text-white-300 transform hover:scale-125 transition-all"
          >
            <Music2 className="w-8 h-8" />
          </a>
          <a
            href="#"
            className="text-white hover:text-white-300 transform hover:scale-125 transition-all"
          >
            <MessageCircle className="w-8 h-8" />
          </a>
        </div>
      </div>
    </>
  );
}

export default SocialLinks;
