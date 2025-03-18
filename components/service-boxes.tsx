"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Search, Megaphone, Bot, BarChart3, Brain, ArrowRight } from "lucide-react"

type Service = {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
  iconColor: string
}

const services: Service[] = [
  {
    id: "seo",
    title: "SEO",
    description: "Optimisez votre visibilité et attirez un trafic qualifié naturellement",
    icon: <Search className="w-8 h-8" />,
    color: "rgba(0, 120, 212, 0.05)",
    iconColor: "#0078D4"
  },
  {
    id: "publicite",
    title: "Publicité Numérique",
    description: "Communiquez efficacement votre message aux bonnes personnes",
    icon: <Megaphone className="w-8 h-8" />,
    color: "rgba(255, 107, 0, 0.05)",
    iconColor: "#FF6B00"
  },
  {
    id: "automatisation",
    title: "Automatisation",
    description: "Optimisez vos processus et gagnez en efficacité opérationnelle",
    icon: <Bot className="w-8 h-8" />,
    color: "rgba(43, 182, 115, 0.05)",
    iconColor: "#2BB673"
  },
  {
    id: "analyse",
    title: "Analyse de Données",
    description: "Prenez des décisions éclairées basées sur des données concrètes",
    icon: <BarChart3 className="w-8 h-8" />,
    color: "rgba(23, 162, 184, 0.05)",
    iconColor: "#17a2b8"
  },
  {
    id: "ia",
    title: "Intelligence Artificielle",
    description: "Exploitez la puissance de l'IA pour anticiper les tendances",
    icon: <Brain className="w-8 h-8" />,
    color: "rgba(0, 120, 212, 0.05)",
    iconColor: "#0078D4"
  },
]

export default function ServiceBoxes() {
  const [hoveredService, setHoveredService] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-7xl w-full mx-auto">
      {services.map((service) => (
        <Link
          href={`/services/${service.id}`}
          key={service.id}
          className="pointer-events-auto"
          onMouseEnter={() => setHoveredService(service.id)}
          onMouseLeave={() => setHoveredService(null)}
        >
          <div
            className={`
              relative overflow-hidden rounded-xl backdrop-blur-md border border-gray-200
              p-5 h-full transition-all duration-300 group bg-white
              ${hoveredService === service.id ? "shadow-lg scale-105" : "shadow-md"}
            `}
            style={{
              backgroundColor: hoveredService === service.id ? service.color : "#FFFFFF",
              borderColor: hoveredService === service.id ? service.iconColor : "#E9ECEF"
            }}
          >
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-gray-50 -mr-12 -mt-12"></div>

            <div className="flex items-start mb-3">
              <div className="p-2 rounded-lg" 
                style={{ 
                  backgroundColor: `${service.color}`, 
                  color: service.iconColor 
                }}
              >
                {service.icon}
              </div>
            </div>

            <h3 className="text-black text-xl font-bold mb-2">{service.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{service.description}</p>

            <div 
              className="flex items-center text-sm font-medium transition-transform group-hover:translate-x-1"
              style={{ color: service.iconColor }}
            >
              En savoir plus <ArrowRight className="ml-1 w-4 h-4" />
            </div>

            <div className="absolute bottom-0 right-0 w-16 h-16 rounded-full bg-gray-50 -mr-8 -mb-8"></div>
          </div>
        </Link>
      ))}
    </div>
  )
}

