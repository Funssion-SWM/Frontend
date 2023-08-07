type Props = {
  text: string;
  onClick: () => void;
  isValid: boolean;
  disabled?: boolean;
};

export default function IsValidBtn({
  text,
  onClick,
  isValid,
  disabled = false,
}: Props) {
  return (
    <button
      type="button"
      className={`${
        isValid
          ? 'bg-soma-blue-20 text-soma-blue-50'
          : 'bg-soma-grey-30 text-soma-grey-45'
      } py-2 px-3.5 rounded-3xl mx-1 transition hover:bg-soma-blue-20 hover:text-soma-blue-50`}
      onClick={() => onClick()}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
