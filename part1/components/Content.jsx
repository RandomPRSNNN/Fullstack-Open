import Part from "./Part"

const Content = (props) => {
    return (
        <div>
            <Part title={props.data[0].name} exercises={props.data[0].exercises} />
            <Part title={props.data[1].name} exercises={props.data[1].exercises} />
            <Part title={props.data[2].name} exercises={props.data[2].exercises} />
        </div>
    )
}

export default Content