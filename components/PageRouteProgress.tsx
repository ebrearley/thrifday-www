import { useRouter } from "next/router"
import react, { useEffect, useState } from "react"
import { useNProgress } from '@tanem/react-nprogress'

export const PageRouteProgress = () => {
  const router = useRouter()

  const [isRouteChanging, setIsRouteChangeing] = useState(false);
  const [loadingKey, setLoadingKey] = useState(0);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsRouteChangeing(true);
      setLoadingKey(loadingKey ^ 1);
    };

    const handleRouteChangeEnd = () => {
      setIsRouteChangeing(false);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeEnd)
    router.events.on('routeChangeError', handleRouteChangeEnd)

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
      router.events.off('routeChangeComplete', handleRouteChangeEnd)
      router.events.off('routeChangeError', handleRouteChangeEnd)
    }
  }, [router.events])

  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating: isRouteChanging,
  })

  return (
    <>
      <style jsx>{`
        .container {
          opacity: ${isFinished ? 0 : 1};
          pointerevents: none;
          transition: opacity ${animationDuration}ms linear;
        }

        .bar {
          background: var(--chakra-colors-teal-300);
          height: 2px;
          left: 0;
          margin-left: ${(-1 + progress) * 100}%;
          position: fixed;
          top: 0;
          transition: margin-left ${animationDuration}ms linear;
          width: 100%;
          z-index: 1031;
        }

        .spinner {
          box-shadow: 0 0 10px var(--chakra-colors-teal-300), 0 0 5px var(--chakra-colors-teal-300);
          display: block;
          height: 100%;
          opacity: 1;
          position: absolute;
          right: 0;
          transform: rotate(3deg) translate(0px, -4px);
          width: 100px;
        }
      `}</style>
      <div className="container">
        <div className="bar">
          <div className="spinner" />
        </div>
      </div>
    </>
  );
}
