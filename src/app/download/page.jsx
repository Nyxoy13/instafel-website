"use client";

import { Header, Footer } from "@/components/ifl"
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

export default function Download() {
  const searchParams = useSearchParams();
  const version = searchParams.get('version');

  const [data, setData] = useState(null);
  useEffect(() => {
    if (version != null) {
      if (version != 'latest') {
        setData(version)
      } else {
        const fetchData = async () => {
          const res = await fetch('https://api.github.com/repos/mamiiblt/instafel_release_arm64-v8a/releases/latest');
          const result = await res.json();
          setData(result.tag_name);
        };
        fetchData();
      }
    } else {
      setData(0);
    }
  }, []);


  return (
    <Suspense fallback={<a>Loading...</a>}>
<div className="flex flex-col min-h-[100dvh]">
      <Header></Header>
      <main className="flex-1">
      <div className="flex flex-col md:flex-row gap-8 md:gap-16 w-full max-w-6xl mx-auto py-12 md:py-24 px-4 md:px-6">
      <div className="flex-1 bg-primary rounded-lg p-6 md:p-8 lg:p-10 text-primary-foreground">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">64-bit</h2>
          <p className="text-lg md:text-xl">
          The arm64-v8a architecture is supported by Instagram on devices running Android 9 and above. This ensures that users with newer Android devices can take advantage of improved performance and efficiency.          </p>
          <Link
                              href={{
                                pathname: '/download_instafel',
                                query: { 
                                  version: data,
                                  arch: "arm32" 
                                },
                              }}
            className="w-full inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground px-6 text-sm font-medium text-primary shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            Download {data ? data : <p> ...</p>}
          </Link>
          <Link
            href="https://github.com/mamiiblt/instafel_release_arm64-v8a/tags"
            className="w-full inline-flex h-10 items-center justify-center rounded-md bg-secondary-foreground px-6 text-sm font-medium text-primary shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            Download Older Builds
          </Link>
        </div>
        
      </div>
      <div className="flex-1 bg-muted rounded-lg p-4 md:p-6 lg:p-8 text-muted-foreground">
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold">32-bit</h2>
          <p className="text-base md:text-lg">
          Instagram supports 32-bit architecture on devices running versions below Android 9. This compatibility allows users with older Android devices to access and use Instagram without any problems.          </p>
          <Link
                  href={{
                    pathname: '/download_instafel',
                    query: { 
                      version: data,
                      arch: "arm32" 
                    },
                  }}
            className="w-full inline-flex h-10 items-center justify-center rounded-md bg-muted-foreground px-6 text-sm font-medium text-muted shadow transition-colors hover:bg-muted/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            Download {data ? data : <p> ...</p>}
            </Link>
            <Link
            href="https://github.com/mamiiblt/instafel_release_armeabi-v7a/tags"
            className="w-full inline-flex h-10 items-center justify-center rounded-md bg-secondary-foreground px-6 text-sm font-medium text-primary shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            Download Older Builds
          </Link> 
        </div>
      </div>
    </div>
      </main>
      <Footer></Footer>
    </div>
    </Suspense>
  );
}