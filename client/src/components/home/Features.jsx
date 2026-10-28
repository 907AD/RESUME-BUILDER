import React from 'react'

const Features = () => {
  return (
    <div className="max-md:px-4">

      {/* Badge */}
      <div className="flex justify-center">
        <div
          className="
            flex items-center gap-2
            w-fit
            rounded-full
            border border-indigo-200
            bg-blue-400/10
            px-4 py-1
            text-sm text-blue-800
            opacity-0
            animate-[fadeInUp_0.6s_ease-out_forwards]
          "
        >
          <svg
            width="13"
            height="14"
            viewBox="0 0 13 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.613 8.2a.62.62 0 0 1-.553-.341.59.59 0 0 1 .076-.637l6.048-6.118a.31.31 0 0 1 .375-.069c.061.033.11.084.137.147a.3.3 0 0 1 .014.197L6.537 4.991a.59.59 0 0 0 .07.552.61.61 0 0 0 .504.257h4.276a.62.62 0 0 1 .553.341.59.59 0 0 1-.076.637l-6.048 6.119a.31.31 0 0 1-.375.067.295.295 0 0 1-.15-.344l1.172-3.61a.59.59 0 0 0-.07-.553.61.61 0 0 0-.504-.257z"
              stroke="#1E4BAF"
              strokeMiterlimit="5.759"
              strokeLinecap="round"
            />
          </svg>

          <span>Responded to 99% applicants</span>
        </div>
      </div>

      {/* Text Section */}
      <div className="mt-5 flex flex-col items-center text-center">

        {/* Heading */}
        <p
          className="
            max-w-2xl
            bg-gradient-to from-green-600 to-[#4D6EA3]
            bg-clip-text
            text-3xl
            font-semibold
            leading-tight
            text-transparent
            opacity-0
            animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]
          "
        >
          Trusted by world’s leading companies.
        </p>

        {/* Description */}
        <p
          className="
      mt-5
      max-w-2xl
      text-lg
      font-medium
      leading-8
      text-slate-600
      sm:text-xl
      opacity-0
      animate-[fadeInUp_0.8s_ease-out_0.35s_forwards]
    "
        >
          Our streamlined process helps you create a professional resume in
          minutes with intelligent AI-powered tools and features.
        </p>

      </div>

      {/* Images */}
      <div className="mt-8 flex max-h-450px flex-col-reverse items-center justify-center gap-6 md:flex-row">

        <img
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/image-7.svg"
          alt="features showcase"
          className="
            opacity-0
            animate-[fadeInLeft_0.8s_ease-out_0.5s_forwards]
            transition-all
            duration-300
            hover:-translate-y-1
          "
        />

        <img
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/image-8.svg"
          alt="features showcase"
          className="
            max-md:w-full
            opacity-0
            animate-[fadeInRight_0.8s_ease-out_0.7s_forwards]
            transition-all
            duration-300
            hover:-translate-y-1
          "
        />

      </div>
    </div>
  )
}

export default Features
