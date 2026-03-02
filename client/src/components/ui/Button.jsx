import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', style, className, ...props }) => {

    const baseStyle = {
        padding: '0.75rem 1.5rem',
        fontSize: '1rem',
        fontWeight: '500',
        borderRadius: 'var(--radius-none)', // Luxury square edges
        outline: 'none',
        display: 'inline-block',
        textAlign: 'center',
        ...style
    };

    const variants = {
        primary: {
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-secondary)',
            border: '1px solid var(--color-primary)',
        },
        secondary: {
            backgroundColor: 'transparent',
            color: 'var(--color-primary)',
            border: '1px solid var(--color-primary)',
        }
    };

    return (
        <motion.button
            style={{ ...baseStyle, ...variants[variant] }}
            className={className}
            whileHover={{
                scale: 1.02,
                backgroundColor: variant === 'primary' ? 'var(--color-accent)' : 'var(--color-primary)',
                color: variant === 'primary' ? 'var(--color-primary)' : 'var(--color-secondary)',
                borderColor: variant === 'primary' ? 'var(--color-accent)' : 'var(--color-primary)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;
