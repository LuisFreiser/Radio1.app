function StoreLinks() {
  return (
    <div className="flex gap-4">
      <button className="bg-white/10 hover:bg-white/20 transition px-6 py-2 rounded-lg flex items-center gap-2">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/1200px-Google_Play_Store_badge_EN.svg.png"
          alt="Play Store"
          className="h-5"
        />
      </button>
      <button className="bg-white/10 hover:bg-white/20 transition px-6 py-2 rounded-lg flex items-center gap-2">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/1200px-Download_on_the_App_Store_Badge.svg.png"
          alt="App Store"
          className="h-5"
        />
      </button>
    </div>
  );
}
export default StoreLinks;
