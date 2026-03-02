import Part from "./Part"

const Content = (props) => {
    return (
        <div>
            <Part title={props.data[0].title} exercises={props.data[0].exercises} />
            <Part title={props.data[1].title} exercises={props.data[1].exercises} />
            <Part title={props.data[2].title} exercises={props.data[2].exercises} />
        </div>
    )
}

export default Content