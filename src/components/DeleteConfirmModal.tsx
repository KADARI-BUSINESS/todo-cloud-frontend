interface DeleteConfirmModalProps {
  todoTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmModal = ({
  todoTitle,
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps) => {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div
        className="delete-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="delete-icon">🗑️</div>

        <h2>Delete Todo?</h2>

        <p>
          Are you sure you want to delete
          <strong> "{todoTitle}"</strong>?
        </p>

        <span className="delete-warning">This action cannot be undone.</span>

        <div className="delete-modal-actions">
          <button type="button" className="cancel-button" onClick={onCancel}>
            Cancel
          </button>

          <button type="button" className="delete-button" onClick={onConfirm}>
            Delete Todo
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
