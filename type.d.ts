interface Movie {
  _id: string
  _createdAt: string
  title: string
  category: {
    title: string
  }
  mainImage: {
    asset: {
      url: string
    }
  }
  slug: {
    current: string
  }
  type: string
  title: string
  category: {
    title: string
  }
  quality: string
  externalLink: string
  comments: Comment[]
  body: [object]
}

interface Comment {
  comment: string
  email: string
  name: string
  _createdAt: string
  _id: string
  approved: boolean
  movie: Movie
}

interface IFormInput {
  _id: string
  name: string
  email: string
  comment: string
}

interface IContactFormInput {
  fullName: string
  email: string
  message: string
}

interface Saison {
  _id: string
  description: string
  name: string
  serie: Movie
  _createdAt: string
}

interface Episode {
  _id: string
  name: string
  saison: Saison
  mainImage: {
    asset: {
      url: string
    }
  }
  externalLink: string
  description: string
  saison: {
    serie: Movie
  }
}
