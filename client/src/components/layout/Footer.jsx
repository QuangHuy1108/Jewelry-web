import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-brand-black text-brand-white pt-24 pb-12 px-6 md:px-12 border-t border-gray-800">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8 mb-20">

                    {/* Brand Column */}
                    <div className="lg:pr-12">
                        <Link to="/" className="font-serif text-3xl tracking-wide block mb-8 hover:text-brand-gold transition-colors duration-300">
                            LUXE GEMS
                        </Link>
                        <p className="text-gray-400 font-light text-sm leading-relaxed max-w-sm mb-6">
                            Crafting extraordinary pieces that capture life's brilliance. Our commitment to sustainable luxury redefines the modern standard of high jewelry.
                        </p>
                        <Link to="/story" className="text-xs uppercase tracking-[0.2em] font-light text-brand-gold hover:text-white transition-colors duration-300 inline-block border-b border-brand-gold pb-1 hover:border-white">
                            Our Story
                        </Link>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h4 className="text-xs uppercase tracking-[0.2em] font-light mb-8 text-white">Discover</h4>
                        <ul className="flex flex-col gap-4">
                            <li><Link to="/shop?category=Rings" className="text-sm font-light text-gray-400 hover:text-white transition-colors duration-300">Rings</Link></li>
                            <li><Link to="/shop?category=Necklaces" className="text-sm font-light text-gray-400 hover:text-white transition-colors duration-300">Necklaces</Link></li>
                            <li><Link to="/shop?category=Earrings" className="text-sm font-light text-gray-400 hover:text-white transition-colors duration-300">Earrings</Link></li>
                            <li><Link to="/shop?category=Bracelets" className="text-sm font-light text-gray-400 hover:text-white transition-colors duration-300">Bracelets</Link></li>
                            <li><Link to="/shop" className="text-sm font-light text-brand-gold hover:text-white transition-colors duration-300 inline-block mt-2">All Collections</Link></li>
                        </ul>
                    </div>

                    {/* Assistance Links */}
                    <div>
                        <h4 className="text-xs uppercase tracking-[0.2em] font-light mb-8 text-white">Client Care</h4>
                        <ul className="flex flex-col gap-4">
                            <li><Link to="#" className="text-sm font-light text-gray-400 hover:text-white transition-colors duration-300">Contact Us</Link></li>
                            <li><Link to="#" className="text-sm font-light text-gray-400 hover:text-white transition-colors duration-300">Shipping & Returns</Link></li>
                            <li><Link to="#" className="text-sm font-light text-gray-400 hover:text-white transition-colors duration-300">Care Guide</Link></li>
                            <li><Link to="#" className="text-sm font-light text-gray-400 hover:text-white transition-colors duration-300">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-xs uppercase tracking-[0.2em] font-light mb-6 text-white">The Insider</h4>
                        <p className="text-gray-400 font-light text-sm mb-6">
                            Receive exclusive access to new collections, personalized recommendations, and private events.
                        </p>
                        <form className="flex items-end group">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="flex-1 bg-transparent border-b border-gray-600 focus:border-white py-3 pr-2 text-sm font-light text-white outline-none transition-colors duration-300 placeholder:text-gray-500"
                                required
                            />
                            <button
                                type="submit"
                                className="pb-3 border-b border-gray-600 group-focus-within:border-white transition-colors duration-300 text-gray-400 hover:text-white px-2"
                                aria-label="Subscribe"
                            >
                                <ArrowRight strokeWidth={1} size={20} />
                            </button>
                        </form>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-light text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Luxe Gems. All Rights Reserved.</p>
                    <div className="flex gap-8">
                        <Link to="#" className="hover:text-white transition-colors duration-300">Privacy Policy</Link>
                        <Link to="#" className="hover:text-white transition-colors duration-300">Terms of Service</Link>
                        <Link to="#" className="hover:text-white transition-colors duration-300">Cookie Preferences</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
