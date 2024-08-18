"use client";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { Inter } from "next/font/google";
import { motion } from "framer-motion";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import PricingSection from "./components/PriceSection";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  const handleGetStarted = () => {
    if (isSignedIn) {
      router.push("/dashboard");
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <Provider store={store}>
      <div
        className={`min-h-screen mt-16 p-10 flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white ${inter.className}`}
      >
        {/* Header Section */} 
        <header className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <h5 className="text-xl">Welcome to the</h5>
            <h1 className="text-4xl font-bold">Flashcard and Stripe Project</h1>
          </motion.div>
          <nav>
            <Button
              variant="contained"
              onClick={handleGetStarted}
              sx={{
                bgcolor: "white",
                color: "purple",
                fontSize: "1rem",
                fontWeight: "bold",
                padding: "10px 20px",
                borderRadius: "50px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: "white",
                  color: "darkblue",
                  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
                  transform: "scale(1.05)",
                },
                "&:active": {
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                  transform: "scale(0.98)",
                },
              }}
            >
              Get Started
            </Button>
          </nav>
        </header>

        {/* AI/Flashcard Section */}
        <section className="w-full max-w-4xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Flashcard Component */}
            <Card
              component={motion.div}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-white text-black shadow-lg"
            >
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  Flashcard Example
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Use flashcards to enhance your learning and quickly test your
                  knowledge.
                </Typography>
              </CardContent>
            </Card>

            {/* AI-Themed Component */}
            <Card
              component={motion.div}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-white text-black shadow-lg"
            >
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  AI Integration
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Explore how AI can enhance your applications and drive
                  innovation.
                </Typography>
              </CardContent>
            </Card>
          </div>
          <PricingSection />
        </section>
      </div>
    </Provider>
  );
}
