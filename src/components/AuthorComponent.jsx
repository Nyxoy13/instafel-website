import { useSocialMediaModal } from "./useSocialMediaModal";

export function AuthorComponent({ authorName, showAuthorSocials, authorData }) {
  const { SocialMediaModal, openModal } = useSocialMediaModal();

  return showAuthorSocials ? (
    <div>
      <a onClick={openModal}>
        <u>{authorName}</u> <u>(Click to show owner info)</u>
      </a>
      <SocialMediaModal authorData={authorData} authorName={authorName} />
    </div>
  ) : (
    <span>{authorName}</span>
  );
}
