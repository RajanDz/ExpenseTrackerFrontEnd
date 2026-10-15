import { useState, useEffect } from "react";
import "../style/SettingsPage.css";
import { getUserProfile, updateUserProfile } from "../services/AuthService";
import { useUser } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { ChangePasswordModal } from "../components/settings/ChangePasswordModal";
import { ChangeEmailModal } from "../components/settings/ChangeEmailModal";
import { useTranslation } from "react-i18next";

export const SettingsPage = () => {
    const { token } = useUser();
    const { showToast } = useToast();
    const { t } = useTranslation();

    const [profileForm, setProfileForm] = useState({ name: "", lastname: "", number: "" });
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(true);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

    useEffect(() => {
        if (!token) return;
        const loadProfile = async () => {
            try {
                const data = await getUserProfile(token);
                setProfileForm({
                    name: data.name ?? "",
                    lastname: data.lastname ?? "",
                    number: data.number ?? ""
                });
                setEmail(data.email ?? "");
            } catch (error) {
                showToast(error.message, 'error');
            } finally {
                setLoading(false);
            }
        };
        loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const handleProfileChange = (e) => {
        setProfileForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSaveProfile = async () => {
        if (!profileForm.name || !profileForm.lastname) {
            showToast(t('toast.name_required'), 'error');
            return;
        }
        try {
            await updateUserProfile(token, profileForm);
            showToast(t('toast.profile_updated'), 'success');
        } catch (error) {
            showToast(error.message, 'error');
        }
    };

    if (loading) return <p className="loading-msg">{t('settings.loading')}</p>;

    const profileFields = [
        { label: t('settings.name_label'), name: "name", type: "text", placeholder: t('settings.name_placeholder') },
        { label: t('settings.lastname_label'), name: "lastname", type: "text", placeholder: t('settings.lastname_placeholder') },
        { label: t('settings.phone_label'), name: "number", type: "tel", placeholder: t('settings.phone_placeholder') },
    ];

    return (
        <div className="settings-container">
            <div className="settings-content">
                <h2 className="settings-title">{t('settings.title')}</h2>

                <div className="settings-grid">
                    {/* Profile card */}
                    <div className="settings-card">
                        <div className="settings-card-header">
                            <h3>{t('settings.profile_title')}</h3>
                            <p>{t('settings.profile_subtitle')}</p>
                        </div>
                        <div className="settings-fields">
                            {profileFields.map(field => (
                                <div className="settings-field" key={field.name}>
                                    <label htmlFor={`settings-${field.name}`}>{field.label}</label>
                                    <input
                                        type={field.type}
                                        id={`settings-${field.name}`}
                                        name={field.name}
                                        placeholder={field.placeholder}
                                        value={profileForm[field.name]}
                                        onChange={handleProfileChange}
                                    />
                                </div>
                            ))}
                        </div>
                        <button className="settings-save-btn" onClick={handleSaveProfile}>
                            {t('settings.save')}
                        </button>
                    </div>

                    {/* Account security card */}
                    <div className="settings-card">
                        <div className="settings-card-header">
                            <h3>{t('settings.security_title')}</h3>
                            <p>{t('settings.security_subtitle')}</p>
                        </div>

                        <div className="settings-account-row">
                            <div className="settings-account-row-info">
                                <span className="settings-account-row-label">{t('settings.email_label')}</span>
                                <span className="settings-account-row-value">{email}</span>
                            </div>
                            <button className="settings-edit-btn" onClick={() => setIsEmailModalOpen(true)}>
                                {t('settings.edit')}
                            </button>
                        </div>

                        <div className="settings-account-row">
                            <div className="settings-account-row-info">
                                <span className="settings-account-row-label">{t('settings.password_label')}</span>
                                <span className="settings-account-row-value">••••••••</span>
                            </div>
                            <button className="settings-edit-btn" onClick={() => setIsPasswordModalOpen(true)}>
                                {t('settings.edit')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {isPasswordModalOpen && (
                <div className="modal-overlay">
                    <ChangePasswordModal onClose={() => setIsPasswordModalOpen(false)} />
                </div>
            )}

            {isEmailModalOpen && (
                <div className="modal-overlay">
                    <ChangeEmailModal
                        onClose={() => setIsEmailModalOpen(false)}
                        onEmailChanged={(newEmail) => setEmail(newEmail)}
                    />
                </div>
            )}
        </div>
    );
};
