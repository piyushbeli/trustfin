import React from 'react';
/**
 * Dreams section with branded tagline
 * Displays inspirational message before the footer
 */
const DreamsSection = (): React.ReactNode => {
  return (
    <section className="bg-white py-4 sm:py-10 md:py-12 px-4">
      <div
        className="max-w-7xl mx-auto text-left md:px-4"
      >
        {/* Main Headline */}
        {/* <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light italic text-gray-400 leading-tight">
          For dreams that
          <br />
          don&apos;t wait !
        </h2> */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-semibold text-gray-100 leading-tight">
  For dreams that don&apos;t wait !
</h2>

        {/* Tagline */}
        <p className="text-sm sm:text-base text-gray-500 mt-6">
          Made with 💜 in India.
        </p>
      </div>
    </section>
  );
};

export default DreamsSection;
