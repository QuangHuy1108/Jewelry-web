import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({ children, variant = 'primary', isLoading = false, className = '', style, ...props }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth out the motion for the magnetic effect
    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();

        // Calculate distance from center of button
        const hX = (e.clientX - rect.left - rect.width / 2) * 0.3;
        const hY = (e.clientY - rect.top - rect.height / 2) * 0.3;

        x.set(hX);
        y.set(hY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const baseClasses = "relative inline-flex items-center justify-center px-8 py-4 text-sm uppercase tracking-widest transition-colors duration-500 ease-out overflow-hidden font-medium";

    const variantClasses = {
        primary: "bg-brand-black text-brand-white hover:bg-brand-gold hover:text-brand-white",
        secondary: "bg-transparent text-brand-black border border-brand-black hover:bg-brand-black hover:text-brand-white"
    };

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: mouseXSpring, y: mouseYSpring, ...style }}
            className={`${baseClasses} ${variantClasses[variant]} ${className} ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}`}
            whileTap={{ scale: isLoading ? 1 : 0.95 }}
            disabled={isLoading || props.disabled}
            {...props}
        >
            <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                {children}
            </span>
        </motion.button>
    );
};

export default Button;
