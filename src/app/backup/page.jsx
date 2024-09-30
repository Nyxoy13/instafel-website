"use client";

import { Header, Footer, LoadingBar } from "@/components/ifl"
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Github, Instagram, SunMediumIcon } from "lucide-react"

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

  const handleDownload = async (id, version) => {
    // JSON dosyasını HTTP üzerinden al
    const response = await fetch('https://raw.githubusercontent.com/instafel/backups/refs/heads/main/' + id +'/backup.json');

    if (!response.ok) {
      console.error("Dosya alınamadı");
      return;
    }

    // Gelen yanıtı JSON formatına çevir
    const jsonData = await response.json();
    const fileName = id + "_v" + version +".json"; // İndirilecek dosyanın adı

    // JSON verisini Blob'a dönüştür
    const file = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });

    // Geçici bir URL oluştur
    const url = URL.createObjectURL(file);

    // İndirme işlemi için bir <a> etiketi oluştur ve tıkla
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();

    // Belleği temizle
    URL.revokeObjectURL(url);
  };

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
              <AuthorComponent authorName={data.author} showAuthorSocials={data.optional.show_author_socials} authorData={data.optional_values.author_socials}/>
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
          <p dangerouslySetInnerHTML={{ __html: data.changelog.replace(/\n/g, "<br />") }} />
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Button onClick={() => handleDownload(id, data.backup_version)}size="lg">Download Backup</Button>
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

export function useSocialMediaModal(props) {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = useCallback(() => setIsOpen(true), [])
  const closeModal = useCallback(() => setIsOpen(false), [])

  const SocialMediaUiComponent = (props) => {

    console.log(props.authorData.twitter)
    var authorData = props.authorData;
    var links = [];

    if (authorData.github != undefined) {
      links.push(<div className="flex items-center space-x-4">
        <Github className="h-6 w-6 text-gray-800" />
        <a href={`https://github.com/${authorData.github}`} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:underline">
          {authorData.github}
        </a>
      </div>)
    }

    if (authorData.instagram != undefined) {
      links.push(  <div className="flex items-center space-x-4">
        <Instagram className="h-6 w-6 text-pink-600" />
        <a href={`https://www.instagram.com/${authorData.instagram}`} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline">
          @{authorData.instagram}
        </a>
      </div>)
    }

    if(authorData.medium != undefined) {
      links.push(  <div className="flex items-center space-x-4">
        <SunMediumIcon className="h-6 w-6 text-pink-600" />
        <a href={`https://www.medium.com/@${authorData.medium}`} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline">
          @{authorData.medium}
        </a>
      </div>)
    }

    return (
      <div>
        {links.map((item, index) => (
          <div key={index}>{item}<br/></div>
        ))}
      </div>
    );
  }

  const SocialMediaModal = useCallback((props) => (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>@{props.authorName}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
         <SocialMediaUiComponent authorData={props.authorData} />
        </div>
      </DialogContent>
    </Dialog>
  ), [isOpen])

  return { SocialMediaModal, openModal, closeModal }
}

export function AuthorComponent(props) {
  const { SocialMediaModal, openModal } = useSocialMediaModal()

  if (props.showAuthorSocials) {
    return (
      <div>
        <a onClick={openModal}><u>{props.authorName}</u> <u>(Click for show owner info)</u></a> 
        <SocialMediaModal authorData={props.authorData} authorName={props.authorName} />
      </div>
    )
  } else {
    return (
      <a>{props.authorName}</a> 
    )
  }
}