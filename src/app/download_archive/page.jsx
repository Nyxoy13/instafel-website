"use client";

import { Header, Footer } from "@/components/ifl"
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Suspense } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"

export default function Download(Archive) {
  const searchParams = useSearchParams();
  const arch = searchParams.get('arch')

  let simplifiedArchString = "";
  if (arch == "arm64") {
    simplifiedArchString = "arm64-v8a"
  }
  if (arch == "arm32") {
    simplifiedArchString = "armeabi-v7a"
  }


  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      var requestUrl = 'https://raw.githubusercontent.com/instafel/instafel/refs/heads/main/archive_' + arch + '.json';
      const res = await fetch(requestUrl);
      const result = await res.json();
      setData(result)
    }
    fetchData();
  }, []);

  return (
   <Suspense fallback={<a>Loading...</a>}>
    <Header />
    <main>
    <div className="flex flex-col w-full min-h-screen bg-background">
          <main className="flex-1 p-4 md:p-8">
            <Card>
              <CardHeader>
                <CardTitle>Instafel Release Archive for {arch}</CardTitle>
                <CardDescription>
                  All released versions and information are listed below.

                  Since version 105, arm64 and arm32 have been coming from a single source simultaneously. There may be ig version differences between the architectures for versions prior to this.
                  </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>IFL Version</TableHead>
                      <TableHead>IG Version</TableHead>
                      <TableHead>IG Ver-code</TableHead>
                      <TableHead>Build Date</TableHead>
                      <TableHead>Download UC</TableHead>
                      <TableHead>Download C</TableHead>
                      <TableHead>Build Info</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data ? data.length > 0 ? (
                      data.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item[0]}</TableCell>
                          <TableCell>{item[1]}</TableCell>
                          <TableCell>{item[2]}</TableCell>
                          <TableCell>{item[3]}</TableCell>
                          <TableCell>
                            <a href={`https://github.com/mamiiblt/instafel_release_${simplifiedArchString}/releases/download/v${item[0]}/instafel_uc_v${item[0]}_${item[1]}_${simplifiedArchString}.apk`}>
                              <u>Download UC</u>
                            </a>
                          </TableCell>
                          <TableCell>
                            <a href={`https://github.com/mamiiblt/instafel_release_${simplifiedArchString}/releases/download/v${item[0]}/instafel_c_v${item[0]}_${item[1]}_${simplifiedArchString}.apk`}>
                              <u>Download C</u>
                            </a>
                          </TableCell>
                          <TableCell>
                            <a href={`https://github.com/mamiiblt/instafel_release_${simplifiedArchString}/releases/download/v${item[0]}/build_info.json`}>
                              <u>Build Info</u>
                            </a>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7}>Loading...</TableCell>
                      </TableRow>
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7}>Loading...</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </main>
        </div>
    </main>
    <Footer />
    </Suspense>
  );
}