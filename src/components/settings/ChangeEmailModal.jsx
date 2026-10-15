import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useToast } from "../../context/ToastContext";
import { useTranslation } from "react-i18next";

export const ChangeEmailModal = ({ onClose, onEmailChanged }) => {
    const { showToast } = useToast();
    const { t } = useTranslation();

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
            showToast(t('toast.enter_email'), 'error');
            return;
        }
        setSending(true);
        // TODO: replace with real API call -> sendEmailChangeCode(token, newEmail)
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCodeSent(true);
        startCountdown();
        showToast(t('toast.code_sent'), 'success');
        setSending(false);
    };

    const handleConfirm = async () => {
        if (!newEmail) {
            showToast(t('toast.enter_email'), 'error');
            return;
        }
        if (!code) {
            showToast(t('toast.enter_code'), 'error');
            return;
        }
        // TODO: replace with real API call -> changeUserEmail(token, newEmail, code)
        showToast(t('toast.email_changed'), 'success');
        onEmailChanged(newEmail);
        onClose();
    };

    const resendDisabled = sending || countdown > 0;

    const sendBtnLabel = sending
        ? t('changeEmail.sending')
        : countdown > 0
            ? t('changeEmail.resend_countdown', { count: countdown })
            : codeSent
                ? t('changeEmail.resend')
                : t('changeEmail.send_code');

    return (
        <div className="settings-modal">
            <div className="settings-modal-header">
                <div>
                    <h3>{t('changeEmail.title')}</h3>
                    <p>{t('changeEmail.subtitle')}</p>
                </div>
                <X className="settings-modal-close" onClick={onClose} />
            </div>

            <div className="settings-fields">
                <div className="settings-field">
                    <label htmlFor="modal-new-email">{t('changeEmail.new_email_label')}</label>
                    <div className="settings-email-row">
                        <input
                            type="email"
                            id="modal-new-email"
                            placeholder={t('changeEmail.new_email_placeholder')}
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                        />
                        <button
                            className="settings-send-code-btn"
                            onClick={handleSendCode}
                            disabled={resendDisabled}
                        >
                            {sendBtnLabel}
                        </button>
                    </div>
                    <span className="settings-field-hint">{t('changeEmail.email_hint')}</span>
                </div>

                <div className="settings-email-divider" />

                <div className="settings-field">
                    <label htmlFor="modal-code">{t('changeEmail.code_label')}</label>
                    <input
                        type="text"
                        id="modal-code"
                        placeholder={codeSent ? t('changeEmail.code_placeholder_ready') : t('changeEmail.code_placeholder_wait')}
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        disabled={!codeSent}
                    />
                    <span className="settings-field-hint">{t('changeEmail.code_hint')}</span>
                </div>
            </div>

            <button className="settings-save-btn" onClick={handleConfirm}>
                {t('changeEmail.submit')}
            </button>
        </div>
    );
};
