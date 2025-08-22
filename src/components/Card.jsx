import { useEffect, useState } from "react";

const Card = () => {
  const [quote, setQuote] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchquote = async () => {
    setIsLoading(true);
    const response = await fetch("https://api.adviceslip.com/advice");
    const data = await response.json();
    setQuote(data.slip);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchquote();
  }, []);

  return (
    <div className="bg-[hsl(217,19%,28%)] flex flex-col items-center w-90 h-80 rounded-lg shadow-lg relative font-manrope">
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-10 pb-16">
        {isLoading ? (
             <div className="text-white text-2xl text-center animate-pulse">
              Rolling the dice for wisdom...
            </div>
        ) : (
          <>
            <p className="text-xs text-[hsl(150,100%,66%)] animate-fade-in mb-6">{`A D V I C E\u00A0\u00A0#\u00A0\u00A0${quote.id.toString().split('').join('\u00A0\u00A0')}`}</p>
            <p className="text-white text-2xl font-extrabold text-center font-w animate-fade-in flex-1 flex items-center">{`"${quote.advice}"`}</p>
          </>
        )}
      </div>
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
        <img
          src="./src/assets/images/pattern-divider-desktop.svg"
          alt="pattern-divider"
        />
      </div>
      <button
        className={`bg-[hsl(150,100%,66%)] rounded-full p-4 transition-all duration-300 hover:shadow-[0_0_20px_hsl(150,100%,66%)] absolute -bottom-6 left-1/2 transform -translate-x-1/2 ${isLoading ? 'shadow-[0_0_20px_hsl(150,100%,66%)]' : ''}`}
        onClick={() => fetchquote()}
      >
        <img
          src="./src/assets/images/icon-dice.svg"
          alt="dice icon"
          className={isLoading ? "animate-spin" : ""}
        />
      </button>
    </div>
  );
};

export default Card;
