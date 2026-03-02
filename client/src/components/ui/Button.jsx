const Button = ({ children, onClick, variant = 'primary', type = 'button', style = {}, className = '', ...props }) => {
    const baseStyle = {
        padding: '0.75rem 1.5rem',
        borderRadius: 'var(--radius-sm)',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        ...style
    };

    const variants = {
        primary: { backgroundColor: 'var(--color-accent)', color: 'white' },
        secondary: { backgroundColor: 'transparent', border: '1px solid var(--color-primary)', color: 'var(--color-primary)' },
    };

    return (
        <button type={type} onClick={onClick} style={{ ...baseStyle, ...variants[variant] }} className={className}  {...props}>
            {children}
        </button>
    );
};

export default Button;
