export default function RollDie(props){
    const style = {
        backgroundColor: props.isHeld ? "#59e391" : "white"
    }
    return(
    <button style={style} onClick={props.hold}>
        <h2>{props.value}</h2>
    </button>
    )
}