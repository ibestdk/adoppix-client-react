import React, { useState, useEffect, useRef } from "react";
import { getMyStorage } from "../../services/apiService";

export const StorageIndex = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    (async () => {
      const results = await getMyStorage();
      console.log("==========================");
      console.log(results);
      setInventory(results);
    })();
  }, []);

  return (
    <div>
      <div className="p-4 bg-adoplight dark:bg-adopsoftdark  rounded-lg min-h-[120px]"></div>
      <div className="p-4 mt-4 bg-adoplight dark:bg-adopsoftdark  rounded-lg min-h-[800px]">
        <div>
        มีทั้งหมด {inventory.length} รายการ</div>
      <div className="mt-3 grid sm:grid-cols-7 grid-cols-2 gap-4">
          {inventory.length > 0 &&
            inventory.map((item, index) => (
              <div key={index}>
                <img
                  className="h-[200px] rounded-lg w-[200px] object-cover mx-1"
                  src={`https://pix.adoppix.com/public/${item.image}`}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
