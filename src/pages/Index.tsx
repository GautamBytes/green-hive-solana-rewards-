import { useEffect, useState, useRef, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { useWallet } from "@solana/wallet-adapter-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import AchievementsModal from "@/components/AchievementsModal";
import NotificationCenter from "@/components/NotificationCenter";
import { FeatureSection } from "@/components/FeatureSection";
import { FeaturedEcoActions } from "@/components/FeaturedEcoActions";
import { LeafGenerator } from "@/components/LeafGenerator";
import { TechnicalSections } from "@/components/TechnicalSections";
import { Roadmap } from "@/components/Roadmap";
import WaitlistBanner from "@/components/WaitlistBanner";
import TestnetToggle from "@/components/TestnetToggle";
import GovernanceCard from "@/components/GovernanceCard";
import SneakPeekModal from "@/components/SneakPeekModal";
import {
  Trophy,
  Award,
  ArrowRight,
  CheckCircle2,
  Activity,
  CircleDollarSign,
  Leaf,
  Users,
  LayoutDashboard,
  Lightbulb,
  Recycle,
  Volume2,
  VolumeX,
  Twitter,
  MessageCircle,
  Send,
} from "lucide-react";

const Index = () => {
  const { connected, publicKey } = useWallet();
  const { theme } = useTheme();
  const [showAchievements, setShowAchievements] = useState(false);
  const [showSneakPeek, setShowSneakPeek] = useState(false);
  const [isTestnet, setIsTestnet] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hasPlayedEntrySound, setHasPlayedEntrySound] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Legacy state for backward compatibility
  const isConnected = connected;

  const handleConnect = () => {
    console.log(
      "Connect button clicked, but wallet connection is handled by adapter"
    );
  };

  // Create eco-friendly entry sound
  const createEcoEntrySound = () => {
    if (!soundEnabled || hasPlayedEntrySound) return;

    try {
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      audioContextRef.current = audioContext;

      const mainGain = audioContext.createGain();
      gainNodeRef.current = mainGain;
      mainGain.connect(audioContext.destination);
      mainGain.gain.setValueAtTime(0.25, audioContext.currentTime);

      const currentTime = audioContext.currentTime;

      // Layer 1: Ambient pad
      const createAmbientPad = () => {
        const osc1 = audioContext.createOscillator();
        const osc2 = audioContext.createOscillator();
        const filter = audioContext.createBiquadFilter();
        const padGain = audioContext.createGain();

        osc1.type = "sawtooth";
        osc2.type = "sine";
        osc1.frequency.setValueAtTime(65.41, currentTime);
        osc2.frequency.setValueAtTime(130.81, currentTime);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(400, currentTime);
        filter.frequency.exponentialRampToValueAtTime(800, currentTime + 6);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(padGain);
        padGain.connect(mainGain);

        padGain.gain.setValueAtTime(0, currentTime);
        padGain.gain.linearRampToValueAtTime(0.3, currentTime + 1);
        padGain.gain.linearRampToValueAtTime(0.3, currentTime + 4);
        padGain.gain.exponentialRampToValueAtTime(0.001, currentTime + 6);

        osc1.start(currentTime);
        osc2.start(currentTime);
        osc1.stop(currentTime + 6);
        osc2.stop(currentTime + 6);
      };

      // Layer 2: Nature melody
      const createNatureMelody = () => {
        const melodyNotes = [
          { freq: 523.25, time: 0.5, duration: 1.2 },
          { freq: 659.25, time: 1.2, duration: 1.0 },
          { freq: 783.99, time: 2.0, duration: 1.5 },
          { freq: 698.46, time: 2.8, duration: 1.2 },
          { freq: 523.25, time: 3.8, duration: 1.8 },
          { freq: 440.0, time: 4.5, duration: 1.5 },
        ];

        melodyNotes.forEach((note) => {
          const osc = audioContext.createOscillator();
          const env = audioContext.createGain();
          const reverb = audioContext.createBiquadFilter();
          const lfo = audioContext.createOscillator();
          const lfoGain = audioContext.createGain();

          osc.type = "triangle";
          osc.frequency.setValueAtTime(note.freq, currentTime + note.time);

          lfo.type = "sine";
          lfo.frequency.setValueAtTime(4, currentTime + note.time);
          lfoGain.gain.setValueAtTime(8, currentTime + note.time);
          lfo.connect(lfoGain).connect(osc.frequency);

          reverb.type = "allpass";
          reverb.frequency.setValueAtTime(1000, currentTime + note.time);

          osc.connect(reverb).connect(env).connect(mainGain);

          env.gain.setValueAtTime(0, currentTime + note.time);
          env.gain.linearRampToValueAtTime(
            0.4,
            currentTime + note.time + 0.1
          );
          env.gain.exponentialRampToValueAtTime(
            0.1,
            currentTime + note.time + note.duration * 0.7
          );
          env.gain.exponentialRampToValueAtTime(
            0.001,
            currentTime + note.time + note.duration
          );

          lfo.start(currentTime + note.time);
          osc.start(currentTime + note.time);
          lfo.stop(currentTime + note.time + note.duration);
          osc.stop(currentTime + note.time + note.duration);
        });
      };

      // Layer 3: Gentle percussion
      const createNaturePercussion = () => {
        const createRaindrop = (time: number, pitch = 1) => {
          const osc = audioContext.createOscillator();
          const env = audioContext.createGain();
          const filter = audioContext.createBiquadFilter();

          osc.type = "sine";
          osc.frequency.setValueAtTime(1200 * pitch, currentTime + time);
          filter.type = "highpass";
          filter.frequency.setValueAtTime(800, currentTime + time);

          osc.connect(filter).connect(env).connect(mainGain);

          env.gain.setValueAtTime(0, currentTime + time);
          env.gain.linearRampToValueAtTime(0.15, currentTime + time + 0.01);
          env.gain.exponentialRampToValueAtTime(
            0.001,
            currentTime + time + 0.3
          );

          osc.start(currentTime + time);
          osc.stop(currentTime + time + 0.3);
        };

        [1.5, 2.3, 3.1, 3.7, 4.2, 4.8, 5.2].forEach((t, i) =>
          createRaindrop(t, 0.8 + (i % 3) * 0.2)
        );
      };

      // Layer 4: Harmonic base
      const createHarmonicBase = () => {
        const osc = audioContext.createOscillator();
        const env = audioContext.createGain();
        const filter = audioContext.createBiquadFilter();

        osc.type = "sine";
        osc.frequency.setValueAtTime(32.7, currentTime);
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(150, currentTime);

        osc.connect(filter).connect(env).connect(mainGain);

        env.gain.setValueAtTime(0, currentTime);
        env.gain.linearRampToValueAtTime(0.2, currentTime + 2);
        env.gain.linearRampToValueAtTime(0.2, currentTime + 4);
        env.gain.exponentialRampToValueAtTime(0.001, currentTime + 6);

        osc.start(currentTime);
        osc.stop(currentTime + 6);
      };

      createAmbientPad();
      createNatureMelody();
      createNaturePercussion();
      createHarmonicBase();

      setHasPlayedEntrySound(true);
    } catch (err) {
      console.warn("Audio context error:", err);
    }
  };

  // Effects
  useEffect(() => {
    if (soundEnabled && !hasPlayedEntrySound) {
      const timer = setTimeout(createEcoEntrySound, 500);
      return () => clearTimeout(timer);
    }
  }, [soundEnabled, hasPlayedEntrySound]);

  useEffect(() => {
    if (connected && publicKey) {
      console.log("Wallet connected:", publicKey.toString());
    }
  }, [connected, publicKey]);

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (
        target.tagName === "A" &&
        target.getAttribute("href")?.startsWith("#")
      ) {
        e.preventDefault();
        const id = target.getAttribute("href")!.slice(1);
        document.getElementById(id)?.scrollIntoView({
          behavior: "smooth",
        });
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  useEffect(() => {
    return () => {
      audioContextRef.current?.close();
    };
  }, []);

  const handleShowSneakPeek = () => setShowSneakPeek(true);
  const toggleSound = () => setSoundEnabled((s) => !s);

  return (
    <div className={`min-h-screen flex flex-col ${theme === "dark" ? "dark" : ""}`}>
      {/* Waitlist Banner */}
      <WaitlistBanner />
      {/* Leaf animation */}
      <LeafGenerator />

      <div className="fixed top-4 right-4 z-50">
        <NotificationCenter />
      </div>
      <div className="fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleSound}
          className="bg-white/80 dark:bg-green-900/80 backdrop-blur-sm border-green-200 dark:border-green-700 hover:bg-green-50 dark:hover:bg-green-800/60"
          title={soundEnabled ? "Disable sounds" : "Enable sounds"}
        >
          {soundEnabled ? <Volume2 className="h-4 w-4 text-green-600 dark:text-green-400" /> : <VolumeX className="h-4 w-4 text-gray-500" />}
        </Button>
      </div>
      <div className="fixed top-20 right-4 z-40">
        <TestnetToggle isTestnet={isTestnet} onToggle={setIsTestnet} />
      </div>

      <Navbar isConnected={isConnected} onConnect={handleConnect} />
      <HeroSection />

      {/* Empowering Features */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center mb-12">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-3xl md:text-4xl font-bold mb-4 inline-block relative"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-500 dark:from-green-400 dark:to-green-300">
              Empowering Features
            </span>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-400 rounded-full" />
          </motion.h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover how GreenTask helps you make a real environmental impact while earning rewards for your efforts.
          </p>
        </div>

        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature Cards */}
          {[{
            icon: <Recycle className="h-6 w-6 text-white" />,
            title: "Eco Tasks",
            desc: "Complete environmental tasks and get rewarded with $GREEN tokens for your positive impact.",
            colors: "from-green-500 to-green-600"
          },{
            icon: <Award className="h-6 w-6 text-white" />,
            title: "Rewards & Badges",
            desc: "Earn exclusive badges and climb the leaderboard as you complete more eco-friendly actions.",
            colors: "from-amber-500 to-amber-600"
          },{
            icon: <Users className="h-6 w-6 text-white" />,
            title: "Community Actions",
            desc: "Join eco-warriors in your area for collaborative environmental projects and initiatives.",
            colors: "from-blue-500 to-blue-600"
          },{
            icon: <LayoutDashboard className="h-6 w-6 text-white" />,
            title: "Impact Dashboard",
            desc: "Track your environmental contributions and visualize your positive impact on the planet.",
            colors: "from-purple-500 to-purple-600"
          },{
            icon: <Lightbulb className="h-6 w-6 text-white" />,
            title: "Eco Education",
            desc: "Learn sustainable practices and environmental tips through interactive content and challenges.",
            colors: "from-cyan-500 to-cyan-600"
          }].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              className="bg-white dark:bg-green-900/30 rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-green-100 dark:border-green-800"
            >
              <div className={`w-12 h-12 mb-4 rounded-lg flex items-center justify-center bg-gradient-to-br ${f.colors}`}>
                {f.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-green-800 dark:text-green-300">{f.title}</h3>
              <p className="text-muted-foreground text-sm">{f.desc}</p>
            </motion.div>
          ))}

          {/* Governance Card */}
          <GovernanceCard onShowSneakPeek={handleShowSneakPeek} />
        </div>

        <div className="mt-12 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.5 }}>
            <Button variant="eco" size="lg" className="group">
              Learn More About Features
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Technical Sections */}
      <TechnicalSections />

      {/* Roadmap */}
      <Roadmap />

      {connected && (
        <section className="py-16 bg-green-50/70 dark:bg-green-900/20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 p-6 bg-white/80 dark:bg-green-900/40 backdrop-blur-sm rounded-xl shadow-lg border border-green-100 dark:border-green-800"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-green-800 dark:text-green-100">Welcome back, Eco-Hero!</h2>
                  <p className="text-green-600 dark:text-green-300">Your environmental journey continues...</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button onClick={() => setShowAchievements(true)} variant="legendary" size="sm">
                    <Trophy className="mr-2 h-4 w-4" />
                    Achievements
                  </Button>
                  <Button variant="outline" size="sm" className="border-green-600 text-green-700 hover:bg-green-50 dark:border-green-400 dark:text-green-300 dark:hover:bg-green-800/40">
                    <Award className="mr-2 h-4 w-4" />
                    Rank #126
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {[
                  { to: "/dashboard", icon: <Activity className="h-8 w-8 mx-auto mb-2 text-green-600 dark:text-green-400" />, label: "Dashboard", desc: "View your eco stats" },
                  { to: "/tasks", icon: <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-amber-600 dark:text-amber-400" />, label: "Tasks", desc: "Complete eco actions" },
                  { to: "/impact", icon: <Leaf className="h-8 w-8 mx-auto mb-2 text-blue-600 dark:text-blue-400" />, label: "Impact", desc: "Track your contribution" },
                  { to: "/eco-agents", icon: <CircleDollarSign className="h-8 w-8 mx-auto mb-2 text-purple-600 dark:text-purple-400" />, label: "$GREEN Token", desc: "Manage your rewards" },
                ].map((link, idx) => (
                  <Link key={idx} to={link.to} className="group">
                    <div className="bg-gradient-to-r from-green-100 to-green-50 dark:from-green-800/30 dark:to-green-700/30 p-4 rounded-xl shadow-sm hover:shadow-md transition-all text-center hover:-translate-y-1 duration-300">
                      {link.icon}
                      <h3 className="font-medium text-green-800 dark:text-green-300 mb-1">{link.label}</h3>
                      <p className="text-xs text-muted-foreground">{link.desc}</p>
                      <ArrowRight className="h-4 w-4 mx-auto mt-2 opacity-0 group-hover:opacity-100 text-green-600 dark:text-green-400 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>

            <FeaturedEcoActions />
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-r from-green-800 to-green-900 dark:from-green-900 dark:to-green-950 text-white py-12 mt-auto">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-2xl mb-4">GreenTask</h3>
            <p className="text-green-100 text-sm mb-6">Eco-Action Rewards on Solana</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-lg">Platform</h4>
            <ul className="space-y-3 text-sm">
              {["How It Works", "Available Tasks", "Rewards", "Partners"].map((l, i) => (
                <li key={i}>
                  <a href="#" className="text-green-200 hover:text-white transition-colors hover:translate-x-1 inline-block duration-300">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-lg">Resources</h4>
            <ul className="space-y-3 text-sm">
              {["FAQ", "Documentation", "API", "Privacy Policy"].map((l, i) => (
                <li key={i}>
                  <a href="#" className="text-green-200 hover:text-white transition-colors hover:translate-x-1 inline-block duration-300">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-lg">Subscribe</h4>
            <p className="text-sm text-green-200 mb-3">Get updates on new eco-tasks</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 bg-green-700/80 text-white rounded-l-md focus:outline-none text-sm w-full focus:ring-2 focus:ring-green-400"
              />
              <Button className="bg-green-500 hover:bg-green-400 rounded-l-none text-white text-sm">
                Submit
              </Button>
            </div>
            <div className="mt-6">
              <p className="text-xs text-green-300">Stay connected with our community</p>
              <div className="flex gap-3 mt-2">
                <a
                  href="https://twitter.com/greentask"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-green-700/50 hover:bg-green-600/50 flex items-center justify-center transition-all hover:-translate-y-1 duration-300"
                  title="Follow us on Twitter"
                >
                  <Twitter className="w-4 h-4 text-green-200" />
                </a>
                <a
                  href="https://discord.gg/greentask"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-green-700/50 hover:bg-green-600/50 flex items-center justify-center transition-all hover:-translate-y-1 duration-300"
                  title="Join our Discord"
                >
                  <MessageCircle className="w-4 h-4 text-green-200" />
                </a>
                <a
                  href="https://t.me/greentask"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-green-700/50 hover:bg-green-600/50 flex items-center justify-center transition-all hover:-translate-y-1 duration-300"
                  title="Chat on Telegram"
                >
                  <Send className="w-4 h-4 text-green-200" />
                </a>
              </div>  
            </div>
          </div>
        </div>
        <div className="border-t border-green-700 mt-12 pt-6 text-center text-sm text-green-300">
          <p>© 2025 GreenTask: Eco-Action Rewards on Solana. All rights reserved.</p>
        </div>
      </footer>

      {/* Modals */}
      <AchievementsModal open={showAchievements} onClose={() => setShowAchievements(false)} />
      <SneakPeekModal open={showSneakPeek} onClose={() => setShowSneakPeek(false)} />
    </div>
  );
};

export default Index;

