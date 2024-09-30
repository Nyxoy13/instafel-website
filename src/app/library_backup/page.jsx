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
import { File, FileIcon } from "lucide-react";

export default function BackupLibrary() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      var requestUrl = 'https://raw.githubusercontent.com/instafel/backups/refs/heads/main/backups.json';
      const res = await fetch(requestUrl);
      const result = await res.json();
      setData(result)
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
      { data ? ( <div className="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 w-full text-center">Backup Library</h1>
      <div className="grid gap-4">
      {data ? data.backups.length > 0 ? (
                      data.backups.map((item, index) => (
                        <div key={index} className="bg-background p-4 rounded-lg">
  <div className="flex items-center gap-4">
    <FileIcon className="w-8 h-8 text-primary" />
    <div className="flex-1">
      <h3 className="text-lg font-medium">{item.name}</h3>
      <p className="text-muted-foreground">Created by {item.author}</p>
    </div>
    <Button onClick={() => viewBackup(item.id)} variant="outline" size="sm">
      View
    </Button>
  </div>
</div>
                      ))
                    ) : (
                      <div />
                    ) : (
                      <div />
                    )}
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