import Head from 'next/head';
import Link from 'next/link';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const home = useSWR('/api/page/sample-page', fetcher);
  const recent = useSWR('/api/post/recent', fetcher);

  if (home.error) return <div>error...</div>;
  if (!home.data) return <div>loading...</div>;

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>{home.data.page.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: home.data.page.content }}></div>
        {recent.data?.posts.edges.map(({ node }) => (
          <div key={node.slug}>
            <h3>{node.title}</h3>
            <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            <Link href={`post/${node.slug}`}>
              <a>Read More</a>
            </Link>
          </div>
        ))}
      </main>
    </div>
  );
}
