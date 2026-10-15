import { useState } from "react";
import { X } from "lucide-react";
import { changeUserPassword } from "../../services/AuthService";
import { useUser } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { useTranslation } from "react-i18next";

export const ChangePasswordModal = ({ onClose }) => {
    const { token } = useUser();
    const { showToast } = useToast();
    const { t } = useTranslation();

    const [form, setForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async () => {
        if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
            showToast(t('toast.fill_fields'), 'error');
            return;
        }
        if (form.newPassword !== form.confirmPassword) {
            showToast(t('toast.passwords_mismatch'), 'error');
            return;
        }
        try {
            await changeUserPassword(token, {
                currentPassword: form.currentPassword,
                newPassword: form.newPassword
            });
            showToast(t('toast.password_changed'), 'success');
            onClose();
        } catch (error) {
            showToast(error.message, 'error');
        }
    };

    const fields = [
        { label: t('changePassword.current_label'), name: "currentPassword", placeholder: t('changePassword.current_placeholder') },
        { label: t('changePassword.new_label'), name: "newPassword", placeholder: t('changePassword.new_placeholder') },
        { label: t('changePassword.confirm_label'), name: "confirmPassword", placeholder: t('changePassword.confirm_placeholder') },
    ];

    return (
        <div className="settings-modal">
            <div className="settings-modal-header">
                <div>
                    <h3>{t('changePassword.title')}</h3>
                    <p>{t('changePassword.subtitle')}</p>
                </div>
                <X className="settings-modal-close" onClick={onClose} />
            </div>
            <div className="settings-fields">
                {fields.map(field => (
                    <div className="settings-field" key={field.name}>
                        <label htmlFor={`modal-${field.name}`}>{field.label}</label>
                        <input
                            type="password"
                            id={`modal-${field.name}`}
                            name={field.name}
                            placeholder={field.placeholder}
                            value={form[field.name]}
                            onChange={handleChange}
                        />
                    </div>
                ))}
            </div>
            <button className="settings-save-btn" onClick={handleSubmit}>
                {t('changePassword.submit')}
            </button>
        </div>
    );
};
