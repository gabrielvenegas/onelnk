import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  FolderOpenDot,
  LayersIcon,
  RssIcon,
  ShieldIcon,
  StarIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();

  return (
    <>
      <header className="m-auto px-4 md:px-0 max-w-screen-2xl py-4">
        <div className="flex flex-1 flex-row items-center justify-between">
          <h1 className="text-2xl font-semibold">OneLnk</h1>
          {!user ? (
            <Link href="/links">Fazer login</Link>
          ) : (
            <Link href="/links">Dashboard</Link>
          )}
        </div>
      </header>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container space-y-4 px-4 md:px-6">
          <div className="md:text-center space-y-8">
            <h2 className="text-6xl xl:text-7xl">
              Centralize Your Developer Portfolio in One Powerful Link
            </h2>

            <p className="w-5/6 lg:text-lg">
              With OneLnk, consolidate your online presence into a single,
              dynamic link. Designed for software developers, OneLnk lets you
              showcase your GitHub projects, blog posts, and professional
              networks—all in one spot.
            </p>

            <div className="flex flex-row justify-center space-x-6">
              <Input
                className="max-w-md text-base"
                placeholder="onelnk.pro/to/yourname"
              />

              <Button className="transition-colors duration-500">
                Claim you free link
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Showcase, Share, and Connect Like Never Before
              </h2>
              <p className="max-w-[700px] mx-auto text-gray-500 md:text-xl dark:text-gray-400">
                Expand your developer network. Showcase projects, share
                insights, and connect with tech professionals effortlessly.
              </p>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <FolderOpenDot className="h-8 w-8 text-primary" />
                <h3 className="ml-4 text-lg font-semibold">
                  Project Showcases
                </h3>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                Embed live GitHub repositories, display real-time stats, and
                show off your development prowess with CI/CD status badges.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <RssIcon className="h-8 w-8 text-primary" />
                <h3 className="ml-4 text-lg font-semibold">
                  Integrated Blogging
                </h3>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                Automatically update your profile with your latest blog posts,
                keeping your audience informed and engaged.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <ShieldIcon className="h-8 w-8 text-primary" />
                <h3 className="ml-4 text-lg font-semibold">
                  Developer-Focused Networking
                </h3>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                Direct links to your professional profiles on Stack Overflow,
                LinkedIn, and more, making it easier to connect with the tech
                community.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <LayersIcon className="h-8 w-8 text-primary" />
                <h3 className="ml-4 text-lg font-semibold">
                  Enhanced Visibility
                </h3>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                With SEO optimization, make it easier for potential employers,
                collaborators, and followers to find you online.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                What Our Customers Say
              </h2>
              <p className="max-w-[700px] mx-auto text-gray-500 md:text-xl dark:text-gray-400">
                Hear from our satisfied customers about their experience with
                our products and services.
              </p>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="flex items-start mb-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="ml-4">
                  <h3 className="font-semibold">Sarah Johnson</h3>
                  <div className="flex items-center gap-0.5 mt-1">
                    <StarIcon className="w-5 h-5" fill="black" />
                    <StarIcon className="w-5 h-5" fill="black" />
                    <StarIcon className="w-5 h-5" fill="black" />
                    <StarIcon className="w-5 h-5" fill="black" />
                    <StarIcon className="w-5 h-5" fill="black" />
                  </div>
                </div>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                I've been using the product for a few months now and it's been a
                game-changer for my business. The features are incredibly useful
                and the support team has been amazing.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="flex items-start mb-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="ml-4">
                  <h3 className="font-semibold">Alex Smith</h3>
                  <div className="flex items-center gap-0.5 mt-1">
                    <StarIcon className="w-5 h-5" fill="black" />
                    <StarIcon className="w-5 h-5" fill="black" />
                    <StarIcon className="w-5 h-5" fill="black" />
                    <StarIcon className="w-5 h-5" fill="black" />
                    <StarIcon className="w-5 h-5" fill="black" />
                  </div>
                </div>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                The platform is incredibly user-friendly and the onboarding
                process was a breeze. I was able to get my business up and
                running in no time.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="flex items-start mb-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="ml-4">
                  <h3 className="font-semibold">Emily Parker</h3>
                  <div className="flex items-center gap-0.5 mt-1">
                    <StarIcon className="w-5 h-5" fill="black" />
                    <StarIcon className="w-5 h-5" fill="black" />
                    <StarIcon className="w-5 h-5" fill="black" />
                    <StarIcon className="w-5 h-5" fill="black" />
                    <StarIcon className="w-5 h-5" fill="black" />
                  </div>
                </div>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                The customer support team has been incredibly responsive and
                helpful. They've gone above and beyond to ensure I have a great
                experience with the product.
              </p>
            </div>
          </div>
        </div>
      </section>
      <footer className="w-full bg-gray-100 dark:bg-gray-800 py-6">
        <div className="container px-4 md:px-6 flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2024 OneLink. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6">
            <Link
              className="text-sm hover:underline underline-offset-4 text-gray-500 dark:text-gray-400"
              href="#"
            >
              Terms of Service
            </Link>
            <Link
              className="text-sm hover:underline underline-offset-4 text-gray-500 dark:text-gray-400"
              href="#"
            >
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
