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
      <div>
        {inventory.length > 0 &&
          inventory.map((item, index) => (
            <div key={index}>
              <img
                className="h-[300px] rounded-lg w-[300px] object-cover mx-1"
                src={`https://pix.adoppix.com/public/${item.image}`}
              />
            </div>
          ))}
      </div>
    </div>
  );
};
