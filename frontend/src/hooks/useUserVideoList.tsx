import { videoUserAtom } from "@/recoil/myPositon";
import { useRecoilState } from "recoil";
//hook for checking which player is near by you it add and remove logic
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
