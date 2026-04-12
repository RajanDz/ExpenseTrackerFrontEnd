export const ProgressBar = ({spent,total}) => {
    const percentage = (spent / total) * 100;
    return(
     <div style={{height: '30px', borderRadius: '20px', overflow: "hidden", backgroundColor: "rgb(237, 237, 237)"}}
     className="budget-visual"
     >
        <div 
        style={{height:"100%", width: `${percentage}%`, backgroundColor: "rgb(49, 49, 246)"}}
        className="visual"
        ></div>
    </div>
    )
}