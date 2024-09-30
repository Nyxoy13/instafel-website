import { useState, useCallback } from "react";
import { Github, Instagram, SunMediumIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function useSocialMediaModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const SocialMediaUiComponent = ({ authorData }) => {
    const links = [];

    if (authorData.github) {
      links.push(
        <div className="flex items-center space-x-4">
          <Github className="h-6 w-6 text-gray-800" />
          <a href={`https://github.com/${authorData.github}`} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:underline">
            {authorData.github}
          </a>
        </div>
      );
    }

    if (authorData.instagram) {
      links.push(
        <div className="flex items-center space-x-4">
          <Instagram className="h-6 w-6 text-pink-600" />
          <a href={`https://www.instagram.com/${authorData.instagram}`} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline">
            @{authorData.instagram}
          </a>
        </div>
      );
    }

    if (authorData.medium) {
      links.push(
        <div className="flex items-center space-x-4">
          <SunMediumIcon className="h-6 w-6 text-pink-600" />
          <a href={`https://www.medium.com/@${authorData.medium}`} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline">
            @{authorData.medium}
          </a>
        </div>
      );
    }

    return <div>{links.map((item, index) => (<div key={index}>{item}<br /></div>))}</div>;
  };

  const SocialMediaModal = useCallback(
    (props) => (
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
    ),
    [isOpen]
  );

  return { SocialMediaModal, openModal, closeModal };
}
