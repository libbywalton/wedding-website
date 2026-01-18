"use client";
import Navigation from "../components/navigation";
import scheduleData from "../../../public/content/schedule.json";

export default function OurStoryPage() {
  const schedule = scheduleData;

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-b from-white to-sky-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold mb-4 text-center">
            Wedding Day Schedule
          </h1>
          <p className="text-xl text-gray-600 text-center mb-12">
            March 25th, 2027
          </p>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-6 md:left-1/2 top-0 bottom-0 md:w-1 transform md:-translate-x-1/2"
              style={{ backgroundColor: "var(--color-cornflower)" }}
            ></div>

            {/* Timeline items */}
            <div className="space-y-8 md:space-y-12">
              {schedule.map((item, index) => (
                <div
                  key={index}
                  className={`relative flex items-start ${
                    index % 2 === 0
                      ? "md:flex-row md:items-center"
                      : "md:flex-row-reverse md:items-center"
                  } flex-row md:gap-8`}
                >
                  {/* Time badge */}
                  <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-12 h-12 md:w-16 md:h-16 bg-sky-500 rounded-full flex items-center justify-center text-xl md:text-2xl z-10 shadow-lg flex-shrink-0">
                    {item.icon}
                  </div>

                  {/* Content card */}
                  <div
                    className={`ml-16 md:ml-0 md:w-5/12 w-full ${
                      index % 2 === 0 ? "md:text-right md:pr-16" : "md:pl-16"
                    }`}
                  >
                    <div
                      className="bg-white p-4 md:p-6 rounded-lg border-2"
                      style={{ borderColor: "var(--color-cornflower)" }}
                    >
                      <div
                        className="font-bold text-base md:text-lg mb-2"
                        style={{ color: "var(--color-cornflower)" }}
                      >
                        {item.time}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block md:w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
