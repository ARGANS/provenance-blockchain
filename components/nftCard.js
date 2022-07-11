
/* ./components/nftCard.js */
import Image from 'next/image';
import { useSession } from "next-auth/react"

function NftCard ({ name, description, image, provider, url }) {
  console.log("Rendering NFTCard");
  const { data , status } = useSession()
  console.log("NFTCard session data: ", (data?.user?.provider) ? data.user.provider : "Session error");

  return (
    <div className="flex">
      <div className="border shadow max-w-md mx-auto">
        <div className="flex p-2 bg-white max-w-md mx-auto justify-center">
          <Image src={image ? image : "/shadow.jpg" } className="max-w-md mx-auto" alt="Profile picture" width="80px" height="80px"/>
        </div>
        <div className="p-1 bg-white">
          <p className="text-xl text-center font-bold text-black">{ name ? name : "Loading..." }</p>
        </div>
        <div className="p-2 bg-black">
          <p className="text-l text-white w-auto">
            {description}
          </p>
        </div>
        <div className="p-2 bg-black">
          <p className="text-l text-blue-400">Platform: { provider ? provider : "Loading..."}<br />
          {url}
          </p>
        </div>
      </div>
    </div>

  );
}

export default NftCard;
