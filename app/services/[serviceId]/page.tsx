import Link from "next/link"
import { ArrowLeft } from "lucide-react"

// Définition des données de service
const serviceData = {
  seo: {
    title: "SEO - Référencement Naturel",
    description: "Optimisez votre visibilité en ligne et attirez un trafic qualifié naturellement.",
    content: `
      Notre approche SEO agit comme les panneaux de signalisation qui orientent naturellement les utilisateurs vers votre marque.
      
      Nous combinons une analyse technique approfondie, une optimisation de contenu stratégique et un suivi constant des performances pour assurer que votre site reste visible dans un paysage digital en constante évolution.
      
      Nos stratégies SEO sont conçues pour s'adapter aux changements d'algorithmes et aux nouvelles tendances de recherche, garantissant une visibilité durable et croissante.
    `,
  },
  publicite: {
    title: "Publicité Numérique",
    description: "Communiquez efficacement votre message aux bonnes personnes, au bon moment.",
    content: `
      Notre approche publicitaire fonctionne comme le haut-parleur qui communique clairement votre message aux bonnes personnes, exactement quand elles en ont besoin.
      
      Nous créons des campagnes publicitaires ciblées sur diverses plateformes (Google Ads, Facebook, Instagram, LinkedIn) en optimisant continuellement les performances pour maximiser votre retour sur investissement.
      
      Chaque campagne est conçue avec une stratégie d'enchères intelligente, des créations publicitaires engageantes et un ciblage précis pour atteindre vos objectifs commerciaux.
    `,
  },
  automatisation: {
    title: "Automatisation Marketing",
    description: "Optimisez vos processus et gagnez en efficacité opérationnelle.",
    content: `
      Notre approche d'automatisation agit comme les mises à jour régulières de votre GPS, assurant que votre stratégie reste pertinente face aux changements constants.
      
      Nous implémentons des workflows automatisés pour vos emails, vos réseaux sociaux, votre gestion de leads et vos rapports, libérant votre temps pour vous concentrer sur la croissance stratégique.
      
      Nos solutions d'automatisation sont personnalisées pour s'intégrer parfaitement à vos outils existants et évoluent avec votre entreprise.
    `,
  },
  analyse: {
    title: "Analyse de Données",
    description: "Prenez des décisions éclairées basées sur des données concrètes.",
    content: `
      Notre approche analytique fonctionne comme le tableau de bord indispensable indiquant l'état et l'efficacité des stratégies mises en place.
      
      Nous transformons les données brutes en insights actionnables grâce à des tableaux de bord personnalisés, des rapports réguliers et des analyses approfondies.
      
      Notre équipe d'analystes identifie les tendances, les opportunités et les obstacles, vous permettant d'ajuster votre stratégie en temps réel pour maximiser les résultats.
    `,
  },
  ia: {
    title: "Intelligence Artificielle",
    description: "Exploitez la puissance de l'IA pour anticiper les tendances et optimiser vos performances.",
    content: `
      Notre approche IA représente l'évolution ultime de votre GPS digital, capable non seulement de vous guider mais d'anticiper les changements de route avant même qu'ils ne surviennent.
      
      Nous intégrons des solutions d'IA pour l'analyse prédictive, la personnalisation client, l'optimisation des campagnes et la génération de contenu, vous donnant une longueur d'avance sur vos concurrents.
      
      Nos modèles d'IA apprennent continuellement de vos données pour affiner leurs prédictions et recommandations, créant un cercle vertueux d'amélioration continue.
    `,
  },
}

export default function ServicePage({ params }: { params: { serviceId: string } }) {
  const { serviceId } = params
  const service = serviceData[serviceId as keyof typeof serviceData]

  if (!service) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
        <h1 className="text-white text-3xl font-bold mb-4">Service non trouvé</h1>
        <Link href="/" className="text-[#7DF9FF] flex items-center">
          <ArrowLeft className="mr-2" /> Retour à l'accueil
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <Link href="/" className="inline-flex items-center text-[#7DF9FF] mb-8 hover:underline">
          <ArrowLeft className="mr-2 w-5 h-5" /> Retour à l'accueil
        </Link>

        <div className="relative">
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-[#7DF9FF]/5 blur-xl"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-[#7DF9FF]/5 blur-xl"></div>

          <div className="relative bg-black/40 backdrop-blur-lg rounded-2xl p-8 border border-[#7DF9FF]/20 shadow-xl">
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">{service.title}</h1>
            <p className="text-[#7DF9FF] text-xl mb-8">{service.description}</p>

            <div className="h-1 w-20 bg-[#7DF9FF] mb-8"></div>

            <div className="text-[#4d4d4f] space-y-6">
              {service.content.split("\n\n").map((paragraph, index) => (
                <p key={index} className="text-lg">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-12">
              <button className="bg-[#7DF9FF] text-black px-8 py-3 rounded-full font-sans text-lg hover:bg-white transition-colors shadow-lg shadow-[#7DF9FF]/30">
                Discutons de votre projet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

