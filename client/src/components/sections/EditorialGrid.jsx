import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const EditorialGrid = ({ categories }) => {
    const containerRef = useRef(null);

    useGSAP(() => {
        const sections = gsap.utils.toArray('.editorial-section');

        let mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            sections.forEach((section) => {
                const imgContainer = section.querySelector('.img-container');
                const image = section.querySelector('.img-inner');
                const textContent = section.querySelector('.text-content');

                // Mask Reveal for Image
                gsap.fromTo(imgContainer,
                    { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
                    {
                        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                        duration: 1.5,
                        ease: "power3.inOut",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 75%",
                        }
                    }
                );

                // Subtle Parallax inside image
                gsap.fromTo(image,
                    { scale: 1.1, yPercent: -5 },
                    {
                        scale: 1, yPercent: 5,
                        ease: "none",
                        scrollTrigger: {
                            trigger: section,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                        }
                    }
                );

                // Text slide up
                gsap.fromTo(textContent,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1, y: 0,
                        duration: 1,
                        delay: 0.3,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 75%",
                        }
                    }
                );
            });
        });

        // Graceful mobile
        mm.add("(max-width: 767px)", () => {
            sections.forEach((section) => {
                const textContent = section.querySelector('.text-content');
                gsap.fromTo(section,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: section, start: "top 85%" } }
                );
            });
        });

        return () => mm.revert();
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="w-full bg-brand-white">
            {categories.map((cat, idx) => {
                const isReversed = idx % 2 !== 0;

                return (
                    <div key={cat.name} className={`editorial-section flex flex-col md:flex-row min-h-[80vh] items-center py-12 md:py-24 ${isReversed ? 'md:flex-row-reverse' : ''}`}>
                        {/* Image Side */}
                        <div className="w-full md:w-1/2 px-6 md:px-12 flex justify-center">
                            <div className="img-container w-full max-w-[500px] aspect-[4/5] overflow-hidden relative group cursor-pointer">
                                <Link to={`/shop?category=${cat.name}`} className="block w-full h-full">
                                    <img
                                        src={cat.image}
                                        alt={cat.name}
                                        className="img-inner w-full h-full object-cover transform-gpu"
                                    />
                                </Link>
                            </div>
                        </div>

                        {/* Text Side */}
                        <div className="w-full md:w-1/2 px-6 md:px-16 mt-12 md:mt-0 flex flex-col justify-center items-center text-center">
                            <div className="text-content max-w-[400px]">
                                <p className="text-[10px] md:text-sm uppercase tracking-[0.2em] text-brand-dark-gray mb-4">
                                    Collection
                                </p>
                                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 text-brand-black">
                                    {cat.name}
                                </h2>
                                <p className="text-brand-dark-gray leading-relaxed mb-8">
                                    {cat.description || "Discover the essence of modern luxury. Experience craftsmanship that transcends time, designed for the bold and the beautiful."}
                                </p>
                                <Link to={`/shop?category=${cat.name}`} className="relative inline-block text-sm uppercase tracking-widest group pb-2 text-brand-black hover:text-brand-gold transition-colors">
                                    Explore {cat.name}
                                    <span className="absolute left-0 bottom-0 w-full h-[1px] bg-brand-black origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-in-out" />
                                </Link>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default EditorialGrid;
