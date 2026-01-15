
import { LiaTimesSolid } from "react-icons/lia";
const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure !!",
  message = "Do you want to delete this?",
}) => {
  //   if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#ececec] rounded-lg p-[50px] w-80 max-w-sm mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#a6a6a6] transition-colors bg-[#a6a6a6] h-7 w-7 flex justify-center items-center   rounded-full p-1"
        >
         <LiaTimesSolid className="h-5 w-5 text-white" />
        </button>

        <div className="text-center mb-6">
          <h3 className="text-red-500 text-lg font-medium mb-2">{title}</h3>
          <p className="text-gray-700 text-sm text-[#2C2C2C]">{message}</p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onConfirm}
            className="bg-[#CBA135] text-white px-8 py-2 rounded-md font-medium transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
