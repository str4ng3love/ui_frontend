"use client";

import Image from "next/image";



interface Props {
  large?: boolean;
  url: string;
}
const Login = ({ large = false,url }: Props) => {

  return (
    <a
      href={
        `http://backend.krainagoblinow.pl/auth/login?callbackURL=` +
        encodeURIComponent(url+'/api/auth/login/')
      }
    >
      {large ? (
        <Image
          loading="eager"
          src={"/images/eve-sso-login-black-large.png"}
          alt="Eve online sso login"
          width={270}
          height={45}
          style={{ height: "auto" }}
        />
      ) : (
        <Image
          loading="eager"
          src={"/images/eve-sso-login-black-small.png"}
          alt="Eve online sso login"
          width={195}
          height={30}
          style={{ height: "auto" }}
        />
      )}
    </a>
  );
};

export default Login;
