"use client";

import { Header, Footer } from "@/components/ifl"
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Suspense } from "react";

export default function Download() {
  const searchParams = useSearchParams();
  const version = searchParams.get('version');
  const arch = searchParams.get('arch')

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header />
      <main>
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
      <div className="flex flex-col items-start space-y-6">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Download the version {version} of Instafel</h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Get the release version of Instafel for both clone and unclone variants.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg">Download Clone</Button>
          <Button size="lg" variant="secondary">
            Download Unclone
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-start space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold">Changelog</h2>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <div className="font-medium">Added in {version}</div>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <CheckIcon className="w-4 h-4 mr-2 inline-block" />
                Instagram updated to v351.0.0.0.72 (375105036)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div className="mt-12 sm:mt-16 lg:mt-24">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">Build Information</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Property Name</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Architecture</TableCell>
            <TableCell>arm64-v8a</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>IFL Version</TableCell>
            <TableCell>245</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>IG Version</TableCell>
            <TableCell>351.0.0.0.72</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>IG Ver-code</TableCell>
            <TableCell>375105036 ({arch})</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>IFL FU Version</TableCell>
            <TableCell>1.4</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Generation ID</TableCell>
            <TableCell>78438704310-94520498704</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Build Date</TableCell>
            <TableCell>17271466027115</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>MD5 Hash (UC)</TableCell>
            <TableCell>1e5e30b0cad0d0d99cd3503d1fb365c</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>MD5 Hash (C)</TableCell>
            <TableCell>5480f0c56ee26824b53f56e9cc6cf7e1</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
    </main>
    <Footer />
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