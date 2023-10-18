import { IconType } from "react-icons";
interface Props {
  message?: string;
  error?: boolean;
  show?: boolean;
  onAnim: (e: React.AnimationEvent) => void;
  Icon?: IconType|null
  animate?: boolean;
}

const Notification = ({
  message,
  error,
  show,
  onAnim,
  Icon=null,
  animate = true,
}: Props) => {
  return (
    <>
      {show ? (
        <div
          onAnimationEnd={(e) => {
            onAnim(e);
          }}
          className={`${error ? "bg-red-700" : ""} ${
            Icon ? "bg-transparent" : "bg-link"
          }  px-8 py-2 rounded-md font-semibold text-sm uppercase ${
            animate ? "animate-fadeInOut" : ""
          } whitespace-nowrap`}
        >
          {message ? message : ""}
          {Icon ? (
            <span className="flex items-center">
              Working...&nbsp;
              <span className="animate-spin">
                <Icon size={"2em"} />
              </span>
            </span>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Notification;
