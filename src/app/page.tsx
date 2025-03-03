"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function Home() {
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
    <div className="min-h-screen bg-background">
      <nav className="fixed w-full top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <Link href="/" className="font-bold text-2xl">
            TaskTrek
          </Link>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="container pt-24 pb-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex flex-col items-center text-center space-y-8 py-12"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight"
          >
            Manage Your Tasks with
            <span className="text-primary"> TaskTrek</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-muted-foreground text-lg sm:text-xl max-w-[750px]"
          >
            Streamline your productivity with our intuitive task management
            platform. Create, organize, and track your tasks effortlessly.
          </motion.p>

          <motion.div variants={itemVariants} className="flex gap-4">
            <Link href="/signup">
              <Button size="lg" className="gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline">
                Try Demo
              </Button>
            </Link>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-12"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-center gap-2 text-muted-foreground"
              >
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>{feature}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-16 relative w-full max-w-4xl"
          >
            <div className="overflow-hidden rounded-lg border bg-background shadow-xl">
              <img
                src="/dashboard.png"
                alt="Dashboard Preview"
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -z-10 inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl" />
          </motion.div>
        </motion.div>
      </main>

      <footer className="border-t">
        <div className="container py-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} TaskTrek. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
