import { useState } from "react";
import { X } from "lucide-react";
import { changeUserPassword } from "../../services/AuthService";
import { useUser } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

export const ChangePasswordModal = ({ onClose }) => {
    const { token } = useUser();
    const { showToast } = useToast();

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
            showToast("Please fill in all fields.", 'error');
            return;
        }
        if (form.newPassword !== form.confirmPassword) {
            showToast("New passwords do not match.", 'error');
            return;
        }
        try {
            await changeUserPassword(token, {
                currentPassword: form.currentPassword,
                newPassword: form.newPassword
            });
            showToast("Password changed successfully.", 'success');
            onClose();
        } catch (error) {
            showToast(error.message, 'error');
        }
    };

    const fields = [
        { label: "Current password", name: "currentPassword" },
        { label: "New password", name: "newPassword" },
        { label: "Confirm new password", name: "confirmPassword" },
    ];

    return (
        <div className="settings-modal">
            <div className="settings-modal-header">
                <div>
                    <h3>Change Password</h3>
                    <p>Enter your current password to confirm</p>
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
                            placeholder={field.label}
                            value={form[field.name]}
                            onChange={handleChange}
                        />
                    </div>
                ))}
            </div>
            <button className="settings-save-btn" onClick={handleSubmit}>
                Update password
            </button>
        </div>
    );
};
