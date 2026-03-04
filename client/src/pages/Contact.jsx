import { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        inquiryType: '',
        message: ''
    });

    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setStatus('loading');
            await api.post('/contact', formData);
            setStatus('success');
            setFormData({ name: '', email: '', phone: '', inquiryType: '', message: '' });
        } catch (error) {
            setStatus('error');
            setErrorMessage(error.response?.data?.message || 'Failed to submit inquiry. Please try again.');
        }
    };

    const inputClasses = "w-full py-4 bg-transparent border-b border-gray-300 text-brand-black font-light text-sm focus:outline-none focus:border-brand-black transition-colors rounded-none placeholder:text-gray-400";

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="pt-32 pb-24 px-6 md:px-12 bg-brand-white min-h-screen flex flex-col items-center"
        >
            <div className="max-w-3xl w-full text-center mb-16 md:mb-20">
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-xs uppercase tracking-widest text-brand-dark-gray font-light mb-4 block"
                >
                    Dedicated Service
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="font-serif text-4xl md:text-5xl text-brand-black mb-6 tracking-wide"
                >
                    Bespoke Concierge
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-brand-dark-gray font-light leading-relaxed max-w-xl mx-auto"
                >
                    Whether you seek styling advice, wish to track an existing order, or desire to commission a custom masterpiece, our dedicated private jewelers are at your service.
                </motion.p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="w-full max-w-2xl"
            >
                {status === 'success' ? (
                    <div className="text-center py-20 px-8 border border-gray-200 bg-brand-surface">
                        <h2 className="font-serif text-2xl text-brand-black mb-4">Request Received</h2>
                        <p className="text-brand-dark-gray font-light mb-8">
                            A member of our conciege team will review your inquiry and be in touch shortly.
                        </p>
                        <button
                            onClick={() => setStatus('idle')}
                            className="bg-transparent border border-brand-black text-brand-black py-4 px-12 hover:bg-brand-black hover:text-brand-white uppercase text-xs tracking-[0.2em] font-light transition-colors duration-500"
                        >
                            Return to Form
                        </button>
                    </div>
                ) : (
                    <form onSubmit={submitHandler} className="flex flex-col gap-8">
                        {status === 'error' && (
                            <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm font-light text-center">
                                {errorMessage}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Full Name *"
                                required
                                className={inputClasses}
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email Address *"
                                required
                                className={inputClasses}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Phone Number"
                                className={inputClasses}
                            />
                            <select
                                name="inquiryType"
                                value={formData.inquiryType}
                                onChange={handleChange}
                                className={`${inputClasses} bg-transparent appearance-none rounded-none cursor-pointer`}
                                style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                            >
                                <option value="" disabled hidden>Inquiry Type</option>
                                <option value="Custom Commission">Custom Commission</option>
                                <option value="Styling Consultation">Styling Consultation</option>
                                <option value="Order Status">Order Status</option>
                                <option value="General Inquiry">General Inquiry</option>
                            </select>
                        </div>

                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="How may we assist you? *"
                            required
                            rows="5"
                            className={`${inputClasses} resize-none`}
                        />

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="mt-4 w-full bg-brand-black text-brand-white py-5 uppercase text-xs tracking-[0.2em] font-light hover:bg-brand-gold transition-colors duration-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            {status === 'loading' ? 'Submitting...' : 'Submit Inquiry'}
                        </button>
                    </form>
                )}
            </motion.div>
        </motion.div>
    );
};

export default Contact;
