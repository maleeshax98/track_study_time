import Image from "next/image";
import React from "react";

export default function Loading() {
  return (
    <div>
      <center>
        <Image
          src={"/svg/spine.svg"}
          width={30}
          height={30}
          alt=""
          className=" animate-spin"
        />
      </center>
    </div>
  );
}
