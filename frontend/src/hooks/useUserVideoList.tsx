import { videoUserAtom } from "@/recoil/myPositon";
import { useRecoilState } from "recoil";

const useUserVideoList = () => {
  const [videoUser, setVideoUser] = useRecoilState(videoUserAtom);

  const addUserToVideoList = (id: string) => {
    setVideoUser((prevList) => {
      if (!prevList?.includes(id)) {
        return [...(prevList || []), id];
      }
      return prevList; 
    });
  };

  const removeUserFromVideoList = (id: string) => {
    setVideoUser(
      (prevList) => prevList?.filter((userId) => userId !== id) || []
    );
  };

  return { videoUser, addUserToVideoList, removeUserFromVideoList };
};

export default useUserVideoList;
