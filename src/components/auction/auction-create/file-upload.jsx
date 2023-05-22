import { useState } from "react";
import { BsTrash } from "react-icons/bs";

export default function FileUploadSection({ fileList, setFileList }) {
  const handleFileList = (e, listName) => {
    const newFileList = e.target.files;
    const newList = { name: listName, files: newFileList };
    setFileList([...fileList, newList]);
    //console.log(newFileList);
  };

  return (
    <div className="mt-4">
      <label htmlFor="">ไฟล์งานที่ผู้ประมูลจะได้รับ</label>

      <div className="border-dashed border-[2px] rounded-lg mt-2">
        <div className="p-4">
        {fileList && (

       
          <div className="border-dashed border-[2px] rounded-lg p-3">
            {fileList &&
              fileList.map((list, listIndex) => (
                <div className="flex my-2" key={listIndex}>
                  <input
                    type="file"
                    className="mx-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-400 focus:border-gray-400 block w-full p-2.5 dark:bg-adopsoftdark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-400 dark:focus:border-gray-400"
                    onChange={(e) =>
                      setFileList([
                        ...fileList.slice(0, listIndex),
                        { ...list, files: e.target.files },
                        ...fileList.slice(listIndex + 1),
                      ])
                    }
                  />
                  <input
                    type="text"
                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-400 focus:border-gray-400 block w-full p-2.5 dark:bg-adopsoftdark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-400 dark:focus:border-gray-400"
                    value={list.name}
                    onChange={(e) =>
                      setFileList([
                        ...fileList.slice(0, listIndex),
                        { ...list, name: e.target.value },
                        ...fileList.slice(listIndex + 1),
                      ])
                    }
                  />
                  <BsTrash
                    className="text-5xl mx-2 cursor-pointer"
                    onClick={() =>
                      setFileList([
                        ...fileList.slice(0, listIndex),
                        ...fileList.slice(listIndex + 1),
                      ])
                    }
                  />
                </div>
              ))}
          </div>
           )}
          <div className="p-5">
             <p
              onClick={(e) => handleFileList(e, "")}
              className="text-lg ml-3 text-center cursor-pointer"
            >
              เพิ่มไฟล์
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}