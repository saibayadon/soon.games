export default function Loading() {
  const widths = ["w-20", "w-28", "w-32", "w-40", "w-52"];
  return (
    <ul className="my-[-6px]">
      {Array(20)
        .fill("")
        .map((val, index) => {
          return (
            <li
              key={index}
              className="mt-2 flex animate-pulse items-center space-x-1"
            >
              <div
                className={`h-4 ${
                  widths[Math.floor(Math.random() * widths.length)]
                } rounded bg-gray-200`}
              ></div>
              <div className={`h-4 w-12 rounded bg-gray-200`}></div>
              <div className={`h-4 w-20 rounded bg-gray-200`}></div>
              <div className={`h-4 w-20 rounded bg-gray-200 py-3`}></div>
            </li>
          );
        })}
    </ul>
  );
}
