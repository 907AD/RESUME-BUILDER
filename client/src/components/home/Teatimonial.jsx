import React from 'react'

const cardsData = [
  {
    image:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200',
    name: 'Briar Martin',
    handle: '@neilstellar',
    date: 'April 20, 2025',
    review:
      'Radiant made undercutting all of our competitors an absolute breeze.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
    name: 'Avery Johnson',
    handle: '@averywrites',
    date: 'May 10, 2025',
    review:
      'The process was incredibly simple and helped us save a huge amount of time.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60',
    name: 'Jordan Lee',
    handle: '@jordantalks',
    date: 'June 5, 2025',
    review:
      'A fantastic experience from start to finish. I would definitely recommend it.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60',
    name: 'Sarah Williams',
    handle: '@sarahdesigns',
    date: 'June 18, 2025',
    review:
      'Everything felt smooth and professional. The results were better than expected.',
  },
]

const TestimonialCard = ({ card }) => {
  return (
    <div className="mx-4 w-72 shrink-0 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* User Info */}
      <div className="flex gap-2">
        <img
          className="size-11 rounded-full object-cover"
          src={card.image}
          alt={card.name}
        />

        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <p className="font-semibold text-slate-900">
              {card.name}
            </p>

            {/* Green Verified Icon */}
            <svg
              className="size-3"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.555.72a4 4 0 0 1-.297.24c-.179.12-.38.202-.59.244a4 4 0 0 1-.38.041c-.48.039-.721.058-.922.129a1.63 1.63 0 0 0-.992.992c-.071.2-.09.441-.129.922a4 4 0 0 1-.041.38 1.6 1.6 0 0 1-.245.59 3 3 0 0 1-.239.297c-.313.368-.47.551-.56.743-.213.444-.213.96 0 1.404.09.192.247.375.56.743.125.146.187.219.24.297.12.179.202.38.244.59.018.093.026.189.041.38.039.48.058.721.129.922.163.464.528.829.992.992.2.071.441.09.922.129.191.015.287.023.38.041.21.042.411.125.59.245.078.052.151.114.297.239.368.313.551.47.743.56.444.213.96.213 1.404 0 .192-.09.375-.247.743-.56.146-.125.219-.187.297-.24.179-.12.38-.202.59-.244a4 4 0 0 1 .38-.041c.48-.039.721-.058.922-.129.464-.163.829-.528.992-.992.071-.2.09-.441.129-.922a4 4 0 0 1 .041-.38c.042-.21.125-.411.245-.59.052-.078.114-.151.239-.297.313-.368.47-.551.56-.743.213-.444.213-.96 0-1.404-.09-.192-.247-.375-.56-.743a4 4 0 0 1-.24-.297 1.6 1.6 0 0 1-.244-.59 3 3 0 0 1-.041-.38c-.039-.48-.058-.721-.129-.922a1.63 1.63 0 0 0-.992-.992c-.2-.071-.441-.09-.922-.129a4 4 0 0 1-.38-.041 1.6 1.6 0 0 1-.59-.245A3 3 0 0 1 7.445.72C7.077.407 6.894.25 6.702.16a1.63 1.63 0 0 0-1.404 0c-.192.09-.375.247-.743.56m4.07 3.998a.488.488 0 0 0-.691-.69l-2.91 2.91-.958-.957a.488.488 0 0 0-.69.69l1.302 1.302c.19.191.5.191.69 0z"
                fill="#22C55E"
              />
            </svg>
          </div>

          <span className="text-xs text-slate-500">
            {card.handle}
          </span>
        </div>
      </div>

      {/* Review */}
      <p className="py-4 text-sm font-medium leading-6 text-gray-700">
        {card.review}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1">
          <span>Posted on</span>

          <a
            href="https://x.com"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-sky-500"
          >
            <svg
              width="11"
              height="10"
              viewBox="0 0 11 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m.027 0 4.247 5.516L0 10h.962l3.742-3.926L7.727 10H11L6.514 4.174 10.492 0H9.53L6.084 3.616 3.3 0zM1.44.688h1.504l6.64 8.624H8.082z"
                fill="currentColor"
              />
            </svg>
          </a>
        </div>

        <p>{card.date}</p>
      </div>
    </div>
  )
}

const Testimonial = () => {
  const duplicatedCards = [...cardsData, ...cardsData]

  return (
    <section className="w-full overflow-hidden py-16">

      {/* Header */}
      <div className="flex flex-col items-center px-4 text-center">

        {/* Badge */}
        <div className="flex w-fit items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-gray-500 shadow-sm">
          <div className="relative flex size-3.5 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-green-600" />
          </div>

          <span className="text-sm font-medium">
            Testimonial
          </span>
        </div>

        {/* Heading */}
        <h2 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-slate-800 sm:text-5xl">
          Don't just take our word for it
        </h2>

        {/* Description */}
        <p className="mt-4 max-w-2xl text-base font-medium leading-7 text-slate-500 sm:text-lg">
          Hear what our users say about us. We're always looking for ways to
          improve. If you have a positive experience with us, leave a review.
        </p>
      </div>

      {/* Marquee */}
      <div className="mt-12 space-y-2">

        {/* Row 1 */}
        <div className="relative mx-auto w-full max-w-6xl overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r' from-white to-transparent sm:w-28" />

          <div className="flex w-max min-w-[200%] animate-marquee py-5">
            {duplicatedCards.map((card, index) => (
              <TestimonialCard
                key={`row1-${index}`}
                card={card}
              />
            ))}
          </div>

          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l' from-white to-transparent sm:w-28" />
        </div>

        {/* Row 2 */}
        <div className="relative mx-auto w-full max-w-6xl overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r' from-white to-transparent sm:w-28" />

          <div className="flex w-max min-w-[200%] animate-marquee-reverse py-5">
            {duplicatedCards.map((card, index) => (
              <TestimonialCard
                key={`row2-${index}`}
                card={card}
              />
            ))}
          </div>

          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 'bg-gradient-to-l from-white to-transparent sm:w-28" />
        </div>

      </div>
    </section>
  )
}

export default Testimonial
