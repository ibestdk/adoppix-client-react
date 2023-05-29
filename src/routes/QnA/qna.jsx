import { useEffect, useState } from "react";
import { getQandA } from "../../services/questionService";
import { IoMdAddCircleOutline } from "react-icons/io";
import AddQnA from "./create/modalCreate";
import ReplayQnA from "./commend/modalreply";
export const QuestionAndAnswer = () => {
  const [qAndA, setQAndA] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModalCommend, setOpenModalCommend] = useState(false);
  const [select, setSelect] = useState(false);


  const handleOnClose = () => setOpenModal(false);
  const handleOnCloseCommend = () => setOpenModalCommend(false);



  const callQA = async () => {
    const result = await getQandA();
    console.log(result);
    setQAndA(result.reverse());
  };
  useEffect(() => {
    callQA();
  }, []);
  return (
    <div className="flex justify-center items-center">
      <dir>
        <div className="flex justify-center mb-10 items-center">
          <div>คำถามที่พบบ่อย</div>
          <div className="ml-2 cursor-pointer">
            <IoMdAddCircleOutline 
            onClick={() => setOpenModal(true)}
            />
          </div>
        </div>
        <div>
          <div>
            {qAndA.length > 0 ? (
              <div className="flex flex-col space-y-4">
                {qAndA.map((question, index) => (
                  <div onClick={() => {setSelect(question); setOpenModalCommend(true);}}
                    key={index}
                    className="bg-adopsoftdark p-4  rounded-lg w-[600px] cursor-pointer "
                  >
                    <div>
                      <div className="text-2xl ">{question.title}</div>
                      <div className="m-1 bg-adopdark p-4 rounded-lg">
                        <div className="text-lg opacity-70">
                          {question.description}
                        </div>
                        <div className="text-xs opacity-50 ">
                          {question.createdAt}
                        </div>

                        <div className="flex justify-start items-center space-x-3 py-2 mt-3">
                          <img
                            className="rounded-full w-[35px] h-[35px] object-cover  bg-adoplight dark:bg-adopsoftdark   shadow-lg"
                            src={`https://pix.adoppix.com/public/${
                              question.profileImage
                                ? question.profileImage
                                : "brushsan.png"
                            }`}
                          ></img>
                          <div className="text-lg">{question.username}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </dir>
      <AddQnA
        onClose={handleOnClose}
        visible={openModal}
        reloadFeeds={callQA}
      />
      <ReplayQnA
        onClose={handleOnCloseCommend}
        visible={openModalCommend}
        reloadFeeds={callQA}
        data={select}
      />
    </div>
  );
};
