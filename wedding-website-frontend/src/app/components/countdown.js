import { useState, useEffect } from "react";

export default function WeddingCountdown() {
  const [remainingTime, setRemainingTime] = useState({
    days: 0,
    hours: 0,
    seconds: 0,
  });

  useEffect(() => {
    const weddingDate = new Date("2027-03-25T00:00:00").getTime();

    const updateCounter = () => {
      const currentTime = Date.now();
      const timeDifference = weddingDate - currentTime;

      if (timeDifference > 0) {
        const daysRemaining = Math.floor(
          timeDifference / (24 * 60 * 60 * 1000),
        );
        const hoursRemaining = Math.floor(
          (timeDifference % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000),
        );
        const secondsRemaining = Math.floor(
          (timeDifference % (60 * 1000)) / 1000,
        );

        setRemainingTime({
          days: daysRemaining,
          hours: hoursRemaining,
          seconds: secondsRemaining,
        });
      } else {
        setRemainingTime({ days: 0, hours: 0, seconds: 0 });
      }
    };

    updateCounter();
    const intervalId = setInterval(updateCounter, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <div>
        <span className="text-4xl">{remainingTime.days} Days </span>
        <span className="text-4xl">{remainingTime.hours} Hours </span>
        <span className="text-4xl">{remainingTime.seconds} Seconds</span>
      </div>
    </div>
  );
}
