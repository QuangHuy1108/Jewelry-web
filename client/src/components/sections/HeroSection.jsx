import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
    const containerRef = useRef(null);
    const imageRef = useRef(null);
    const textContainerRef = useRef(null);

    useGSAP(() => {
        // Media Match for Graceful Degradation on Mobile
        let mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            // Desktop: Cinematic scroll parallax
            gsap.to(imageRef.current, {
                yPercent: 30, // Parallax depth
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                }
            });

            // Desktop: Subtle scale-in load animation for hero image
            gsap.fromTo(imageRef.current,
                { scale: 1.05 },
                { scale: 1, duration: 2, ease: "power2.out" }
            );

            // Text fade up on scroll out
            gsap.to(textContainerRef.current, {
                y: -100,
                opacity: 0,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                }
            });
        });

        mm.add("(max-width: 767px)", () => {
            // Mobile: Simple fade in without scrub parallax to save battery
            gsap.fromTo(imageRef.current,
                { scale: 1.02, opacity: 0 },
                { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out" }
            );
        });

        return () => mm.revert();
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative w-full h-[100vh] overflow-hidden bg-brand-black">
            {/* Background Image Container */}
            <div
                ref={imageRef}
                className="absolute inset-0 w-full h-[120%] -top-[10%]"
                style={{
                    backgroundImage: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1515562141207-7a8ef25ce99c?auto=format&fit=crop&w=1920&q=80")',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                }}
            />

            {/* Hero Content */}
            <div
                ref={textContainerRef}
                className="relative h-full flex flex-col items-center justify-center text-center text-brand-white px-6 w-full pt-[80px]"
            >
                <div className="max-w-[800px] flex flex-col items-center gap-6">
                    <div className="overflow-hidden">
                        <motion.span
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.83, 0, 0.17, 1] }}
                            className="block text-[10px] md:text-sm uppercase tracking-[0.3em]"
                        >
                            WOMEN / HIGH JEWELRY
                        </motion.span>
                    </div>

                    <div className="overflow-hidden">
                        <motion.h1
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1, delay: 0.4, ease: [0.83, 0, 0.17, 1] }}
                            className="font-serif text-5xl md:text-7xl lg:text-[100px] leading-tight font-light"
                        >
                            Spring–Summer 2026
                        </motion.h1>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="mt-8"
                    >
                        <Link
                            to="/shop"
                            className="relative inline-block text-[10px] md:text-sm uppercase tracking-[0.2em] group py-4 px-8 border border-brand-white/30 hover:bg-brand-white hover:text-brand-black transition-all duration-500"
                        >
                            Discover the Collection
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
