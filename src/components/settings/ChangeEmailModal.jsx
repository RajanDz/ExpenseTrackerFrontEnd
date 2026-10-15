import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useToast } from "../../context/ToastContext";

export const ChangeEmailModal = ({ onClose, onEmailChanged }) => {
    const { showToast } = useToast();

    const [newEmail, setNewEmail] = useState("");
    const [code, setCode] = useState("");
    const [codeSent, setCodeSent] = useState(false);
    const [sending, setSending] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const intervalRef = useRef(null);

    const startCountdown = () => {
        setCountdown(60);
        intervalRef.current = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    useEffect(() => {
        return () => clearInterval(intervalRef.current);
    }, []);

    const handleSendCode = async () => {
        if (!newEmail) {
            showToast("Please enter a new email address.", 'error');
            return;
        }
        setSending(true);
        // TODO: replace with real API call -> sendEmailChangeCode(token, newEmail)
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCodeSent(true);
        startCountdown();
        showToast("Verification code sent to your current email.", 'success');
        setSending(false);
    };

    const handleConfirm = async () => {
        if (!newEmail) {
            showToast("Please enter a new email address.", 'error');
            return;
        }
        if (!code) {
            showToast("Please enter the verification code.", 'error');
            return;
        }
        // TODO: replace with real API call -> changeUserEmail(token, newEmail, code)
        showToast("Email changed successfully.", 'success');
        onEmailChanged(newEmail);
        onClose();
    };

    const resendDisabled = sending || countdown > 0;

    return (
        <div className="settings-modal">
            <div className="settings-modal-header">
                <div>
                    <h3>Change Email</h3>
                    <p>Update the email address linked to your account</p>
                </div>
                <X className="settings-modal-close" onClick={onClose} />
            </div>

            <div className="settings-fields">
                {/* Step 1 — new email */}
                <div className="settings-field">
                    <label htmlFor="modal-new-email">New email address</label>
                    <div className="settings-email-row">
                        <input
                            type="email"
                            id="modal-new-email"
                            placeholder="Enter new email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                        />
                        <button
                            className="settings-send-code-btn"
                            onClick={handleSendCode}
                            disabled={resendDisabled}
                        >
                            {sending
                                ? "Sending..."
                                : countdown > 0
                                    ? `Resend (${countdown}s)`
                                    : codeSent
                                        ? "Resend"
                                        : "Send code"}
                        </button>
                    </div>
                    <span className="settings-field-hint">
                        A verification code will be sent to your current email.
                    </span>
                </div>

                <div className="settings-email-divider" />

                {/* Step 2 — verification code */}
                <div className="settings-field">
                    <label htmlFor="modal-code">Verification code</label>
                    <input
                        type="text"
                        id="modal-code"
                        placeholder={codeSent ? "Enter the code from your email" : "Send the code first"}
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        disabled={!codeSent}
                    />
                    <span className="settings-field-hint">
                        Check your current email inbox for the code.
                    </span>
                </div>
            </div>

            <button className="settings-save-btn" onClick={handleConfirm}>
                Confirm email change
            </button>
        </div>
    );
};
