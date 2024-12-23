type CalorieDisplayProps = {
  calories: number;
  text: string;
};

function CaloriesDisplay({ calories, text }: CalorieDisplayProps) {
  return (
    <>
      <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
        <span className="font-black text-6xl text-white">
          {calories}
        </span>
        {text}
      </p>
    </>
  );
}

export default CaloriesDisplay;
