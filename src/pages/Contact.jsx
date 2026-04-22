import React, { useState } from "react";
import emailjs from '@emailjs/browser';
import { useI18n } from "../i18n/LanguageContext.jsx";

export default function Contact() {
    const { t } = useI18n();
    const [form, setForm] = useState({
        name: '',
        email: '',
        message: '',
        hp: '' // honeypot
    });

    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState({ loading: false, success: null, message: '' });

    // EmailJS Configuration
    const EMAILJS_SERVICE_ID = 'service_smayihj';
    const EMAILJS_TEMPLATE_ID = 'template_k592ylu'; // Ganti dengan template ID Anda
    const EMAILJS_PUBLIC_KEY = 'aPuAYDlqGVRWlwA-v';

    const contactInfo = [
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                </svg>
            ),
            label: t("contact.info.emailLabel"),
            value: 'raihanrafif1202@gmail.com',
            href: 'mailto:raihanrafif1202@gmail.com'
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                </svg>
            ),
            label: t("contact.info.locationLabel"),
            value: 'Takeo, Saga, Japan',
            href: null
        }
    ];

    const socialLinks = [
        {
            name: 'GitHub',
            icon: <i className="fab fa-github"></i>,
            href: 'https://github.com/RaihanRafif'
        },
        {
            name: 'LinkedIn',
            icon: <i className="fab fa-linkedin"></i>,
            href: 'https://www.linkedin.com/in/raihan-rafif-756809202/'
        }
    ];

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = t("contact.validation.nameRequired");
        if (!form.email.trim()) {
            e.email = t("contact.validation.emailRequired");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            e.email = t("contact.validation.emailInvalid");
        }
        if (!form.message.trim()) e.message = t("contact.validation.messageRequired");
        if (form.hp) e.hp = t("contact.validation.spamDetected");
        return e;
    };

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setForm((p) => ({ ...p, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => {
                const c = { ...prev };
                delete c[name];
                return c;
            });
        }
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        const validation = validate();
        if (Object.keys(validation).length) {
            setErrors(validation);
            return;
        }

        // Check honeypot
        if (form.hp) {
            setStatus({
                loading: false,
                success: false,
                message: t("contact.status.spam")
            });
            return;
        }

        setStatus({ loading: true, success: null, message: '' });

        try {
            // EmailJS send
            const templateParams = {
                from_name: form.name.trim(),
                from_email: form.email.trim(),
                message: form.message.trim(),
                to_name: 'Raihan Rafif', // Optional: your name
                reply_to: form.email.trim(),
            };

            const response = await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                templateParams,
                EMAILJS_PUBLIC_KEY
            );

            console.log('EmailJS Response:', response);

            if (response.status === 200) {
                setStatus({
                    loading: false,
                    success: true,
                    message: t("contact.status.success")
                });
                setForm({ name: '', email: '', message: '', hp: '' });
                setErrors({});

                // Auto-clear success message after 5 seconds
                setTimeout(() => {
                    setStatus({ loading: false, success: null, message: '' });
                }, 5000);
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('EmailJS Error:', error);
            setStatus({
                loading: false,
                success: false,
                message: error.text || t("contact.status.fail")
            });
        }
    };

    return (
        <main className="contact-page" id="contact">
            {/* Hero Section */}
            <section className="contact-hero">
                <div className="contact-hero__container">
                    <h1 className="contact-hero__title">{t("contact.hero.title")}</h1>
                    <p className="contact-hero__subtitle">
                        {t("contact.hero.subtitle1")}<br />
                        {t("contact.hero.subtitle2")}
                    </p>
                </div>
            </section>

            {/* Main Contact Section */}
            <section className="contact-main">
                <div className="contact-main__container">

                    <aside className="contact-info">
                        <div className="contact-info__card">
                            <h2 className="contact-info__title">{t("contact.info.title")}</h2>
                            <p className="contact-info__description">
                                {t("contact.info.description")}
                            </p>

                            <div className="contact-info__list">
                                {contactInfo.map((info, index) => (
                                    <div key={index} className="contact-info__item">
                                        <div className="info-icon">{info.icon}</div>
                                        <div className="info-content">
                                            <span className="info-label">{info.label}</span>
                                            {info.href ? (
                                                <a href={info.href} className="info-value">
                                                    {info.value}
                                                </a>
                                            ) : (
                                                <span className="info-value">{info.value}</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="contact-info__socials">
                                <p className="socials-label">{t("contact.info.followMe")}</p>
                                <div className="socials-links">
                                    {socialLinks.map((social, index) => (
                                        <a
                                            key={index}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="social-link"
                                            aria-label={social.name}
                                        >
                                            {social.icon}
                                        </a>
                                    ))}

                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Contact Form */}
                    <div className="contact-form-wrapper">
                        <div className="contact-form__header">
                            <h2 className="contact-form__title">{t("contact.form.title")}</h2>
                            <p className="contact-form__description">
                                {t("contact.form.description")}
                            </p>
                        </div>

                        <form
                            className="contact-form"
                            onSubmit={handleSubmit}
                            noValidate
                            aria-describedby="form-status"
                        >
                            <div className="form-row">
                                <div className="form-field">
                                    <label htmlFor="name" className="form-label">
                                        {t("contact.form.nameLabel")} <span className="required">*</span>
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder={t("contact.form.namePlaceholder")}
                                        className={`form-input ${errors.name ? 'error' : ''}`}
                                        required
                                        aria-invalid={errors.name ? 'true' : 'false'}
                                        aria-describedby={errors.name ? 'name-error' : undefined}
                                    />
                                    {errors.name && (
                                        <span id="name-error" role="alert" className="form-error">
                                            {errors.name}
                                        </span>
                                    )}
                                </div>

                                <div className="form-field">
                                    <label htmlFor="email" className="form-label">
                                        {t("contact.form.emailLabel")} <span className="required">*</span>
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder={t("contact.form.emailPlaceholder")}
                                        className={`form-input ${errors.email ? 'error' : ''}`}
                                        required
                                        aria-invalid={errors.email ? 'true' : 'false'}
                                        aria-describedby={errors.email ? 'email-error' : undefined}
                                    />
                                    {errors.email && (
                                        <span id="email-error" role="alert" className="form-error">
                                            {errors.email}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="form-field">
                                <label htmlFor="message" className="form-label">
                                    {t("contact.form.messageLabel")} <span className="required">*</span>
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder={t("contact.form.messagePlaceholder")}
                                    rows={6}
                                    className={`form-textarea ${errors.message ? 'error' : ''}`}
                                    required
                                    aria-invalid={errors.message ? 'true' : 'false'}
                                    aria-describedby={errors.message ? 'message-error' : undefined}
                                />
                                {errors.message && (
                                    <span id="message-error" role="alert" className="form-error">
                                        {errors.message}
                                    </span>
                                )}
                            </div>

                            {/* Honeypot field */}
                            <input
                                name="hp"
                                value={form.hp}
                                onChange={handleChange}
                                autoComplete="off"
                                tabIndex="-1"
                                aria-hidden="true"
                                style={{ position: 'absolute', left: '-9999px' }}
                            />

                            <button
                                type="submit"
                                className="form-submit"
                                disabled={status.loading}
                            >
                                {status.loading ? (
                                    <>
                                        <svg className="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                                        </svg>
                                        {t("contact.form.sending")}
                                    </>
                                ) : (
                                    <>
                                        {t("contact.form.sendMessage")}
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="22" y1="2" x2="11" y2="13" />
                                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                        </svg>
                                    </>
                                )}
                            </button>

                            {status.message && (
                                <div
                                    id="form-status"
                                    role="alert"
                                    aria-live="polite"
                                    className={`form-status ${status.success ? 'success' : 'error'}`}
                                >
                                    {status.success ? (
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    ) : (
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10" />
                                            <line x1="12" y1="8" x2="12" y2="12" />
                                            <line x1="12" y1="16" x2="12.01" y2="16" />
                                        </svg>
                                    )}
                                    {status.message}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}