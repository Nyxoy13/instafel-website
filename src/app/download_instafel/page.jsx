"use client";

import { Header, Footer, LoadingBar } from "@/components/ifl"
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Suspense } from "react";
import { requestFormReset } from "react-dom";
import {Skeleton} from "@nextui-org/skeleton";

export default function Download() {
  const searchParams = useSearchParams();
  const version = searchParams.get('version');
  const arch = searchParams.get('arch')


  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      var requestUrl = 'https://api.github.com/repos/mamiiblt/instafel_release_';
      if (arch == "arm64") {
        requestUrl = requestUrl + 'arm64-v8a/releases/tags/' + version
      } else {
        requestUrl = requestUrl + 'armeabi-v7a/releases/tags/' + version
      }
      const res = await fetch(requestUrl);
      const result = await res.json();

      var values = {
        build_date: null,
        gen_id: null,
        app: {
          arch: null,
          ifl_version: null,
          version_name: null,
          version_code: null,
        },
        hash: {
          uc: null,
          c: null
        },
        download_urls: {
          unclone: null,
          clone: null
        },
        changelogs: null
      }

      if (result.status != "Not Found") {
        const releaseBody = result.body.split("\n");
        let changeLogs = [];

        releaseBody.forEach(line => {
          if (!line.startsWith("|") && line != "" && line != "# Changelog") {
            changeLogs.push(line.trim().substring(2));
          } else {
            const lineParts = line.split("|");
            /*lineParts.forEach(part => {
              
            });*/
            for (let i = 0; i < lineParts.length; i++) {
              var part = lineParts[i].trim();
              if (
                !part.includes("PROPERTY") &&
                !part.includes("VALUE") &&
                !part.includes("Changelog") &&
                !part.includes("-------------") &&
                !part.length != 1
              ) {
                var nextValue = lineParts[i + 1].trim();
                switch (part) {
                  case "build_date":
                    values.build_date = nextValue
                    break;
                  case "gen_id":
                    values.gen_id = nextValue;
                    break;
                  case "app.arch":
                    values.app.arch = nextValue
                    break;
                  case "app.ifl_version":
                    values.app.ifl_version = nextValue
                    break;
                  case "app.version_name":
                    values.app.version_name = nextValue
                    break;
                  case "app.version_code":
                    values.app.version_code = nextValue
                    break;
                  case "hash.uc":
                    values.hash.uc = nextValue
                    break;
                  case "hash.c":
                    values.hash.c = nextValue
                    break;
                }
              }
            }
          }
        });

    result.assets.forEach(asset => {
      if (asset.name.includes("instafel_uc")) {
        values.download_urls.unclone = asset.browser_download_url;
      }

      if (asset.name.includes("instafel_c")) {
        values.download_urls.clone = asset.browser_download_url;
      }
    });
    values.changelogs = changeLogs;
    console.log(changeLogs)
    setData(values);
      } else {
        setData(null)
      }
    };
    fetchData();
  }, []);

  const download = (url) => {
    const link = document.createElement("a");
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="flex flex-col min-h-[100dvh]">
    <Header />
    <main>
      { data ? (<div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
    <div className="flex flex-col items-start space-y-6">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">indir v{data ? data.app.ifl_version : "..."} Instaflax</h1>
      <p className="text-muted-foreground text-lg leading-relaxed">
        Hem klonlama hem de klon Olamayan Çeşitleri için Instaflax'ın Alpha Sürümünü Edinin.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={() => download(data ? data.download_urls.unclone : null)} size="lg">indir klon olmayan</Button>
        <Button onClick={() => download(data ? data.download_urls.clone : null)} size="lg" variant="secondary">indir klon</Button>
      </div>
    </div>
    <div className="flex flex-col items-start space-y-6">
      <h2 className="text-2xl sm:text-3xl font-bold">Değişiklik Günlüğü</h2>
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <div className="font-medium">Eklendi {version}</div>
          <ul className="space-y-2 text-muted-foreground">
          {data ? (
                      data.changelogs.map((item, index) => (
                        <li key={index} className="flex items-center">
                          <CheckIcon className="w-4 h-4 mr-2 inline-block" />
                          {item}
                        </li>
                      ))
                    ) : (
                      <li>Loading...</li>
                    )}
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div className="mt-12 sm:mt-16 lg:mt-24">
    <h2 className="text-2xl sm:text-3xl font-bold mb-6">Yapı Bilgileri</h2>
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>Mimarisi</TableCell>
          <TableCell>{data ? data.app.arch : "..."}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Yapım Tarihi</TableCell>
          <TableCell>{data ? new Date(parseInt(data.build_date)).toLocaleString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', '') : "..."}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>IG Sürümü</TableCell>
          <TableCell>{data ? data.app.version_name : "..."}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>IG Ver-code</TableCell>
          <TableCell>{data ? data.app.version_code : "..."}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Iflax Sürümü</TableCell>
          <TableCell>{data ? data.app.ifl_version : "..."}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Oluşturma ID</TableCell>
          <TableCell>{data ? data.gen_id: "..."}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>MD5 Hash (UC)</TableCell>
          <TableCell>{data ? data.hash.uc : "..."}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>MD5 Hash (C)</TableCell>
          <TableCell>{data ? data.hash.c : "..."}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</div>) : (<LoadingBar />)}
  </main>
  { data ? (<Footer />) : <div />}
  </div>
  );
}

function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}