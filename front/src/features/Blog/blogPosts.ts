import giftsWishesImage from "../../assets/images/blog/gifts-wishes.png";

export type BlogPost = {
  title: string;
  date: string;
  slug: string;
  category: string;
  excerpt: string;
  image?: string;
  seo: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
  };
};

export const blogPosts: BlogPost[] = [
  {
    title: "Как вежливо указать пожелания к подаркам",
    date: "26.05.2024",
    slug: "kak-vezhlivo-ukazat-pozhelaniya-k-podarkam",
    category: "Свадебные советы",
    excerpt:
      "Как написать о подарках в свадебном приглашении так, чтобы это звучало деликатно, красиво и понятно для гостей.",
    image: giftsWishesImage,
    seo: {
      title: "Как вежливо указать пожелания к подаркам | Eventess",
      description:
        "Как написать о подарках в свадебном приглашении так, чтобы это звучало деликатно, красиво и понятно для гостей.",
      ogTitle: "Как вежливо указать пожелания к подаркам",
      ogDescription:
        "Деликатные формулировки про подарки, деньги, цветы и wishlist для свадебного приглашения.",
      ogImage: giftsWishesImage,
    },
  },
];

export const getBlogPostBySlug = (slug?: string): BlogPost | undefined =>
  blogPosts.find((post) => post.slug === slug);
