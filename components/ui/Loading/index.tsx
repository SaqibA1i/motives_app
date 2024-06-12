import style from "./Loading.module.css";

const Loading = ({ rows = 1 }) => {
  return (
    <div className={style.Loading}>
      {[...Array(rows)].map((_, i) => (
        <div key={i} className={style.LoadingRow} />
      ))}
    </div>
  );
};
export default Loading;
