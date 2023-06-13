import { useEffect } from "react";

export const SuccessCard = ({ visible, onClose, title, text }) => {
  if (!visible) return null;
  const handleOnClose = (e) => {
    if (e.target.id === "modal-card") onClose();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
        onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      id="modal-card"
      onClick={handleOnClose}
      className="animation-custom fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center duration-300"
    >
      <div className="flex items-center justify-center ">
        <div className="bg-adopsoftdark p-5 rounded-lg w-[300px] h-[350px]">
          <div className="mt-10">
            <div className="check-container mx-auto">
              <div className="check-background">
                <svg
                  viewBox="0 0 65 51"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 25L27.3077 44L58.5 7"
                    stroke="white"
                    stroke-width="13"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div className="check-shadow"></div>
            </div>
            <div className="font-bold text-2xl text-center text-green-400">
              {title ? title : "สำเร็จ"}
            </div>
            <div className="text-sm text-center">{text ? text : "สำเร็จ"}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
