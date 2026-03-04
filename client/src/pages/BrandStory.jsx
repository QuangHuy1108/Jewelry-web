import { motion } from 'framer-motion';

const BrandStory = () => {
    return (
        <div className="bg-brand-white min-h-screen pt-32 pb-24">
            {/* Header */}
            <div className="max-w-4xl mx-auto px-6 md:px-12 text-center mb-24">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-xs uppercase tracking-[0.3em] font-light text-brand-dark-gray mb-6"
                >
                    Heritage & Craft
                </motion.p>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="font-serif text-4xl md:text-6xl lg:text-7xl text-brand-black leading-tight tracking-wide"
                >
                    A Legacy of<br />Luminous Moments
                </motion.h1>
            </div>

            {/* Hero Image Full Width */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.4 }}
                className="w-full h-[60vh] md:h-[80vh] relative mb-32"
            >
                <img
                    src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                    alt="Jewelry artisan working"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10"></div>
            </motion.div>

            {/* Editorial Blocks */}
            <div className="max-w-7xl mx-auto px-6 md:px-12">

                {/* Block 1: Right Image, Left Text */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center mb-32 md:mb-48">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 1 }}
                        className="order-2 md:order-1 max-w-lg mx-auto md:mx-0"
                    >
                        <h2 className="font-serif text-3xl md:text-4xl text-brand-black mb-8 leading-tight">Mastery in Every Facet</h2>
                        <p className="text-brand-dark-gray font-light leading-loose text-sm md:text-base mb-6">
                            Since our inception, Luxe Gems has operated on a singular philosophy: true luxury whispers, it never shouts. We source only the top 1% of ethically mined diamonds globally, ensuring each stone possesses a fire that transcends generations.
                        </p>
                        <p className="text-brand-dark-gray font-light leading-loose text-sm md:text-base">
                            Our master artisans spend hundreds of hours on a single piece, blending centuries-old goldsmithing techniques with modern precision to create architecture you can wear.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 1 }}
                        className="order-1 md:order-2 aspect-[4/5] bg-brand-light-gray"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                            alt="Diamond close up"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </div>

                {/* Block 2: Left Image, Right Text */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center mb-32 md:mb-48">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 1 }}
                        className="aspect-square bg-brand-light-gray"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                            alt="Elegant woman wearing necklace"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="max-w-lg mx-auto md:ml-auto md:mr-0"
                    >
                        <h2 className="font-serif text-3xl md:text-4xl text-brand-black mb-8 leading-tight">Conscious Permanence</h2>
                        <p className="text-brand-dark-gray font-light leading-loose text-sm md:text-base mb-6">
                            We believe that objects intended to last forever should not harm the world in their creation. Every piece of gold and platinum we cast is 100% recycled, refined to its purest state without leaving a footprint.
                        </p>
                        <p className="text-brand-dark-gray font-light leading-loose text-sm md:text-base">
                            When you wear our pieces, you carry a promise of integrity, sustainability, and absolute grace.
                        </p>
                    </motion.div>
                </div>

            </div>

            {/* Bottom Call to Action */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="w-full bg-brand-light-gray py-32 text-center px-6"
            >
                <div className="max-w-2xl mx-auto">
                    <h2 className="font-serif text-3xl md:text-5xl text-brand-black mb-8">Begin Your Collection</h2>
                    <p className="text-brand-dark-gray font-light mb-12">Explore the gallery and find the piece that speaks to your legacy.</p>
                    <a
                        href="/shop"
                        className="inline-block bg-brand-black text-brand-white px-12 py-5 uppercase tracking-[0.2em] text-xs font-light hover:bg-brand-gold transition-colors duration-500"
                    >
                        Visit Boutique
                    </a>
                </div>
            </motion.div>
        </div>
    );
};

export default BrandStory;
