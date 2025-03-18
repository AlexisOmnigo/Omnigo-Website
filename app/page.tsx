import InteractiveMap from "@/components/interactive-map"
import ServiceBoxes from "@/components/service-boxes"

export default function Home() {
  return (
    <main className="relative w-full min-h-screen overflow-hidden bg-white text-black">
      {/* White hero section containing everything */}
      <div className="absolute inset-0 bg-white z-0">
        {/* Interactive map as background with dark path */}
        <div className="absolute inset-0 z-5">
          <InteractiveMap />
        </div>
        
        {/* Central title overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
          <h1 className="text-black text-5xl md:text-7xl font-sans mb-4 text-center px-4 tracking-tight font-bold">
            Votre itinéraire digital vers la réussite
          </h1>
          <p className="text-gray-600 text-xl md:text-2xl max-w-2xl text-center mb-8 px-4">
            Omnigo : Votre copilote stratégique qui s'adapte en temps réel à vos besoins
          </p>
          <button className="bg-black text-white px-8 py-3 rounded-full font-sans text-lg pointer-events-auto hover:bg-gray-800 transition-all shadow-lg">
            Recalculez votre itinéraire digital
          </button>
        </div>
      </div>
      
      {/* Services section - positioned at the bottom of the screen */}
      <div className="absolute inset-x-0 bottom-0 z-20 pb-8 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Nos Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-center mb-12">
            Omnigo vous accompagne avec une gamme complète de services marketing adaptés à vos besoins spécifiques.
          </p>
          <ServiceBoxes />
        </div>
      </div>
    </main>
  )
}

