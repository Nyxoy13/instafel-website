"use client";

import { Header, Footer, LoadingBar } from "@/components/ifl";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AuthorComponent } from "@/components/AuthorComponent"; // Importing AuthorComponent

export default function Backup() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const requestUrl = `https://raw.githubusercontent.com/instafel/backups/refs/heads/main/${id}/manifest.json`;
      const res = await fetch(requestUrl);
      const result = await res.json();
      setData(result.manifest);
    };
    fetchData();
  }, [id]);

  const handleDownload = async (id, version) => {
    const response = await fetch(`https://raw.githubusercontent.com/instafel/backups/refs/heads/main/${id}/backup.json`);

    if (!response.ok) {
      console.error("Failed to fetch the file");
      return;
    }

    const jsonData = await response.json();
    const fileName = `${id}_v${version}.json`;

    const file = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header />
      <main>
        {data ? (
          <div className="w-full max-w-6xl mx-auto px-4 py-8 md:px-6 md:py-12">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">{data.name}</h1>
              <div className="flex items-center gap-2" />
            </div>
            <div className="grid gap-6">
              <div>
                <h2 className="text-lg font-semibold mb-2">Yedekleme Hakkında</h2>
                <p className="text-sm text-muted-foreground">{data.description}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Yedekleme Ayrıntıları</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Proje Sahibi</p>
                    <AuthorComponent
                      authorName={data.author}
                      showAuthorSocials={data.optional.show_author_socials}
                      authorData={data.optional_values.author_socials}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Son Güncelleme</p>
                    <p className="text-sm text-muted-foreground">
                      Güncellendi v{data.backup_version} Tarih {data.last_updated}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Değişiklik Günlüğü</h2>
                <div className="grid gap-2">
                  <p dangerouslySetInnerHTML={{ __html: data.changelog.replace(/\n/g, "<br />") }} />
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <Button onClick={() => handleDownload(id, data.backup_version)} size="lg">
                  Yedeklemeyi İndir
                </Button>
                <Button variant="outline" size="lg">
                  Instaflax'da Aç
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <LoadingBar />
        )}
      </main>
      {data ? <Footer /> : <div />}
    </div>
  );
}
