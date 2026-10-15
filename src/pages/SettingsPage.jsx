import { useState, useEffect } from "react";
import "../style/SettingsPage.css";
import { getUserProfile, updateUserProfile } from "../services/AuthService";
import { useUser } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { ChangePasswordModal } from "../components/settings/ChangePasswordModal";
import { ChangeEmailModal } from "../components/settings/ChangeEmailModal";

export const SettingsPage = () => {
    const { token } = useUser();
    const { showToast } = useToast();

    const [profileForm, setProfileForm] = useState({
        name: "",
        lastname: "",
        number: ""
    });
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
            showToast("Name and lastname are required.", 'error');
            return;
        }
        try {
            await updateUserProfile(token, profileForm);
            showToast("Profile updated successfully.", 'success');
        } catch (error) {
            showToast(error.message, 'error');
        }
    };

    const profileFields = [
        { label: "Name", name: "name", type: "text" },
        { label: "Lastname", name: "lastname", type: "text" },
        { label: "Phone number", name: "number", type: "tel" },
    ];

    if (loading) return <p className="loading-msg">Loading...</p>;

    return (
        <div className="settings-container">
            <div className="settings-content">
                <h2 className="settings-title">Account Settings</h2>

                <div className="settings-grid">
                    {/* Profile card */}
                    <div className="settings-card">
                        <div className="settings-card-header">
                            <h3>Profile Information</h3>
                            <p>Update your personal details</p>
                        </div>
                        <div className="settings-fields">
                            {profileFields.map(field => (
                                <div className="settings-field" key={field.name}>
                                    <label htmlFor={`settings-${field.name}`}>{field.label}</label>
                                    <input
                                        type={field.type}
                                        id={`settings-${field.name}`}
                                        name={field.name}
                                        placeholder={`Enter your ${field.label.toLowerCase()}`}
                                        value={profileForm[field.name]}
                                        onChange={handleProfileChange}
                                    />
                                </div>
                            ))}
                        </div>
                        <button className="settings-save-btn" onClick={handleSaveProfile}>
                            Save changes
                        </button>
                    </div>

                    {/* Account security card */}
                    <div className="settings-card">
                        <div className="settings-card-header">
                            <h3>Account & Security</h3>
                            <p>Manage your email and password</p>
                        </div>

                        {/* Email row */}
                        <div className="settings-account-row">
                            <div className="settings-account-row-info">
                                <span className="settings-account-row-label">Email address</span>
                                <span className="settings-account-row-value">{email}</span>
                            </div>
                            <button
                                className="settings-edit-btn"
                                onClick={() => setIsEmailModalOpen(true)}
                            >
                                Edit
                            </button>
                        </div>

                        {/* Password row */}
                        <div className="settings-account-row">
                            <div className="settings-account-row-info">
                                <span className="settings-account-row-label">Password</span>
                                <span className="settings-account-row-value">••••••••</span>
                            </div>
                            <button
                                className="settings-edit-btn"
                                onClick={() => setIsPasswordModalOpen(true)}
                            >
                                Edit
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
