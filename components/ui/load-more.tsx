"use client";

import { useEffect, useRef } from "react";

export default function LoadMore({
  children,
  onNeedMore,
}: {
  children: React.ReactNode;
  onNeedMore: () => void;
}) {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onNeedMore?.();
          console.log("load more");
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px 100% 0px" }
    );
    observer.observe(loadMoreRef.current!);
    return () => observer.disconnect();
  }, [onNeedMore]);

  return (
    <>
      {children}
      <div ref={loadMoreRef} className="min-w-full min-h-2 bg-blue-700">
        Load More
      </div>
    </>
  );
}
