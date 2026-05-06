import type { FC } from "react";
import { Link } from "react-router-dom";
import { PageLayout } from "../../layouts/PageLayout";
import { blogPosts } from "./blogPosts";
import { BlogSeo } from "./BlogSeo";

type BlogProps = Record<string, never>;

export const Blog: FC<BlogProps> = (_props) => {
  return (
    <PageLayout className={"px-4 pb-[160px] pt-[96px] md:pt-[120px]"}>
      <BlogSeo
        title="Блог | Eventess"
        description="Полезные статьи, вдохновение для свадебных приглашений и советы по организации праздника."
        ogImage="/logo512.png"
      />

      <section className="flex w-full max-w-[1146px] flex-col items-center gap-10 md:gap-[56px]">
        <div className="flex max-w-[620px] flex-col items-center gap-3 text-center">
          <h1 className="font-primary text-700 font-semibold leading-[1.1] text-[#1f2937] sm:text-800 md:text-900">
            Статьи блога
          </h1>
          <p className="text-300 leading-[1.45] text-[#718096] md:text-400">
            Идеи для приглашений, деликатные формулировки и маленькие детали,
            которые делают подготовку спокойнее.
          </p>
        </div>

        <div className="grid w-full gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group flex min-h-full flex-col overflow-hidden rounded-[12px] bg-white shadow-[0_8px_24px_rgba(31,41,55,0.08)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(31,41,55,0.12)]"
            >
              {post.image ? (
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-[190px] w-full object-cover sm:h-[210px]"
                />
              ) : (
                <div className="flex h-[190px] w-full items-center justify-center bg-[#d7d8d2] sm:h-[210px]">
                  <span className="max-w-[150px] text-center text-200 font-semibold uppercase leading-[1.2] tracking-[0.08em] text-[#7b817f]">
                    Изображение скоро появится
                  </span>
                </div>
              )}

              <div className="flex flex-1 flex-col gap-3 px-5 pb-5 pt-4">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="text-200 font-semibold leading-[1] text-[#8a96a8]">
                    {post.date}
                  </span>
                  <span className="text-200 font-semibold leading-[1] text-[#8a96a8]">
                    {post.category}
                  </span>
                </div>

                <h2 className="font-primary text-400 font-bold leading-[1.2] text-[#263244] md:text-500">
                  {post.title}
                </h2>
                <p className="text-300 leading-[1.45] text-[#718096]">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </PageLayout>
  );
};
