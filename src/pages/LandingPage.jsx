import { useNavigate } from "react-router-dom";
import "../style/Landing.css";

const features = [
    {
        icon: "💸",
        title: "Track Every Expense",
        description: "Log your daily spending in seconds. See exactly where your money is going, categorized and organized."
    },
    {
        icon: "📊",
        title: "Smart Budgeting",
        description: "Set budgets with flexible or strict rules. Get a real-time view of how much you've spent and what's left."
    },
    {
        icon: "📁",
        title: "Full History",
        description: "Access your complete budget history. Switch between past budgets and review your financial progress over time."
    }
];

export const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-page">

            {/* ── Header ─────────────────── */}
            <header className="landing-header">
                <div className="landing-header-inner">
                    <div className="landing-logo">
                        <div className="landing-logo-dot" />
                        <span>ExpenseTracker</span>
                    </div>
                    <div className="landing-header-actions">
                        <button className="btn-ghost" onClick={() => navigate('/login')}>Sign in</button>
                        <button className="btn-cta" onClick={() => navigate('/registration')}>Get started</button>
                    </div>
                </div>
            </header>

            {/* ── Hero ─────────────────── */}
            <section className="landing-hero">
                <div className="landing-hero-inner">
                    <div className="hero-badge">Free to use</div>
                    <h1 className="hero-title">
                        Take control of<br />
                        <span className="hero-title-accent">your finances</span>
                    </h1>
                    <p className="hero-subtitle">
                        Stop guessing where your money goes. ExpenseTracker helps you set budgets,
                        log expenses, and build better financial habits — all in one place.
                    </p>
                    <div className="hero-actions">
                        <button className="btn-cta btn-cta-lg" onClick={() => navigate('/registration')}>
                            Start for free
                        </button>
                        <button className="btn-ghost btn-ghost-lg" onClick={() => navigate('/login')}>
                            Sign in
                        </button>
                    </div>
                    <p className="hero-note">No credit card required.</p>
                </div>

                {/* Decorative card preview */}
                <div className="hero-preview">
                    <div className="preview-card">
                        <div className="preview-card-header">
                            <div>
                                <p className="preview-budget-name">Monthly Budget</p>
                                <p className="preview-budget-amount">€ 2,500</p>
                            </div>
                            <span className="preview-badge">Active</span>
                        </div>
                        <div className="preview-bar-wrap">
                            <div className="preview-bar">
                                <div className="preview-bar-fill" style={{ width: '62%' }} />
                            </div>
                            <div className="preview-bar-labels">
                                <span>Spent: €1,550</span>
                                <span>Left: €950</span>
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

            {/* ── Features ─────────────────── */}
            <section className="landing-features">
                <div className="landing-features-inner">
                    <p className="section-label">What you get</p>
                    <h2 className="section-title">Everything you need to stay on budget</h2>
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

            {/* ── CTA Banner ─────────────────── */}
            <section className="landing-cta-banner">
                <div className="cta-banner-inner">
                    <h2>Ready to start saving?</h2>
                    <p>Join and take the first step toward financial clarity.</p>
                    <button className="btn-cta btn-cta-lg btn-cta-white" onClick={() => navigate('/registration')}>
                        Create free account
                    </button>
                </div>
            </section>

            {/* ── Footer ─────────────────── */}
            <footer className="landing-footer">
                <span>© 2026 ExpenseTracker</span>
            </footer>
        </div>
    );
};
