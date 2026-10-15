import { useNavigate } from "react-router-dom";
import "../style/Landing.css";
import { useTranslation } from "react-i18next";

export const LandingPage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const features = [
        { icon: "💸", title: t('landing.feature_1_title'), description: t('landing.feature_1_desc') },
        { icon: "📊", title: t('landing.feature_2_title'), description: t('landing.feature_2_desc') },
        { icon: "📁", title: t('landing.feature_3_title'), description: t('landing.feature_3_desc') },
    ];

    return (
        <div className="landing-page">

            {/* Header */}
            <header className="landing-header">
                <div className="landing-header-inner">
                    <div className="landing-logo">
                        <div className="landing-logo-dot" />
                        <span>ExpenseTracker</span>
                    </div>
                    <div className="landing-header-actions">
                        <button className="btn-ghost" onClick={() => navigate('/login')}>{t('landing.sign_in')}</button>
                        <button className="btn-cta" onClick={() => navigate('/registration')}>{t('landing.get_started')}</button>
                    </div>
                </div>
            </header>

            {/* Hero */}
            <section className="landing-hero">
                <div className="landing-hero-inner">
                    <div className="hero-badge">{t('landing.badge')}</div>
                    <h1 className="hero-title">
                        {t('landing.hero_title_1')}<br />
                        <span className="hero-title-accent">{t('landing.hero_title_2')}</span>
                    </h1>
                    <p className="hero-subtitle">{t('landing.hero_subtitle')}</p>
                    <div className="hero-actions">
                        <button className="btn-cta btn-cta-lg" onClick={() => navigate('/registration')}>
                            {t('landing.start_free')}
                        </button>
                        <button className="btn-ghost btn-ghost-lg" onClick={() => navigate('/login')}>
                            {t('landing.sign_in')}
                        </button>
                    </div>
                    <p className="hero-note">{t('landing.no_card')}</p>
                </div>

                {/* Decorative card preview */}
                <div className="hero-preview">
                    <div className="preview-card">
                        <div className="preview-card-header">
                            <div>
                                <p className="preview-budget-name">{t('landing.preview_budget_name')}</p>
                                <p className="preview-budget-amount">€ 2,500</p>
                            </div>
                            <span className="preview-badge">{t('landing.preview_active')}</span>
                        </div>
                        <div className="preview-bar-wrap">
                            <div className="preview-bar">
                                <div className="preview-bar-fill" style={{ width: '62%' }} />
                            </div>
                            <div className="preview-bar-labels">
                                <span>{t('landing.preview_spent')}</span>
                                <span>{t('landing.preview_left')}</span>
                            </div>
                        </div>
                        <div className="preview-expenses">
                            {[
                                { name: 'Groceries', cat: 'Food', amount: '€85' },
                                { name: 'Netflix', cat: 'Entertainment', amount: '€15' },
                                { name: 'Gym', cat: 'Health', amount: '€40' },
                            ].map((e, i) => (
                                <div className="preview-expense-row" key={i}>
                                    <span className="preview-exp-name">{e.name}</span>
                                    <span className="preview-exp-cat">{e.cat}</span>
                                    <span className="preview-exp-amount">{e.amount}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="landing-features">
                <div className="landing-features-inner">
                    <p className="section-label">{t('landing.section_label')}</p>
                    <h2 className="section-title">{t('landing.section_title')}</h2>
                    <div className="features-grid">
                        {features.map((f) => (
                            <div className="feature-card" key={f.title}>
                                <div className="feature-icon">{f.icon}</div>
                                <h3>{f.title}</h3>
                                <p>{f.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="landing-cta-banner">
                <div className="cta-banner-inner">
                    <h2>{t('landing.cta_title')}</h2>
                    <p>{t('landing.cta_subtitle')}</p>
                    <button className="btn-cta btn-cta-lg btn-cta-white" onClick={() => navigate('/registration')}>
                        {t('landing.cta_btn')}
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <span>{t('landing.footer')}</span>
            </footer>
        </div>
    );
};
