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
import { Dot, FileIcon } from "lucide-react";

export default function Backup() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      var requestUrl = 'https://raw.githubusercontent.com/instafel/backups/refs/heads/main/' + id + '/manifest.json';
      const res = await fetch(requestUrl);
      const result = await res.json();
      setData(result.manifest)
    }
    fetchData();
  }, []);

  const viewBackup = (url) => {
    const link = document.createElement("a");
    link.href = '/backup?id=' + url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="flex flex-col min-h-[100dvh]">
    <Header />
    <main>
      { data ? (<div className="w-full max-w-6xl mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{data.name}</h1>
        <div className="flex items-center gap-2" />
      </div>
      <div className="grid gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">About the Backup</h2>
          <p className="text-sm text-muted-foreground">
            {data.description}
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Backup Details</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Owner</p>
              <p className="text-sm text-muted-foreground"><u>{data.author}</u> (Click for show author info)</p>
            </div>
            <div>
              <p className="text-sm font-medium">Last Updated</p>
              <p className="text-sm text-muted-foreground">Updated to v{data.backup_version} on {data.last_updated}</p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Changelog</h2>
          <div className="grid gap-2">
            <div className="flex items-start gap-2">
              <Dot className="mt-1 h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Updated content</p>
                <p className="text-sm text-muted-foreground">Added new section on backup details</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Dot className="mt-1 h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Removed unused files</p>
                <p className="text-sm text-muted-foreground">Cleaned up old media files and unused assets</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Dot className="mt-1 h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Performance improvements</p>
                <p className="text-sm text-muted-foreground">Optimized images and minified CSS/JS</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Button size="lg">Download Backup</Button>
          <Button variant="outline" size="lg">
            Open in Instafel
          </Button>
        </div>
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