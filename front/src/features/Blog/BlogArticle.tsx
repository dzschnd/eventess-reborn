import type { FC, ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { PageLayout } from "../../layouts/PageLayout";
import PageNotFound from "../PageNotFound/PageNotFound";
import { BlogSeo } from "./BlogSeo";
import { getBlogPostBySlug } from "./blogPosts";

const Section: FC<{ title: string; children: ReactNode }> = ({
  title,
  children,
}) => (
  <section className="flex flex-col gap-4">
    <h2 className="font-primary text-500 font-semibold leading-[1.25] text-[#1f1f1f] md:text-600">
      {title}
    </h2>
    {children}
  </section>
);

const Paragraph: FC<{ children: ReactNode }> = ({ children }) => (
  <p className="text-300 leading-[1.7] text-[#3f3f3f] md:text-400">
    {children}
  </p>
);

const List: FC<{ children: ReactNode }> = ({ children }) => (
  <ul className="ml-5 flex list-disc flex-col gap-2 text-300 leading-[1.7] text-[#3f3f3f] md:text-400">
    {children}
  </ul>
);

const Quote: FC<{ children: ReactNode }> = ({ children }) => (
  <p className="border-l border-[#d5d5d5] py-1 pl-5 text-300 font-normal leading-[1.65] text-[#3f3f3f] md:text-400">
    {children}
  </p>
);

export const BlogArticle: FC = () => {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug);

  if (!post) return <PageNotFound />;

  return (
    <PageLayout className="bg-white px-4 pb-[160px] pt-[96px] md:pt-[120px]">
      <BlogSeo
        title={post.seo.title}
        description={post.seo.description}
        ogTitle={post.seo.ogTitle}
        ogDescription={post.seo.ogDescription}
        ogImage={post.seo.ogImage}
      />

      <article className="flex w-full max-w-[980px] flex-col bg-white">
        <Link
          to="/blog"
          className="mb-10 text-200 font-semibold uppercase leading-[1] tracking-[0.08em] text-[#777777] hover:text-[#1f1f1f]"
        >
          Назад в блог
        </Link>

        <header className="mx-auto flex max-w-[680px] flex-col items-center gap-5 text-center">
          <span className="text-200 font-semibold uppercase leading-[1] tracking-[0.12em] text-[#777777]">
            {post.category}
          </span>
          <h1 className="font-primary text-700 font-semibold leading-[1.12] text-[#111111] sm:text-800 md:text-900">
            {post.title}
          </h1>
          <p className="max-w-[520px] text-300 leading-[1.5] text-[#555555] md:text-400">
            {post.excerpt}
          </p>
        </header>

        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="mt-10 h-[260px] w-full rounded-[4px] object-cover sm:h-[360px] md:h-[420px]"
          />
        ) : (
          <div className="mt-10 flex h-[260px] w-full items-center justify-center rounded-[4px] bg-[#f3f3f3] sm:h-[360px] md:h-[420px]">
            <span className="max-w-[220px] text-center text-300 font-semibold uppercase leading-[1.2] tracking-[0.08em] text-[#777777]">
              Изображение скоро появится
            </span>
          </div>
        )}

        <div className="mx-auto mt-10 flex max-w-[680px] flex-col gap-8 md:mt-12">
          <Paragraph>
            Пожелания к подаркам — один из самых деликатных пунктов в
            свадебном приглашении. С одной стороны, гостям действительно важно
            понимать, что будет уместно подарить. С другой — формулировка не
            должна звучать как требование или список обязательств.
          </Paragraph>
          <Paragraph>
            Хорошая новость: написать об этом можно очень мягко. Главное — не
            давить на гостей, а объяснить пожелание через заботу, удобство и
            благодарность.
          </Paragraph>

          <Section title="Почему о подарках можно писать прямо">
            <Paragraph>
              Многие пары стесняются указывать пожелания к подаркам, особенно
              если речь идёт о деньгах. Но для гостей такая информация часто не
              выглядит грубой — наоборот, она помогает избежать неловкости.
            </Paragraph>
            <Paragraph>
              Без подсказки гости могут долго сомневаться: дарить конверт,
              технику, сертификат, посуду или что-то символическое. А если пара
              заранее аккуратно обозначает свои пожелания, это снимает лишние
              вопросы.
            </Paragraph>
            <Paragraph>
              Главное правило — не писать в приказном тоне. Лучше использовать
              мягкие формулировки: “будем благодарны”, “если вы захотите
              сделать подарок”, “нам будет особенно приятно”.
            </Paragraph>
          </Section>

          <Section title="Где разместить пожелания к подаркам">
            <Paragraph>
              Лучше всего выделить для этого отдельный небольшой блок в
              приглашении. Его можно назвать:
            </Paragraph>
            <List>
              <li>Пожелания</li>
              <li>О подарках</li>
              <li>Маленькая просьба</li>
              <li>Для вашего удобства</li>
            </List>
            <Paragraph>
              Такой блок не должен быть слишком длинным. Достаточно 2–4
              предложений. Гости быстро поймут мысль, а приглашение останется
              лёгким и красивым.
            </Paragraph>
            <Quote>
              “Ваше присутствие в этот день — уже самый ценный подарок для нас.
              Если вы захотите порадовать нас чем-то ещё, мы будем благодарны за
              вклад в нашу общую мечту.”
            </Quote>
            <Paragraph>
              Эта формулировка звучит мягко, но при этом понятно намекает на
              денежный подарок.
            </Paragraph>
          </Section>

          <Section title="Как попросить деньги вместо подарков">
            <Paragraph>
              Денежный подарок — распространённая и практичная просьба, но её
              лучше не писать слишком прямо. Фраза “дарите деньги” может
              звучать резко, даже если гости сами планировали подарить конверт.
            </Paragraph>
            <Paragraph>Лучше заменить её на более тёплые варианты:</Paragraph>
            <Quote>
              “Мы будем рады подарку в конверте, который поможет нам
              осуществить наши первые семейные планы.”
            </Quote>
            <Quote>
              “Если вы захотите сделать нам подарок, будем благодарны за вклад
              в наше будущее.”
            </Quote>
            <Quote>
              “Мы не составляем список подарков, но будем очень признательны за
              помощь в исполнении нашей общей мечты.”
            </Quote>
            <Paragraph>
              Такие фразы звучат не как требование, а как деликатное пожелание.
            </Paragraph>
          </Section>

          <Section title="Если вы не хотите цветы">
            <Paragraph>
              Часто пары отдельно просят не дарить цветы: букеты быстро вянут,
              их сложно перевозить, а после свадьбы их может оказаться слишком
              много. Это тоже можно написать вежливо.
            </Paragraph>
            <Quote>
              “Пожалуйста, не беспокойтесь о цветах. Вместо букета мы будем
              рады бутылочке вина, книге или небольшому вкладу в
              благотворительный фонд.”
            </Quote>
            <Quote>
              “Мы очень любим живые цветы, но в день свадьбы не сможем уделить
              им должного внимания. Если вы хотите сделать приятный жест, будем
              рады символическому подарку вместо букета.”
            </Quote>
            <Quote>
              “Будем благодарны, если вместо цветов вы подарите нам что-то, что
              останется с нами чуть дольше.”
            </Quote>
            <Paragraph>
              Важно не звучать так, будто цветы — плохой подарок. Лучше
              объяснить причину и предложить альтернативу.
            </Paragraph>
          </Section>

          <Section title="Если у вас есть список подарков">
            <Paragraph>
              Список желаний — удобный вариант для гостей, особенно если пара
              переезжает, обустраивает дом или точно знает, какие вещи ей нужны.
            </Paragraph>
            <Paragraph>В приглашении можно написать:</Paragraph>
            <Quote>
              “Чтобы вам было проще выбрать подарок, мы подготовили небольшой
              список пожеланий.”
            </Quote>
            <Quote>
              “Мы собрали несколько идей подарков, которые точно будут нам
              полезны. Вы можете выбрать любой вариант из списка.”
            </Quote>
            <Quote>
              “Для удобства мы оставили wishlist — он поможет избежать повторов
              и лишних сомнений.”
            </Quote>
            <Paragraph>
              Если список находится по ссылке, лучше добавить его в отдельную
              кнопку: “Посмотреть список подарков”.
            </Paragraph>
          </Section>

          <Section title="Чего лучше избегать">
            <Paragraph>
              Даже если вы хотите быть честными, некоторые формулировки могут
              звучать слишком резко.
            </Paragraph>
            <Paragraph>Лучше не писать:</Paragraph>
            <List>
              <li>“Цветы не дарить.”</li>
              <li>“Подарки только деньгами.”</li>
              <li>“Нам не нужна посуда, техника и сувениры.”</li>
              <li>“Минимальная сумма подарка…”</li>
              <li>“Просим дарить только то, что указано в списке.”</li>
            </List>
            <Paragraph>
              Такие фразы могут создать ощущение, что гость обязан
              соответствовать ожиданиям. Вместо этого лучше говорить через
              благодарность и заботу.
            </Paragraph>
            <Paragraph>
              Например, вместо “подарки только деньгами” можно написать:
            </Paragraph>
            <Quote>
              “Если вы планировали сделать подарок, мы будем особенно
              благодарны за вклад в наши семейные планы.”
            </Quote>
          </Section>

          <Section title="Готовые формулировки для приглашения">
            <Paragraph>
              Вот несколько универсальных вариантов, которые можно использовать
              в свадебном приглашении.
            </Paragraph>
            <Paragraph>Нейтрально и мягко:</Paragraph>
            <Quote>
              “Ваше присутствие на нашем празднике — самый важный подарок. Если
              вы захотите порадовать нас чем-то ещё, будем благодарны за вклад в
              нашу общую мечту.”
            </Quote>
            <Paragraph>Про деньги:</Paragraph>
            <Quote>
              “Мы будем рады подарку в конверте — он поможет нам осуществить
              первые семейные планы.”
            </Quote>
            <Paragraph>Про отсутствие цветов:</Paragraph>
            <Quote>
              “Пожалуйста, не беспокойтесь о цветах. Вместо букета мы будем
              рады маленькому символическому подарку или вкладу в нашу мечту.”
            </Quote>
            <Paragraph>Про wishlist:</Paragraph>
            <Quote>
              “Чтобы вам было проще выбрать подарок, мы подготовили небольшой
              список пожеланий. Будем рады любому варианту из него.”
            </Quote>
            <Paragraph>Очень коротко:</Paragraph>
            <Quote>
              “Подарок в конверте будет для нас самым удобным и желанным
              вариантом.”
            </Quote>
          </Section>

          <Section title="Главное — тон">
            <Paragraph>
              Пожелания к подаркам не должны звучать как инструкция. Это скорее
              мягкая подсказка для гостей. Чем теплее и спокойнее формулировка,
              тем естественнее она воспринимается.
            </Paragraph>
            <Paragraph>
              Идеальный текст показывает три вещи: вы цените присутствие
              гостей, вы не требуете подарков, но при этом деликатно
              объясняете, какой вариант будет для вас самым удобным.
            </Paragraph>
            <Paragraph>
              Так приглашение останется красивым, уважительным и по-настоящему
              заботливым.
            </Paragraph>
          </Section>
        </div>
      </article>
    </PageLayout>
  );
};
