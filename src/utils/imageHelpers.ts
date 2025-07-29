// Popular Unsplash images for AI/Tech content
export const popularAIImages = [
    {
      url: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=1200&auto=format&fit=crop",
      description: "AI and human interaction concept"
    },
    {
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
      description: "Person using smartphone with AI interface"
    },
    {
      url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
      description: "Warning concept with technology"
    },
    {
      url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
      description: "Business technology concept"
    },
    {
      url: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop",
      description: "Future technology concept"
    },
    {
      url: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=800&auto=format&fit=crop",
      description: "Social media trends"
    },
    {
      url: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop",
      description: "Balance concept"
    },
    {
      url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
      description: "AI chatbot conversation"
    }
  ]
  
  export const getRandomAIImage = () => {
    const randomIndex = Math.floor(Math.random() * popularAIImages.length)
    return popularAIImages[randomIndex]
  }