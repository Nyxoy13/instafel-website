import Link from "next/link"

export function Header() {
    return (
        <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="/" className="flex items-center justify-center" prefetch={false}>
          <InstagramIcon className="h-6 w-6" />
          <b className="p-2">
            Instaflax
          </b>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/guide" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Rehber
          </Link>
          <Link href="/library_backup" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Kütüphane
          </Link>
          <Link href="/download?version=latest" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}
>
            indir
          </Link>
        </nav>
      </header>
    );
}

export function LoadingBar() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center h-full">
      <div className="relative h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>    
  );
}

export function Footer() {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-xs text-muted-foreground">ModderByTR Tarafından Geliştirildi ❤️</p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link href="https://t.me/instaflax" className="text-xs hover:underline underline-offset-4" prefetch={false}>
      
        </Link>
        <Link
 href="https://github.com/mamiiblt" className="text-xs hover:underline underline-offset-4" prefetch={false}
>
        
        </Link>
      </nav>
    </footer>
  );
}

function InstagramIcon(props) {
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
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    )
  }
  
