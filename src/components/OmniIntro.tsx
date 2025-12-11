import { useEffect, useRef, useState, createContext, useContext } from "react";
import type { ReactNode } from "react";

type OmniIntroContextType = {
  playIntro: () => void;
};

const OmniIntroContext = createContext<OmniIntroContextType | undefined>(undefined);

export const useOmniIntro = () => {
  const context = useContext(OmniIntroContext);
  if (!context) {
    throw new Error("useOmniIntro must be used within an OmniIntro provider");
  }
  return context;
};

type OmniIntroProps = {
  children: ReactNode;
  durationMs?: number;
};

export const OmniIntro = ({
  children,
  durationMs = 3800
}: OmniIntroProps) => {
  const textRef = useRef<SVGTextElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const playIntro = () => {
    setPlaying(true);
  };

  useEffect(() => {
    if (!playing) return;

    const text = textRef.current;
    if (!text) return;

    const length = text.getComputedTextLength();
    const totalLength = length * 1.05;

    text.style.strokeDasharray = `${totalLength}`;
    text.style.strokeDashoffset = `${totalLength}`;

    const animation = text.animate(
      [
        { strokeDashoffset: totalLength },
        { strokeDashoffset: 0 }
      ],
      {
        duration: 3000,
        easing: "ease-out",
        fill: "forwards"
      }
    );

    animation.onfinish = () => {
      text.classList.add("omni-filled");
    };

    const timer = window.setTimeout(() => {
      setPlaying(false);
    }, durationMs);

    return () => {
      animation.cancel();
      window.clearTimeout(timer);
    };
  }, [playing, durationMs]);

  return (
    <OmniIntroContext.Provider value={{ playIntro }}>
      {playing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-100">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 800 400"
            className="w-full max-w-4xl h-auto"
            preserveAspectRatio="xMidYMid meet"
          >
            <text
              id="svgOMNI"
              ref={textRef}
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="omni-text"
            >
              OMNI
            </text>
          </svg>
        </div>
      )}
      {children}
    </OmniIntroContext.Provider>
  );
};
