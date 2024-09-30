import Link from "next/link"
import { Card, CardHeader, CardFooter } from "@/components/ui/card"
import { Header, Footer } from "@/components/ifl"
import "../app/globals.css"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Database, Flag } from "lucide-react"

export function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header></Header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    The Best Alpha Experience for Instagram
                  </h1>
                  <p>
                    Instafel aims to release alpha versions with a powerful patcher as quickly as possible.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="/download?version=latest"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 w-full"
                    prefetch={false}
                  >
                    Download Now
                  </Link>
                </div>
              </div>
              <img
                src="https://raw.githubusercontent.com/mamiiblt/instafel_release_arm64-v8a/refs/heads/master/test.png"
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Instafel Features</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our Instagram mod offers a range of powerful features to enhance your Instafel Alpha experience.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Card className="flex flex-col justify-between">
                <CardHeader>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Clone Support</h3>
                    <p className="text-muted-foreground">
                      If you don't want to install the Alpha versions instead of the original Instagram, you can install
                      it as a secondary app!
                    </p>
                  </div>
                </CardHeader>
              </Card>
              <Card className="flex flex-col justify-between">
                <CardHeader>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">32-bit Support</h3>
                    <p className="text-muted-foreground">We always offer support for nearly obsolete 32-bit devices!</p>
                  </div>
                </CardHeader>
              </Card>
              <Card className="flex flex-col justify-between">
                <CardHeader>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">OTA Updates</h3>
                    <p>
                      Instantly patched and released the latest Alpha APKs pulled directly from the source for OTA
                      channels.
                    </p>
                  </div>
                </CardHeader>
              </Card>
              <Card className="flex flex-col justify-between">
                <CardHeader>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Backup / Flag Library</h3>
                    <p className="text-muted-foreground">You can import backups / flags directly from libraries!</p>
                  </div>
                </CardHeader>
              </Card>
              <Card className="flex flex-col justify-between">
                <CardHeader>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Crash Reports</h3>
                    <p className="text-muted-foreground">
                      It is very common for the application to crash when using Alpha versions, Instafel always keeps a
                      crash report for such cases.
                    </p>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Telegram Group</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Sssh... We always ready to help for you!
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-1 lg:gap-12">
              <Card className="flex flex-col justify-between">
                <CardHeader>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Telegram Group</h3>
                    <p className="text-muted-foreground">
                      Join our Telegram group to stay up-to-date with the latest Instafel updates and news. Share your
                      feedback, suggestions and everything with the community.
                    </p>
                  </div>
                </CardHeader>
                <CardFooter>
                  <Link
                    href="https://t.me/instafel"
                    className="w-full inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Join Instafel Telegram Group
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer></Footer>
    </div>
  )
}
