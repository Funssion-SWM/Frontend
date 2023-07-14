type Props = {
  text: string;
};

export default function WarningMessage({ text }: Props) {
  return <p className=" text-red-500">{text}</p>;
}
