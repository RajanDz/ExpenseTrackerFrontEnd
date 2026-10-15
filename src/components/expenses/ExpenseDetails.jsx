import { ShoppingBag, X, Trash } from "lucide-react";
import "../../style/ExpenseDetails.css";
import { useTranslation } from "react-i18next";

export const ExpenseDetails = ({ expense, handleCLose, onExpenseDelete }) => {
    const { t } = useTranslation();

    if (!expense) {
        return (
            <div className="expense-details-container">
                <p>{t('expenseDetails.loading')}</p>
            </div>
        );
    }

    return (
        <div className="expense-details-container">

            <div className="expense-header-details">
                <div className="expense-side">
                    <div className="icon-wrapper">
                        <ShoppingBag />
                    </div>
                    <div className="expense-detail">
                        <h3>{expense.name}</h3>
                        <div className="category-wrapper">
                            <div className="circle"></div>
                            <p>{expense.category}</p>
                        </div>
                    </div>
                </div>
                <X onClick={handleCLose} className="close-btn" />
            </div>

            <div className="expense-amount-view">
                <h3>{t('expenseDetails.total')}</h3>
                <p className="expense-amount">{expense.amount}€</p>
            </div>

            <div className="expense-details">
                <div className="detail">
                    <p className="column-name">{t('expenseDetails.id')}</p>
                    <p>{expense.id}</p>
                </div>
                <div className="detail">
                    <p className="column-name">{t('expenseDetails.date')}</p>
                    <p>{new Date(expense.dateTime).toLocaleString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}</p>
                </div>
                <div className="detail">
                    <p className="column-name">{t('expenseDetails.category')}</p>
                    <p>{expense.category}</p>
                </div>
            </div>

            <div className="delete-container" onClick={() => onExpenseDelete(expense.id)}>
                <Trash />
                <p>{t('expenseDetails.delete')}</p>
            </div>
        </div>
    );
};
