import { useEffect, useState } from "react";
import { getQandA } from "../../services/apiService";

export const QuestionAndAnswer = () => {

const [qAndA, setQAndA] = useState();

    const callQA = async () => {
        const result = await getQandA();

        setQAndAresult(result);

    }
    useEffect(() => {
        callQA();
    }, []);
  return (
    <div className="flex justify-center items-center">
      <dir>
        <div>คำถามที่พบบ่อย</div>
        <div>

        </div>
      </dir>
    </div>
  );
};
