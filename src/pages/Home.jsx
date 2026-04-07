import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

const teamData = [
    {
        id: 1,
        name: "Susanne Oster",
        role: "Hair Specialist",
        image: "/Images/Member1.jpg"
    },
    {
        id: 2,
        name: "Anna Schwab",
        role: "Make-up Specialist",
        image: "/Images/Member2.jpg"
    },
    {
        id: 3,
        name: "Karin Baader",
        role: "Nail Specialist",
        image: "/Images/Member3.jpg"
    }
];

const servicesData = [
    {
        title: "Precision Hair Styling",
        image: "/Images/Precision Hair Styling.jpg",
        description: "From classic cuts to trendy blowouts, our stylists create looks that define you.",
        points: ["Consultation & Assessment", "Custom Cuts & Styling", "Premium Product Application"]
    },
    {
        title: "Artistic Color & Glow",
        image: "/Images/Artistic Color and Glow.jpg",
        description: "Master balayage, highlights, and full transformations using premium, ammonia-free dyes.",
        points: ["Balayage & Highlights", "Root Touch-ups", "Gloss & Toning"]
    },
    {
        title: "Luxury Nail Artistry",
        image: "/Images/Luxury Nail Artistry.jpg",
        description: "Long-lasting manicures and pedicures with a focus on nail health and creative design.",
        points: ["Gel & Acrylic Extensions", "Detailed Nail Art", "Hand & Foot Spa"]
    },
    {
        title: "Rejuvenating Facials",
        image: "/Images/Rejuvenating Facials.jpg",
        description: "Deep-cleansing skin treatments designed to restore your natural, healthy glow.",
        points: ["Deep Pore Cleansing", "Anti-aging Treatments", "Hydration Therapy"]
    },
    {
        title: "Bridal & Event Makeup",
        image: "/Images/Bridal and Event Makeup.jpg",
        description: "Flawless, professional makeup application for your most important milestones.",
        points: ["Consultation & Trial", "Airbrush Options", "Long-lasting Setting"]
    },
    {
        title: "Signature Blowouts",
        image: "/Images/Precision Hair Styling.jpg",
        description: "Experience our signature blowouts for volume, shine, and long-lasting perfection.",
        points: ["Deep Conditioning", "Scalp Massage", "Volume & Texture"]
    }
];

const Home = () => {
    const navigate = useNavigate();
    const [contactData, setContactData] = useState({ firstName: '', lastName: '', email: '', phone: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        if (!contactData.firstName || !contactData.email || !contactData.message) return;

        setIsSubmitting(true);
        try {
            await addDoc(collection(db, 'contact_messages'), {
                ...contactData,
                createdAt: new Date().toISOString()
            });
            alert('Thanks for reaching out! A member of our team will get back to you shortly.');
            setContactData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
        } catch (error) {
            console.error('Error submitting form: ', error);
            alert('Something went wrong sending your message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="app-container">
            <main className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">Graceful <br /> Hair<br /> Truly, yours.</h1>
                    <p className="hero-subtitle">
                        Good hair gets you anywhere. We are more than a salon. we are a creative space where we give you a whole new hair experience.
                    </p>
                    <button className="btn-primary" onClick={() => navigate('/booking')}>Get started</button>
                </div>
                <div className="hero-image-container">
                    <img src="/Images/Hero Image.png" alt="Woman with an afro" className="hero-image" />
                </div>
            </main>

            <section className="services-section" id="services">
                <h2 className="section-title">Our Services</h2>
                <div className="services-grid">
                    {servicesData.map((service, index) => (
                        <div className="service-card" key={index}>
                            <div className="service-image">
                                <img src={service.image} alt={service.title} />
                            </div>
                            <div className="service-content">
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                                <ul className="service-points">
                                    {service.points.map((point, i) => (
                                        <li key={i}>{point}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="services-cta">
                    <button className="btn-dark" onClick={() => navigate('/booking')}>Book Now &rarr;</button>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="why-choose-us" id="why-choose-us">
                <div className="wcu-header">
                    <span className="wcu-subtitle">Why Choose Us</span>
                    <h2 className="wcu-title">Choosing Frema Beauty Salon: Your<br />Path to Radiance</h2>
                </div>

                <div className="wcu-grid">
                    {/* Left Column */}
                    <div className="wcu-text-content">
                        <h3>Beauty Treatment<br />Here Now</h3>
                        <p>
                            Because we're more than just a salon - we're a destination where your beauty dreams come to life. Our commitment to excellence, combined with our passion for nurturing individuality, sets us apart as a beacon of beauty.
                        </p>
                        <p>
                            Our commitment to excellence, combined with our passion for nurturing. Because we're more than just a salon - we're a destination life.
                        </p>
                        <button className="btn-dark" onClick={() => navigate('/booking')}>Book Now &rarr;</button>
                    </div>

                    {/* Middle Column */}
                    <div className="wcu-image-container">
                        <img src="/Images/WhyChooseUs.jpg" alt="Makeup application" className="wcu-image" />
                    </div>

                    {/* Right Column */}
                    <div className="wcu-features">
                        <div className="feature-item">
                            <div className="feature-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="M8 12s1.5 2 4 2 4-2 4-2"></path>
                                    <line x1="9" y1="9" x2="9.01" y2="9"></line>
                                    <line x1="15" y1="9" x2="15.01" y2="9"></line>
                                </svg>
                            </div>
                            <div className="feature-text">
                                <h4>Personalized Beauty</h4>
                                <p>Our beauty experts take the time to your preferences and vision.</p>
                            </div>
                        </div>

                        <div className="feature-item">
                            <div className="feature-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                </svg>
                            </div>
                            <div className="feature-text">
                                <h4>Quality Products</h4>
                                <p>We exclusively use high-quality products that are gentle your skin.</p>
                            </div>
                        </div>

                        <div className="feature-item">
                            <div className="feature-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                </svg>
                            </div>
                            <div className="feature-text">
                                <h4>Innovations & Trends</h4>
                                <p>Our Innovations & Trends service is a showcase of our passion.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Expert Team Section */}
            <section className="team-section" id="team">
                <div className="team-header">
                    <span className="team-subtitle">Our Expert Team</span>
                    <h2 className="team-title">Our Experience Specialists</h2>
                </div>

                <div className="team-grid">
                    {teamData.map(member => (
                        <div className="team-card" key={member.id}>
                            <div className="team-image-wrapper">
                                <img src={member.image} alt={member.name} className="team-image" />
                            </div>
                            <div className="team-info">
                                <div className="team-text">
                                    <h3 className="team-name">{member.name}</h3>
                                    <p className="team-role">{member.role}</p>
                                </div>
                                <button className="team-add-btn" aria-label={`View ${member.name} details`}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact Us Section */}
            <section className="contact-section" id="contact">
                <div className="contact-grid">
                    {/* Left Column (Form) */}
                    <div className="contact-form-container">
                        <h2 className="contact-title">Contact Us</h2>
                        <p className="contact-subtitle">Get in touch with us.</p>

                        <form className="contact-form" onSubmit={handleContactSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="firstName">First name *</label>
                                    <input type="text" id="firstName" placeholder="First name" required value={contactData.firstName} onChange={e => setContactData({ ...contactData, firstName: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName">Last name</label>
                                    <input type="text" id="lastName" placeholder="Last name" value={contactData.lastName} onChange={e => setContactData({ ...contactData, lastName: e.target.value })} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email *</label>
                                <input type="email" id="email" placeholder="you@company.com" required value={contactData.email} onChange={e => setContactData({ ...contactData, email: e.target.value })} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Phone number</label>
                                <div className="phone-input">
                                    <select className="phone-country" aria-label="Country Code">
                                        <option value="GH">GH</option>
                                    </select>
                                    <input type="tel" id="phone" placeholder="+233 555 000 000" value={contactData.phone} onChange={e => setContactData({ ...contactData, phone: e.target.value })} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message *</label>
                                <textarea id="message" rows="5" placeholder="How can we help you?" required value={contactData.message} onChange={e => setContactData({ ...contactData, message: e.target.value })}></textarea>
                            </div>

                            <div className="form-group checkbox-group">
                                <input type="checkbox" id="privacy" required />
                                <label htmlFor="privacy">
                                    You agree to our friendly <a href="#privacy">privacy policy</a>.
                                </label>
                            </div>

                            <button type="submit" className="btn-dark btn-block" disabled={isSubmitting}>
                                {isSubmitting ? 'Sending...' : 'Send message'}
                            </button>
                        </form>
                    </div>

                    {/* Right Column (Image) */}
                    <div className="contact-image-container">
                        <img src="/Images/BlackKidAtSalon.jpeg" alt="Young child at the salon" className="contact-image" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
