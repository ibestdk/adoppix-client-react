import "./heart.scss";
export const HeartButton = ({index}) => {
    return (
        <div className="relative">
            <input type="checkbox" name="" id={`btn-${index}`} />
            <label className={`btn-love-${index}`} htmlFor={`btn-${index}`}></label>
        </div>
    )
}