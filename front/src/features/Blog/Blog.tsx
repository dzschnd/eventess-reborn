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

      <section className="flex w-full max-w-[1146px] flex-col gap-10 md:gap-[60px]">
        <div className="flex max-w-[760px] flex-col gap-4">
          <span className="text-300 font-semibold uppercase leading-[1] text-primary">
            Блог
          </span>
          <h1 className="font-primary-condensed text-700 font-bold uppercase leading-[1.05] tracking-[-0.03em] text-primary sm:text-900 md:text-950">
            Свадебные советы и вдохновение
          </h1>
          <p className="text-300 leading-[1.4] text-primary md:text-400">
            Идеи для приглашений, деликатные формулировки и маленькие детали,
            которые делают подготовку спокойнее.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group flex min-h-full flex-col overflow-hidden rounded-20 border border-primary-100 bg-white transition-shadow duration-200 hover:shadow-header"
            >
              {post.image ? (
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-[220px] w-full object-cover sm:h-[260px]"
                />
              ) : (
                <div className="flex h-[220px] w-full items-center justify-center bg-primary-50 sm:h-[260px]">
                  <span className="max-w-[160px] text-center text-300 font-semibold uppercase leading-[1.2] text-primary-100">
                    Изображение скоро появится
                  </span>
                </div>
              )}

              <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="rounded-42 border border-primary-100 px-4 py-2 text-200 font-semibold leading-[1] text-primary">
                    {post.category}
                  </span>
                  <span className="text-200 font-semibold leading-[1] text-grey-300">
                    {post.date}
                  </span>
                </div>

                <h2 className="font-primary-condensed text-600 font-bold uppercase leading-[1.1] tracking-[-0.03em] text-primary md:text-700">
                  {post.title}
                </h2>
                <p className="text-300 leading-[1.4] text-grey-500">
                  {post.excerpt}
                </p>
                <span className="mt-auto pt-2 text-300 font-semibold uppercase leading-[1] text-primary group-hover:text-primary-700">
                  Читать статью
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </PageLayout>
  );
};
