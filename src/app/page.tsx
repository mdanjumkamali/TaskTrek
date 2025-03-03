"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2, LayoutDashboard } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/redux.hooks";
import { ModeToggle } from "@/components/ui/darkmode";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = useAppSelector((s) => s.auth);

  useEffect(() => {
    // Check if authenticated in Redux store
    if (auth?.isAuthenticated && auth?.token) {
      setIsLoggedIn(true);
      return;
    }

    // Fallback to localStorage check
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, [auth]);

  const features = [
    "Task Management",
    "Team Collaboration",
    "Progress Tracking",
    "Dark/Light Mode",
    "Mobile Responsive",
    "Real-time Updates",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="fixed w-full top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 md:h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="font-bold text-xl sm:text-2xl">
            TaskTrek
          </Link>

          <div className="flex gap-2 sm:gap-4">
            {isLoggedIn ? (
              <>
                <ModeToggle />
                <Link href="/dashboard">
                  <Button className="flex items-center gap-2">
                    <LayoutDashboard className="h-4 w-4" />
                    <span className="hidden sm:inline">Dashboard</span>
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <ModeToggle />
                <Link href="/login">
                  <Button variant="ghost" className="text-sm sm:text-base">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="text-sm sm:text-base">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="container flex-grow pt-20 sm:pt-24 pb-8 sm:pb-12 px-4 md:px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex flex-col items-center text-center space-y-6 sm:space-y-8 py-8 sm:py-12"
        >
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
          >
            Manage Your Tasks with
            <span className="text-primary block sm:inline"> TaskTrek</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-[750px]"
          >
            Streamline your productivity with our intuitive task management
            platform. Create, organize, and track your tasks effortlessly.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto"
          >
            <Link href="/signup" className="w-full sm:w-auto">
              <Button size="lg" className="gap-2 w-full">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full">
                Try Demo
              </Button>
            </Link>
          </motion.div>

          {/* Updated Features Section with cleaner design */}
          <motion.div
            variants={itemVariants}
            className="mt-8 sm:mt-12 w-full max-w-2xl"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-3">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-center gap-2"
                >
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-sm sm:text-base text-left">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-10 sm:mt-16 relative w-full max-w-4xl"
          >
            <div className="overflow-hidden rounded-lg border bg-background shadow-xl">
              <img
                src="/dashboard.png"
                alt="Dashboard Preview"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
            <div className="absolute -z-10 inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl" />
          </motion.div>
        </motion.div>
      </main>

      <footer className="border-t mt-auto">
        <div className="container py-6 sm:py-8 text-center text-xs sm:text-sm text-muted-foreground">
          © {new Date().getFullYear()} TaskTrek. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
