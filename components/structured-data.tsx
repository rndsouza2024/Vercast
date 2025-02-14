import Head from 'next/head';

export default function StructuredData({ video }) {
  if (!video) return null;

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": video.name,
    "description": video.description || "No description available",
    "thumbnailUrl": video.thumbnail || "",
    "uploadDate": video.uploadDate || "",
    "duration": video.duration || "",
    "contentUrl": `https://short.icu/${video.slug}`,
  });

  return (
    <Head>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
    </Head>
  );
}
