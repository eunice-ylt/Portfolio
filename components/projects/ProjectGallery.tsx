export function ProjectGallery({ images, title }: { images: string[]; title: string }) {
  if (!images.length) return null;
  return <div className="mt-14 grid gap-5 md:grid-cols-2">{images.map((image, index) => <img className="aspect-[4/3] w-full rounded-lg border border-[#1f3b2f]/10 object-cover" src={image} alt={`${title} - ${index + 1}`} key={image} />)}</div>;
}
