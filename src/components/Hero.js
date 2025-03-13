export default function Hero() {
    return (
      <section className="h-screen flex flex-col md:flex-row items-center justify-between px-10 md:px-20">
        {/* Left Side - Hero Text */}
        <div className="text-left max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Hi, I'm Denes Kosztyuk</h1>
          <h2 className="text-xl md:text-2xl text-gray-300 mt-2">Software & Web Developer</h2>
          <p className="text-md md:text-lg text-gray-400 mt-4">
            Passionate about building innovative web experiences with Java Spring, React.js, and Python.
          </p>
        </div>
  
        {/* Right Side - 3D Model Placeholder */}
        <div className="w-1/2 h-full flex items-center justify-center">
          <div className="w-[300px] h-[300px] bg-gray-700 rounded-lg flex items-center justify-center">
            {/* Replace with your 3D astronaut model later */}
            <p className="text-white">🚀 3D Astronaut</p>
          </div>
        </div>
      </section>
    );
  }
  