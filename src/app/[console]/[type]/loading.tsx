export default function Loading() {
  const widths = ["w-20", "w-52", "w-32", "w-28", "w-40"];
  return (
    <ul className="-my-1.5">
      {Array(50)
        .fill("")
        .map((_, index) => {
          return (
            <li
              key={index}
              className="mt-2 flex animate-pulse items-center space-x-1"
            >
              <div
                className={`h-4 ${widths[index % 5]} rounded-sm bg-gray-200`}
              ></div>
              <div className={`h-4 w-12 rounded-sm bg-gray-200`}></div>
              <div className={`h-4 w-20 rounded-sm bg-gray-200`}></div>
              <div className={`h-4 w-20 rounded-sm bg-gray-200 py-3`}></div>
            </li>
          );
        })}
    </ul>
  );
}
