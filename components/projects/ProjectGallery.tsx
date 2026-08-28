import Image from 'next/image';

export function ProjectGallery({ images, title }: { images: string[]; title: string }) {
  if (!images.length) return null;
  return (
    <div className="mt-20 space-y-8">
      {images.map((image, index) => (
        <figure className={`relative overflow-hidden bg-[var(--mist)] ${index % 3 === 1 ? 'ml-auto aspect-[4/3] w-full md:w-[78%]' : 'aspect-[16/10] w-full'}`} key={image}>
          <Image unoptimized fill sizes={index % 3 === 1 ? '(max-width: 767px) 100vw, 65vw' : '100vw'} className="object-cover" src={image} alt={`${title} - ${index + 1}`} />
        </figure>
      ))}
    </div>
  );
}
