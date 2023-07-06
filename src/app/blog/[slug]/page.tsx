export default function BlogPost({ params }: { params: { slug: string } }) {
  return <div>{params.slug}</div>;
}
